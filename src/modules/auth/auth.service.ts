import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entity/users.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/services/mailer';
import EmailTemplateConstants from 'src/config/constants/email-templates';
import { generateLink, generateRandomString } from 'src/utils/common';
import { ForgotPasswordDto } from './dto/forgert-password-dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) { }

  async register(registerDto: RegisterDto): Promise<User> {
    const { country, fullName, email, password, role, currentStatus, registrationMethod } = registerDto;

    const existingUser = await this.usersService.checkEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User();
    newUser.country = country;
    newUser.fullName = fullName;
    newUser.email = email;
    newUser.password = hashedPassword;
    newUser.role = role;
    newUser.currentStatus = currentStatus;
    newUser.registrationMethod = registrationMethod;

    let expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 15);

    // Generate hash
    const token = generateRandomString(32);
    const hashedToken = await bcrypt.hash(token, 10);

    newUser.hash = hashedToken;
    newUser.expiredAt = expiryDate;
    await this.usersService.create(newUser);

    try {
      let path = "reset-password"
      const activationLink = generateLink(hashedToken, path);

      await this.emailService.sendMail(
        email,
        EmailTemplateConstants.accountActivations,
        { activationLink, fullName }
      );
    } catch (error) {
      // Handle errors if necessary
      console.error("Failed to send verification email:", error);
    }

    return newUser;
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;

    // Authenticate user
    const user = await this.usersService.findOne(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.fullName, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async activateAccount(hash: string): Promise<void> {

    const user = await this.usersService.findByHash(hash);
    if (!user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (user.expiredAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const activateAt = new Date();
    user.emailVerifiedAt = activateAt;
    user.hash = null;
    user.expiredAt = null;

    await this.usersService.save(user);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const { email } = forgotPasswordDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    let expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 15);

    // Generate reset password token
    const token = generateRandomString(32);
    const hashedToken = await bcrypt.hash(token, 10);

    // Set reset password token and expiry
    user.hash = hashedToken;
    user.expiredAt = expiryDate;

    await this.usersService.save(user);

    try {
      let path = "reset-password"
      const forgotPasswordLink = generateLink(hashedToken, path);
      await this.emailService.sendMail(
        email,
        EmailTemplateConstants.forgotPassword,
        { forgotPasswordLink, fullName: user.fullName }
      );
    } catch (error) {
      // Handle errors if necessary
      console.error('Failed to send reset password email:', error);
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { hash, password } = resetPasswordDto;

    const user = await this.usersService.findByHash(hash);
    if (!user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (user.expiredAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.hash = null;
    user.expiredAt = null;

    await this.usersService.save(user);
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(username, password);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }
}
