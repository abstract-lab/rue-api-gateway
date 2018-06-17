import * as path from 'path';

export const NODE_PORT: number = parseInt(process.env.NODE_PORT, 10) || 5000;
// tslint:disable-next-line:max-line-length
export const CORS_ALLOWED_ORIGINS: string[] = process.env.CORS_ALLOWED_ORIGINS ? process.env.CORS_ALLOWED_ORIGINS.toString().split(',') : ['localhost'];
export const CONFIG_FOLDER = path.join(__dirname, '..', '..', '..', 'configuration');
export const CONFIG_FILE = 'config.yml';
export const DiscoveredServices: string[] = [];