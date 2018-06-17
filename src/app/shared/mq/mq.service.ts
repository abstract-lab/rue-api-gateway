import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export class MqService {
    private config: any = {};

    private client: ClientProxy;

    constructor(private connectionOptions: any) {
        this.client = ClientProxyFactory.create({
            transport: Transport.REDIS,
            options: {
                url: `redis://${connectionOptions.url}:${connectionOptions.port}`,
            },
        });
    }

    public async connect(): Promise<void> {
        try {
            const connection = await this.client.connect();
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.error(error);
        }
    }

    public publish<T>(pattern: any, payload): Observable<T> {
        return this.client.send<T>(pattern, payload);
    }
}