import { ConfigurationService } from '../configuration/configuration.service';
import { MqService } from './mq.service';

export const mqServiceFactory = async (configManager: ConfigurationService) => {
    const config = configManager.getSettings();

    const options = {
        url: process.env.MQ_HOST || config.mq.host,
        port: process.env.MQ_PORT || config.mq.port,
    };

    const mqService = new MqService(options);
    await mqService.connect();
    return mqService;
};
