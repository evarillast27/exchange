import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LoginDto } from '../dto/login.dto';
import { ExchangeService } from './exchange.service';
import { Exchange } from '../entities/exchange.entity';

describe('ExchangeService', () => {
    let service: ExchangeService;

    const mockExchangeRepository = {
        find: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExchangeService,
                {
                    provide: getRepositoryToken(Exchange),
                    useValue: mockExchangeRepository,
                },
            ],
        }).compile();

        service = module.get<ExchangeService>(ExchangeService);
    });




    it('should be defined', () => {
        expect(service).toBeDefined();
    });


    it('find => should return a current values', async () => {
        // arrange
        const loginDto = {
            username: 'ericvk',
            password: '123456',
        } as LoginDto;

        const exchange = {
            id: Date.now(),
            source: 'SOL',
            target: 'DOL',
            exchange: 3.5,
            date: '2023-01-01',
            disabled: false
        } as Exchange;

        jest.spyOn(mockExchangeRepository, 'find').mockReturnValue(exchange);

        // act
        const result = await service.getExchange(2.5, '', '', 'ip');

        // assert
        expect(mockExchangeRepository.find).toBeCalled();
        expect(mockExchangeRepository.find).toBeCalledWith(loginDto);

        expect(result).toEqual(exchange);
    });

});