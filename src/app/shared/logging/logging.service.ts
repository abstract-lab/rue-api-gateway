import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggingService {
    constructor(private config: winston.LoggerOptions) { }
    private winstonLogger: winston.Logger;

    public async connect(): Promise<winston.Logger> {
        return new Promise<winston.Logger>((resolve, reject) => {
            try {
                this.winstonLogger = winston.createLogger(this.config);
                resolve(this.winstonLogger);
            } catch (err) {
                reject(err);
            }
        });
    }

    public getLogger(): winston.Logger {
        return this.winstonLogger;
    }
}