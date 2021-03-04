import { OidcConfig } from './oidc.config'
import { buildOpenIdClient, OidcStrategy } from './oidc.strategy'

export class OidcStrategyFactory {
    static register({ issuer, client_id, client_secret, scope, callback }: OidcConfig) {
        return {
            provide: 'OidcStrategy',
            useFactory: async () => {
                const client = await buildOpenIdClient(issuer, client_id, client_secret)
                const strategy = new OidcStrategy(client, callback, scope)
                return strategy
            }
        }
    }
}
