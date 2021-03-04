import { Controller, Get, Res, UseGuards } from '@nestjs/common'

import { Response } from 'express'
import { OidcGuard } from '../guards/oidc.guard'

@Controller()
export class AuthController {
    @UseGuards(OidcGuard)
    @Get('/login')
    login() {
        console.log('login')
        return
    }

    @UseGuards(OidcGuard)
    @Get('/callback')
    callback(@Res() res: Response) {
        console.log('callback')

        return res.redirect('/')
    }
}
