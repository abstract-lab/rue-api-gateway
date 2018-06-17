import { Injectable } from '@nestjs/common';

import { MqService } from '../shared/mq/mq.service';
import { Patterns } from '../utils/patterns';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class RoutingService {
    constructor(private redisService: MqService) { }

    public infoRequest(): Promise<string>[] {
        const promises: Promise<string>[] = [];

        this.redisService.publish<any>(Patterns.Info, {})
            .subscribe((result: any) => {
                promises.push(new Promise((resolve, reject) => {
                    resolve(result);
                }));
            }, (error: any) => {
                promises.push(new Promise((resolve, reject) => {
                    reject(error);
                }));
            });

        return promises;
    }

    public infoRequest2(): Observable<string> {
        return this.redisService.publish<any>(Patterns.Info, {})
            .pipe(map(answer => {
                return answer;
        }));
    }
}