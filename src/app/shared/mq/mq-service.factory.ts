import { ConfigurationService } from '../configuration/configuration.service';
import { RabbitMessageQueue } from './mq.service';
import { LoggingService } from '../logging/logging.service';

export const messageFactory = async (configManager: ConfigurationService, loggingService: LoggingService) => {
    const config = configManager.getSettings();
    const logger = loggingService.getLogger();
    const options: any = {};

    // tslint:disable-next-line:max-line-length
    options.url = `amqp://${ process.env.MQ_USERNAME || config.mq.username}:${ process.env.MQ_PASSWORD || config.mq.password}@${ process.env.MQ_HOST || config.mq.host}:${ process.env.MQ_PORT || config.mq.port}`;
    options.erlangCookie = process.env.MQ_ERLANG_COOKIE || config.mq.erlangCookie;
    options.retryCount = process.env.MQ_RETRY_COUNT || config.mq.retryCount;
    options.retryTimeout = process.env.MQ_RETRY_TIMEOUT || config.mq.retryTimeout;

    const mq = new RabbitMessageQueue(options, logger);
    return mq;
};