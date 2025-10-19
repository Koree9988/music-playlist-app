/* eslint-disable @typescript-eslint/no-floating-promises */
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { EnvironmentConfigService } from './core/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configEnv = app.get(EnvironmentConfigService);

  app.setGlobalPrefix('/api');
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Music Playlist APIs')
    .setDescription('Music Playlist APIs service')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey', // this should be apiKey
        name: 'authorization', // this is the name of the key you expect in header
        in: 'header',
      },
      'APIKeys',
    )
    .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('/swagger', app, document, {
  //   useGlobalPrefix: true,
  // });

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3030);

  // const HOST = '0.0.0.0';
  // const PORT = configEnv.config.port || 3030;
  // app.listen(PORT, HOST);
}

bootstrap();
