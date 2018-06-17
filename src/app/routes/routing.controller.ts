import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { RoutingService } from './routing.service';

@Controller()
export class RoutingController {
    constructor(private service: RoutingService) { }

    @Get('/info')
    public getInfo(@Res() response: Response) {
        return this.service.infoRequest2();
    }
}