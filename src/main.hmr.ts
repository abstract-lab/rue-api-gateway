import { NestFactory, NestApplication } from '@nestjs/core';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import * as express from 'express';

import { AppModule } from './app/app.module';
import { NODE_PORT, CORS_ALLOWED_ORIGINS } from './app/config';

declare const module: any;

async function bootstrap() {
  const server = express();

  const options: NestApplicationOptions = {
    bodyParser: true,
    cors: {
      origin: CORS_ALLOWED_ORIGINS,
    },
  };
  const app = await NestFactory.create(AppModule, server, options);
  await app.listen(NODE_PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
