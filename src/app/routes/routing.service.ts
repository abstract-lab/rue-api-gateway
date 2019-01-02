import { Injectable } from '@nestjs/common';

import { RabbitMessageQueue } from '../shared/mq/mq.service';
import { Patterns, QueueNames } from '../utils/patterns';
import { LoggingService } from '../shared/logging/logging.service';

@Injectable()
export class RoutingService {
    constructor(private mqService: RabbitMessageQueue, private loggingService: LoggingService) { }

    public async infoRequest(): Promise<boolean> {
        try {
            return await this.mqService.publishMessage({ routingKey: Patterns.Info, content: {}, options: {
                 replyTo: QueueNames.InfoReply,
            } });
        } catch (e) {
            this.loggingService.getLogger().error(`Error sending info request: ${e}`);
            throw(e);
        }
    }
}