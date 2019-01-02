import { Module } from '@nestjs/common';

import { ListenerService } from './listener.service';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [ SharedModule ],
    providers: [ ListenerService ],
    exports: [ ListenerService ],
})
export class ListenersModule { }