import { Module } from '@nestjs/common'
import { AuthModule, OidcConfig } from '@oauthtest/auth'

import { AppController } from './app.controller'
import { AppService } from './app.service'

const oidcConfig: OidcConfig = {
    issuer: 'http://localhost:3333',
    client_id: 'clients',
    client_secret: 'clients',

    scope: 'openid',
    callback: 'http://localhost:4800'
}

@Module({
    imports: [
        AuthModule.register(oidcConfig)
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
