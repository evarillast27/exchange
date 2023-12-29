// user.controller.ts
import { Controller, Get, Post, Body, Req, UseFilters } from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';
import { User } from 'src/entities/user.entity';
import { AuthService } from 'src/services/auth.service';
import { clientIp } from 'src/shared/utils/network.util';
import { Request } from "express";
import { RegisterDto } from 'src/dto/register.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() body: User, @Req() request: Request) {

        return await this.authService.create(body);
    }

    @Post('login')
    async login(@Body() body: LoginDto, @Req() request: Request) {

        return await this.authService.login(body, clientIp(request));
    }
}
