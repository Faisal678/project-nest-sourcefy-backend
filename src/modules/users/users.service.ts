import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(createUserDto);
      return this.userRepository.save(user);
    } catch (error) {
      console.error('Error while creating user:', error);
      throw new InternalServerErrorException('Failed to create user. Please try again later.');
    }
  }

  async save(user: User): Promise<User> {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      console.error('Error while saving user:', error);
      throw new InternalServerErrorException('Failed to save user. Please try again later.');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      console.error('Error while fetching users:', error);
      throw new InternalServerErrorException('Failed to fetch users. Please try again later.');
    }
  }

  async findOne(email: string, password: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Invalid password');
      }
      return user;
    } catch (error) {
      console.error('Error while fetching user:', error);
      throw new InternalServerErrorException('Failed to fetch user. Please try again later.');
    }
  }

  async checkEmail(email: string): Promise<User | undefined> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      console.error('Error while checking user email:', error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      console.error('Error while fetching user:', error);
      throw new InternalServerErrorException('Failed to fetch user. Please try again later.');
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }
      return user;
    } catch (error) {
      console.error('Error while fetching user:', error);
      throw new InternalServerErrorException('Failed to fetch user. Please try again later.');
    }
  }

  async findByHash(hash: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { hash } });
      if (!user) {
        throw new NotFoundException('Invalid or expired token');
      }
      return user;
    } catch (error) {
      console.error('Error while fetching user:', error);
      throw new InternalServerErrorException('Failed to fetch user. Please try again later.');
    }
  }

  async update(id: string, updateUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.findById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const updatedUser = Object.assign(user, updateUserDto);
      return await this.userRepository.save(updatedUser);
    } catch (error) {
      console.error('Error while updating user details:', error);
      throw new InternalServerErrorException('Failed to update user. Please try again later.');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deleteResult = await this.userRepository.delete(id);
      if (deleteResult.affected === 0) {
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      console.error('Error while deleting user:', error);
      throw new InternalServerErrorException('Failed to delete user. Please try again later.');
    }
  }
}
