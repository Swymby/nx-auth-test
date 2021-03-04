/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

import { AppModule } from './app/app.module'

import * as session from 'express-session'
import * as passport from 'passport'

import { AuthExceptionFilter } from '@oauthtest/auth'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    app.useGlobalFilters(new AuthExceptionFilter())

    app.use(session({ secret: 'sessionsecret', resave: false, saveUninitialized: false }))

    app.use(passport.initialize())
    app.use(passport.session())


    app.useStaticAssets(join(__dirname, 'assets', 'public'))
    app.setBaseViewsDir(join(__dirname, 'assets', 'views'))
    app.setViewEngine('hbs')

    const port = process.env.PORT || 4900
    await app.listen(port, () => {
        Logger.log('Listening at http://localhost:' + port + '/')
    })
}

bootstrap()
