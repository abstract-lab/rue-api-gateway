import { Module } from '@nestjs/common';
import * as bonjour from 'bonjour';
import { DiscoveredServices } from '../app/config';
import { RoutingModule } from './routes/routing.module';

@Module({
    imports: [RoutingModule],
})
export class AppModule {
    async onModuleInit() {
        const browser = bonjour();
        browser.find({
            type: 'rue-service',
        }, (service) => {
            DiscoveredServices.push(service.name);
        });
    }
}