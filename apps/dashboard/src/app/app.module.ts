import { Module } from '@nestjs/common'
import { AuthModule, OidcConfig } from '@oauthtest/auth'

import { AppController } from './app.controller'
import { AppService } from './app.service'

const oidcConfig: OidcConfig = {
    issuer: 'http://localhost:3333',
    client_id: 'dashboard',
    client_secret: 'dashboard',

    scope: 'openid',
    callback: 'http://localhost:4900'
}

@Module({
    imports: [
        AuthModule.register(oidcConfig)
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
