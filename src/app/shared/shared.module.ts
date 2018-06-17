import { Module } from '@nestjs/common';

import { ConfigurationService } from './configuration/configuration.service';
import { configurationServiceFactory } from './configuration/configuration-service.factory';
import { MqService } from './mq/mq.service';
import { mqServiceFactory } from './mq/mq-service.factory';

@Module({
    providers: [
        {
            provide: ConfigurationService,
            useFactory: configurationServiceFactory,
        }, {
            provide: MqService,
            useFactory: mqServiceFactory,
            inject: [ ConfigurationService ],
        },
    ],
    exports: [
        MqService,
        ConfigurationService,
    ],
})
export class SharedModule {}