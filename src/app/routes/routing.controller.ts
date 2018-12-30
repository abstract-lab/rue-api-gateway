import { Controller, Get, Res, HttpStatus, HttpException } from '@nestjs/common';
import { Response } from 'express';

import { RoutingService } from './routing.service';

@Controller()
export class RoutingController {
    constructor(private service: RoutingService) { }

    @Get('/info')
    public async getInfo(@Res() response: Response) {
        try {
            response.send(await this.service.infoRequest()).status(HttpStatus.OK);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}