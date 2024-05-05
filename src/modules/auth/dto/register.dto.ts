import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { CURRENT_STATUS, REGISTRATION_METHODS, ROLES } from 'src/modules/users/entity/users.entity';

export class RegisterDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'Full name is required' })
    fullName: string;

    @ApiProperty({ example: 'john@example.com' })
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty({ example: 'P@ssw0rd' })
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(20, { message: 'Password cannot be longer than 20 characters' })
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: 'Password too weak: it must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
    })
    password: string;

    @ApiProperty({ enum: ROLES })
    @IsNotEmpty({ message: 'Role is required' })
    @IsEnum(ROLES)
    role: ROLES;

    @ApiProperty({ enum: CURRENT_STATUS })
    @IsEnum(CURRENT_STATUS)
    currentStatus: CURRENT_STATUS = CURRENT_STATUS.online;

    @ApiProperty({ example: 'male' })
    gender: string;

    @ApiProperty({ example: '1234567890' })
    mobileNo: string;

    @ApiProperty({ example: 'Pakistan' })
    country: string;

    @ApiProperty({ example: 'ABCD1234' })
    referralCode: string;

    @ApiProperty({ example: 'uuid' })
    referredBy: string;

    @ApiProperty({ example: 'https://example.com/profile.jpg' })
    profileImage: string;

    @ApiProperty()
    preference: object;

    @ApiProperty({ enum: REGISTRATION_METHODS })
    @IsEnum(REGISTRATION_METHODS)
    registrationMethod: REGISTRATION_METHODS = REGISTRATION_METHODS.password;

    @ApiProperty({ example: 'xzy213asdf' })
    hash: string;

    @ApiProperty({ example: 0 })
    walletBalance: number;

    @ApiProperty({ example: '2024-04-15T12:00:00.000Z' })
    isLastActive: string;

    @ApiProperty({ example: 'Technology' })
    Industry: string;

    @ApiProperty({ example: 4.5 })
    averageRating: number;

    @ApiProperty({ example: 10 })
    totalRatings: number;

    @ApiProperty({ example: 'customerId' })
    customerId: string;

    @ApiProperty({ example: 'stripeAccountId' })
    stripeAccountId: string;
}
