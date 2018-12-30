import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import * as winston from 'winston';

import { Listener } from '../../listeners/listener';
const GATEWAY_EXCHANGE_NAME = 'GatewayEvents';

@Injectable()
export class RabbitMessageQueue {
    private conn: amqp.Connection;

    private channel: amqp.Channel;

    constructor(private options: any, private logger: winston.Logger) { }

    public async ensureInfrastructure(): Promise<void> {
        await this.channel.assertExchange(GATEWAY_EXCHANGE_NAME, 'topic');
    }

    public async initializeConnection(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            let connectionAttempts: number = 1;
            let connected: boolean = false;

            while (connectionAttempts <= this.options.retryCount && ! connected) {
                try {
                    this.conn = await amqp.connect(this.options.url);
                    this.channel = await this.conn.createChannel();
                    connected = true;

                    this.logger.info(`Successfully connected to RabbitMQ after ${connectionAttempts} tries.`);
                    resolve();
                } catch (error) {
                    if (connectionAttempts < this.options.retryCount) {
                        this.logger.warn(`Attempt ${connectionAttempts} failed (error:${error}),
                                        waiting another ${this.options.retryTimeout} seconds ...`);

                        connectionAttempts ++;
                        await this.delay(parseInt(this.options.retryTimeout, 10) * 1000);
                    } else {
                        this.logger.error(`Failed to connect to RabbitMq`);
                        reject();
                    }
                }
            }
        });
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async listenToQueue(listener: Listener): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            const queueAssert = await this.channel.assertQueue(listener.queueName);

            if (queueAssert.queue) {
                await this.channel.bindQueue(listener.queueName, this.options.exchange, listener.patternString);
                this.channel.consume(listener.queueName, (async (msg: amqp.Message) => {
                    const result = await listener.onMessageReceived(msg);
                    result ? this.channel.ack(msg) : this.channel.nack(msg);
                    resolve(result);
                }));
            } else {
                reject();
            }
        });
    }

    public async publishMessage(message: { routingKey: string, content: any, options: amqp.Options.Publish }): Promise<boolean> {
            try {
                return await this.channel.publish(GATEWAY_EXCHANGE_NAME, message.routingKey,
                                Buffer.from(JSON.stringify(message.content)), message.options);

            } catch (err) {
                this.logger.error(`Error publishing message on ${message.routingKey}: ${err}`);
                throw(err);
            }
    }

    public async sendToQueue(message: { queue: string, content: any, options: amqp.Options.Publish }): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                this.channel.sendToQueue(message.queue, new Buffer(JSON.stringify(message.content)), message.options);
                this.logger.info(`Successfully sent to queue: `, message);
                resolve(true);
            } catch (err) {
                this.logger.error(`Error sending message to queue:  ${message.queue}: ${err}`);
                reject(err);
            }
        });
    }
}