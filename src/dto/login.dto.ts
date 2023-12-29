import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({ nullable: false })
    @IsString()
    @IsNotEmpty({ message: 'El usuario es requerido' })
    username: string;

    @ApiProperty({ nullable: false })
    @IsString()
    @IsNotEmpty({ message: 'El password es requerido' })
    password: string;
}