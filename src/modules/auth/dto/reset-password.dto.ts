import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class ResetPasswordDto {
    @ApiProperty({ example: 'P@ssw0rd' })
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(20, { message: 'Password cannot be longer than 20 characters' })
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: 'Password too weak: it must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
    })
    password: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Reset hash is required' })
    hash: string;
}