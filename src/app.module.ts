import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { ExchangeService } from './services/exchange.service';
import { ExchangeController } from './controllers/exchange.controller';
import { Exchange } from './entities/exchange.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.dev', '.env.prod'],
      isGlobal: true,
    }),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES
      }
    }),

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:', // Usa una base de datos en memoria
      entities: [
        User,
        Exchange,
      ],
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Sincronizar automáticamente el esquema de la base de datos
    }),

    TypeOrmModule.forFeature([
      User,
      Exchange,

    ]),


  ],
  controllers: [
    AuthController,
    ExchangeController,
  ],
  providers: [
    AuthService,
    ExchangeService,
  ],
})
export class AppModule { }
