import { Module } from '@nestjs/common';

import { ConfigurationService } from './configuration/configuration.service';
import { configurationServiceFactory } from './configuration/configuration-service.factory';
import { RabbitMessageQueue } from './mq/mq.service';
import { messageFactory } from './mq/mq-service.factory';
import { LoggingService } from './logging/logging.service';
import { loggingServiceFactory } from './logging/logging.factory';

@Module({
    providers: [
        { provide: ConfigurationService, useFactory: configurationServiceFactory },
        { provide: LoggingService, useFactory: loggingServiceFactory, inject: [ ConfigurationService ] },
        { provide: RabbitMessageQueue, useFactory: messageFactory, inject: [ ConfigurationService, LoggingService ] },
    ],
    exports: [
        RabbitMessageQueue,
        LoggingService,
    ],
})
export class SharedModule {}