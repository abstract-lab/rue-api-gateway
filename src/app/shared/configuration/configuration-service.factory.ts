import * as fs from 'fs';
import * as path from 'path';

import { ConfigurationService } from './configuration.service';
import { CONFIG_FILE, CONFIG_FOLDER } from '../../config';

export const configurationServiceFactory = async (): Promise<ConfigurationService> => {
    return new Promise<ConfigurationService>((fulfill, reject) => {
        const configurationFile = path.join(CONFIG_FOLDER, CONFIG_FILE);

        if (fs.existsSync(configurationFile)) {
            try {
                const service = new ConfigurationService(configurationFile);
                service.load();
                fulfill(service);
            } catch (e) {
                reject(e);
            }
        } else {

            if (!fs.existsSync(CONFIG_FOLDER)) {
                fs.mkdirSync(CONFIG_FOLDER);
            }

            fs.watchFile(configurationFile, (curr: fs.Stats, prev: fs.Stats) => {
                try {
                    const service = new ConfigurationService(configurationFile);
                    service.load();
                    fulfill(service);
                } catch (e) {
                    reject(e);
                }
            });
        }
    });
};