import { Module } from '@nestjs/common'
import { AuthModule, OidcConfig } from '@oauthtest/auth'

import { AppController } from './app.controller'
import { AppService } from './app.service'

const oidcConfig: OidcConfig = {
    issuer: 'http://localhost:4444',
    client_id: 'hub',
    client_secret: 'hubhub',

    scope: 'openid',
    callback: 'http://localhost:4700'
}

@Module({
    imports: [
        AuthModule.register(oidcConfig)
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
