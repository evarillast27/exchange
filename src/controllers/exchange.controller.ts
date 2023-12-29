// user.controller.ts
import { Controller, Get, Post, Body, Req, UseGuards, Param, UseFilters } from '@nestjs/common';
import { clientIp } from 'src/shared/utils/network.util';
import { Request } from "express";
import { ExchangeService } from 'src/services/exchange.service';
import { Exchange } from 'src/entities/exchange.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('exchange')
@UseGuards(AuthGuard)
@Controller('exchange')
export class ExchangeController {
    constructor(private readonly exchangeService: ExchangeService) { }

    @Post('insertMany')
    async insertMany(@Body() body: Exchange[]) {

        return await this.exchangeService.insertMany(body);
    }

    @Post('create')
    async create(@Body() body: Exchange) {

        return await this.exchangeService.create(body);
    }

    @Get('getExchange/:amount/:source/:target')
    async getExchange(@Param('amount') amount: number, @Param('source') source: string, @Param('target') target: string, @Req() request: Request) {


        return await this.exchangeService.getExchange(amount, source, target, clientIp(request));
    }

}
