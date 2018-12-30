import { Module } from '@nestjs/common';

import { RoutingService } from './routing.service';
import { RoutingController } from './routing.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [ SharedModule ],
  controllers: [ RoutingController ],
  providers: [ RoutingService ],
})
export class RoutingModule {}
