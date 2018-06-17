import { Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { RoutingService } from './routing.service';
import { RoutingController } from './routing.controller';

@Module({
  imports: [ SharedModule ],
  controllers: [ RoutingController ],
  providers: [ RoutingService ],
})
export class RoutingModule {}
