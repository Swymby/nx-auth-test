import { DynamicModule, Module } from '@nestjs/common'
import { OidcGuard } from './guards/oidc.guard'
import { AuthenticatedGuard } from './guards/authenticated.guard'

import { SessionSerializer } from './services/session.serializer'
import { OidcStrategyFactory } from './strategy/oidc.strategy.factory'
import { OidcConfig } from './strategy/oidc.config'
import { AuthController } from './controllers/auth.controller'

@Module({ })
export class AuthModule {
    static register(config: OidcConfig): DynamicModule {
        return {
            module: AuthModule,
            controllers: [AuthController],
            providers: [OidcGuard, AuthenticatedGuard, SessionSerializer, OidcStrategyFactory.register(config)],
            exports: [OidcGuard, AuthenticatedGuard, SessionSerializer],
        }
    }
}
