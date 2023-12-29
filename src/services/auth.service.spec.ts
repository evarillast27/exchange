import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from '../entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
    let service: AuthService;

    const mockUserRepository = {
        login: jest.fn(),
        register: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockUserRepository,
                },
                {
                    provide: JwtService,
                    useValue: {
                        signAsync: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });


    it('login => Should login an user and return its data', async () => {
        // arrange
        const loginDto = {
            username: 'ericvk',
            password: '123456',
        } as LoginDto;

        const user = {
            id: Date.now(),
            name: 'Chadwick',
            username: 'Boseman',
            email: 'chadwickboseman@email.com',
            password: '123456'
        } as User;

        jest.spyOn(mockUserRepository, 'login').mockReturnValue(user);

        // act
        const result = await service.login(loginDto,'ip');

        // assert
        expect(mockUserRepository.login).toBeCalled();
        expect(mockUserRepository.login).toBeCalledWith(loginDto);

        expect(result).toEqual({});
    });

});