import { NestFactory } from '@nestjs/core';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import * as express from 'express';

import { NODE_PORT, CORS_ALLOWED_ORIGINS } from './app/config';
import { AppModule } from './app/app.module';

(async () => {
  const server = express();

  const options: NestApplicationOptions = {
    bodyParser: true,
    cors: {
      origin: CORS_ALLOWED_ORIGINS,
    },
  };

  try {
    const app = await NestFactory.create(AppModule, server, options);
    await app.listenAsync(NODE_PORT);

    const microservice = app.connectMicroservice({});
    await microservice.listenAsync();
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error(`Error creating api-gateway: ${e}`);
  }
})();
