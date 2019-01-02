export abstract class Listener {
    abstract exchangeName: string;

    abstract queueName: string;

    abstract patternString: string;

    abstract async onMessageReceived(msg: any): Promise<any>;
}