import { NestFactory, NestApplication } from '@nestjs/core';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import * as express from 'express';
import * as bonjour from 'bonjour';

import { NODE_PORT, CORS_ALLOWED_ORIGINS } from './app/config';
import { AppModule } from './app/app.module';
import { DiscoveredServices } from './app/config';

(async () => {
  const server = express();

  const options: NestApplicationOptions = {
    bodyParser: true,
    cors: {
      origin: CORS_ALLOWED_ORIGINS,
    },
  };

  try {
    const browser = bonjour();
    browser.find({
        type: 'rue-service',
    }, (service) => {
        DiscoveredServices.push(service.name);

        console.log(service.name);
    });

    const app = await NestFactory.create(AppModule, server, options);
    await app.listen(NODE_PORT, () => {
      // tslint:disable-next-line:no-console
      console.log(`rue-api-gateway started on port ${NODE_PORT}`);
    });
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }
})();
