// user.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/dto/login.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

import { USER_ACCOUNT_DISABLED, USER_NOT_FOUND, USER_PASSWORD_INVALID } from '../shared/constants/message.constant';
import { User } from '../entities/user.entity';

@Injectable()

export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }


    /**
     * 
     * @param user Método para crear usuarios, solo se usará la primera vez para registrar ekl usuario que tendrá acceso
     * @returns 
     */
    async create(user: User): Promise<User> {

        const saltRounds = 10;
        const { password } = user;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser  = { ...user, password: hashedPassword };

        return await this.userRepository.save(newUser);
    }

    /**
     * 
     * @param request Método para loguearse y obtener el token de acceso a las apís
     * @param ip 
     * @returns 
     */
    async login(request: LoginDto, ip: string): Promise<any> {
        const { username, password } = request;
        const user = await this.userRepository.findOne({ where: { username: username } });

        if (!user) throw new HttpException({ cause: new Error(), description: USER_NOT_FOUND }, HttpStatus.NOT_FOUND);

        if (user.disabled) throw new HttpException({ cause: new Error(), description: USER_ACCOUNT_DISABLED }, HttpStatus.NOT_FOUND);

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) throw new HttpException({ cause: new Error(), description: USER_PASSWORD_INVALID }, HttpStatus.FORBIDDEN);

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            ip: ip,
        };
        const access_token = this.jwtService.sign(payload);
        const refresh_token = this.jwtService.sign(payload, { expiresIn: '4h' });

        const data = {
            access_token,
            refresh_token,
            expires_in: 3600,
            token_type: 'bearer'
        };

        return data;
    }
}
