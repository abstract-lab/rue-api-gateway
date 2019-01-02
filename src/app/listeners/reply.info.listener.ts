import * as winston from 'winston';

import { Listener } from './listener';
import { QueueNames } from '../utils/patterns';
import * as config from '../config';

export class ReplyInfoListener implements Listener {
    constructor(private logger: winston.Logger) { }
    readonly patternString: string = '*.reply.info';
    readonly exchangeName: string = config.GATEWAY_EXCHANGE_NAME;
    readonly queueName: string = QueueNames.InfoReply;

    async onMessageReceived(msg: any): Promise<boolean> {
        if (msg && msg.content) {
            this.logger.info(`Received message on ${this.queueName} queue`);

            try {
                this.logger.info(`Successfully processed message`);
                return true;
            } catch (error) {
                this.logger.error(`Error executing saga: ${error}`);
                return false;
            }
        } else {
            this.logger.error(`Error processing sync mq: ${JSON.stringify(msg)}`);
            return false;
        }
    }
    //     return new Promise<boolean>(async (resolve, reject) => {
    //         if (msg && msg.content) {
    //             this.logger.info(`Received message on ${this.queueName} queue`);

    //             try {

    //             } catch (err) {
    //                 this.logger.error(`Error executing saga: ${err}`);
    //             } finally {
    //                 resolve(true);
    //             }
    //         } else {
    //             this.logger.error(`Error processing sync mq: ${JSON.stringify(msg)}`);
    //             reject(`Error processing sync mq: ${JSON.stringify(msg)}`);
    //         }
    //     });
    // }

}