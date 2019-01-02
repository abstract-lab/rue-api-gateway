import { Module } from '@nestjs/common';
import * as bonjour from 'bonjour';

import { DiscoveredServices } from '../app/config';
import { RoutingModule } from './routes/routing.module';
import { RabbitMessageQueue } from './shared/mq/mq.service';
import { LoggingService } from './shared/logging/logging.service';

@Module({
    imports: [ RoutingModule ],
})
export class AppModule {
    constructor( private mqService: RabbitMessageQueue, private loggingService: LoggingService ) {  }
    async onModuleInit() {
        await this.mqService.initializeConnection();
        await this.mqService.ensureInfrastructure();
        await this.loggingService.getLogger().info(`Starting API Gateway`);

        const browser = bonjour();

        browser.find({ type: 'rue-service' }, (service) => {
            DiscoveredServices.push(service.name);
        });
    }
}