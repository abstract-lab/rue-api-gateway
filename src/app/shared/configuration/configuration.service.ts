import { Injectable } from '@nestjs/common';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

@Injectable()
export class ConfigurationService {
    private config: any = {};
    constructor(private configFile: string) { }

    public load(): void {
        try {
            const configuration_content: string = fs.readFileSync(this.configFile, 'utf8');
            this.config = yaml.safeLoad(configuration_content);
        } catch (e) {
             // tslint:disable-next-line:no-console
             console.log(`Error loading configuration file: ${JSON.stringify(e)}`);
        }
    }

    public getSettings() {
        return this.config;
    }
}