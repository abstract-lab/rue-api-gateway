import { Module } from '@nestjs/common';
import * as bonjour from 'bonjour';

import { DiscoveredServices } from '../app/config';
import { RoutingModule } from './routes/routing.module';
import { RabbitMessageQueue } from './shared/mq/mq.service';
import { LoggingService } from './shared/logging/logging.service';
import { ListenerService } from './listeners/listener.service';
import { ListenersModule } from './listeners/listener.module';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [ SharedModule, ListenersModule, RoutingModule ],
})
export class AppModule {
    constructor( private mqService: RabbitMessageQueue, private loggingService: LoggingService, private listenerService: ListenerService ) {  }
    async onModuleInit() {
        try {
            this.loggingService.getLogger().info(`Initializing API Gateway`);

            await this.mqService.initializeConnection();
            await this.mqService.ensureInfrastructure();
            await this.listenerService.listen();
        } catch (e) {
            this.loggingService.getLogger().error(`Error initializing API Gateway: ${e}`);
        }

        // const browser = bonjour();

        // browser.find({ type: 'rue-service' }, (service) => {
        //     DiscoveredServices.push(service.name);
        // });
    }
}