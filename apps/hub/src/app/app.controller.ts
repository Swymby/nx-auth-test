import { Controller, Get, Render, Req, Res, UseGuards } from '@nestjs/common'

import { AppService } from './app.service'

import { AuthenticatedGuard } from '@oauthtest/auth'

import { Request, Response } from 'express'

import { notRandom, random } from '@oauthtest/shared/utils'

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

    @UseGuards(AuthenticatedGuard)
    @Get('/logout')
    logout(@Req() req: Request, @Res() res: Response) {
        const idToken = req.user['id_token']
        req.session.destroy(() => {
            console.log('logout')
            res.redirect(`https://hydra.simonet.online/oauth2/sessions/logout?id_token_hint=${idToken}&post_logout_redirect_uri=http://localhost:4700`)
        })
    }

    @Get('/random')
    getRandom(): number {
        return random()
    }

    @Get('/notrandom')
    gnotRandom(): number {
        return notRandom()
    }
}
