import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

import { Listener } from './listener';
import { RabbitMessageQueue } from '../shared/mq/mq.service';
import { LoggingService } from '../shared/logging/logging.service';
import * as listeners from './';

@Injectable()
export class ListenerService {
    private listeners: Listener[] = [];
    private logger: winston.Logger;

    constructor(private mq: RabbitMessageQueue, private loggingService: LoggingService) {
        this.logger = this.loggingService.getLogger();
        this.initialiseListeners();
    }

    private initialiseListeners(): void {
        this.listeners.push(new listeners.ReplyInfoListener(this.logger));
    }

    public async listen(): Promise<void> {
        await Promise.all(this.listeners.map(listener => this.mq.listenToQueue(listener)));
    }
}