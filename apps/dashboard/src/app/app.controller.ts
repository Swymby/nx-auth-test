import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common'

import { AppService } from './app.service'

import { AuthenticatedGuard } from '@oauthtest/auth'

import { Request } from 'express'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @UseGuards(AuthenticatedGuard)
    @Get('/')
    @Render('index')
    index(@Req() req: Request) {
        const message = this.appService.getData().message

        return { message: `${message} ${JSON.stringify(req.user)}` }
    }
}
