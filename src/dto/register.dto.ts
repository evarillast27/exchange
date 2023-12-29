import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
    @ApiProperty({ nullable: false })
    @IsString()
    @IsNotEmpty({ message: 'El usuario es requerido' })
    username: string;

    @ApiProperty({ nullable: false })
    @IsString()
    @IsNotEmpty({ message: 'El password es requerido' })
    password: string;

    @ApiProperty({ nullable: false })
    @IsString()
    @IsNotEmpty({ message: 'El nombre es requerido' })
    name: string;
    
    @ApiProperty({ nullable: false })
    @IsString()
    @IsNotEmpty({ message: 'El email es requerido' })
    email: string;
}