import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @ApiProperty({ example: 'john@example.com' })
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({
        message: 'Email is required',
    })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}
