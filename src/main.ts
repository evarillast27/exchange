import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';


async function bootstrap() {

  //Codigo con Express
  // const app = await NestFactory.create(AppModule, { cors: true });
  // app.useGlobalPipes(new ValidationPipe());
  // app.setGlobalPrefix('api');

  // if (process.env.NODE_ENV !== 'production') {
  //   const config = new DocumentBuilder()
  //     .setTitle('Exchange API')
  //     .setDescription('Api for exchange type')
  //     .setVersion('1.0')
  //     .build();
  //   const document = SwaggerModule.createDocument(app, config);
  //   SwaggerModule.setup('api', app, document);

  // }

  // const PORT = parseInt(process.env.PORT) || 3000;


  // await app.listen(PORT, () => {
  //   console.log(`Servidor está corriendo en el puerto ${PORT}`);
  // });



  //Con Fastify
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  
  const options = new DocumentBuilder()
    .setTitle('Exchange API')
    .setDescription('Api for exchange type')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);

  const PORT = parseInt(process.env.PORT) || 3000;


  await app.listen(PORT, () => {
    console.log(`Servidor está corriendo en el puerto ${PORT}`);
  });
}
bootstrap();
