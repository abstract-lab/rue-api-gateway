import * as winston from 'winston';

import { ConfigurationService } from '../configuration/configuration.service';
import { LoggingService } from './logging.service';

export const loggingServiceFactory = async (configManager: ConfigurationService) => {
    const config = configManager.getSettings();

    const loggingOptions: winston.LoggerOptions = {
        level: 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.Console({
                format: winston.format.simple(),
            }),
        ],
    };

    const loggingService = new LoggingService(loggingOptions);
    const logger = await loggingService.connect();

    return loggingService;
};
