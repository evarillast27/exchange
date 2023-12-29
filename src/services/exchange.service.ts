// user.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { EXCHANGE_NOT_FOUND } from '../shared/constants/message.constant';
import { Exchange } from '../entities/exchange.entity';

@Injectable()
export class ExchangeService {
    constructor(
        @InjectRepository(Exchange)
        private readonly exchangeRepository: Repository<Exchange>,
    ) { }


    /**
     * 
     * @param exchange Inserta y actualiza los existentes de haber el caso
     * @returns 
     */
    async create(exchange: Exchange): Promise<Exchange> {

        const existingExchange = await this.exchangeRepository.findOne({
            where: { source: exchange.source, target: exchange.target, disabled: false },
            //select: ['id'],
        });

        if (existingExchange) {
            existingExchange['disabled'] = true;
           const qqq = await this.exchangeRepository.save(existingExchange);
        }
        return await this.exchangeRepository.save(exchange);
    }

    /**
     * 
     * @param exchange Inserta una lista para probar el servicio
     * @returns 
     */
    async insertMany(exchange: Exchange[]): Promise<Exchange[]> {

        const inserManyItems = await Promise.all(
            exchange.map(async (ex) => {
                return ex;
            })
        );

        return this.exchangeRepository.save(inserManyItems);
    }

    /**
     * 
     * @param amount Obtiene el tipo de cambio actual
     * @param source 
     * @param target 
     * @param ip 
     * @returns 
     */
    async getExchange(amount: number, source: string, target: string, ip: string): Promise<any> {

        //console.log([amount, source, target]);

        const result = await this.exchangeRepository.findOne({
            where: { source, target, disabled: false },
            select: ['exchange'],
        });

        if (!result) {
           throw new HttpException({ cause: new Error(), description: EXCHANGE_NOT_FOUND }, HttpStatus.NOT_FOUND);
        }


        const amountChanged = result.exchange * amount;

        return {
            amount,
            amountChanged,
            source,
            target,
            exchange: result.exchange,
            ip
        };
    }



}