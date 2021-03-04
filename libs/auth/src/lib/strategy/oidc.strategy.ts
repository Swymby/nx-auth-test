import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Client, UserinfoResponse, TokenSet, Issuer } from 'openid-client'

export const buildOpenIdClient = async (issuer: string, client_id: string, client_secret: string) => {
    const TrustIssuer = await Issuer.discover(`${issuer}/.well-known/openid-configuration`)
    const client = new TrustIssuer.Client({
        client_id,
        client_secret,
        token_endpoint_auth_method: 'client_secret_post',
    })

    return client
}

@Injectable()
export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
    client: Client

    constructor(client: Client, redirect_uri: string, scope: string) {
        super({
            client: client,
            params: {
                redirect_uri: `${redirect_uri}/callback`,
                scope,
            },
            passReqToCallback: false,
            usePKCE: false,
        })

        this.client = client
    }

    async validate(tokenset: TokenSet): Promise<UserinfoResponse> {
        const userinfo: UserinfoResponse = await this.client.userinfo(tokenset)

        try {
            console.log('validate', { ...userinfo, id_token: tokenset.id_token })
            return { ...userinfo, id_token: tokenset.id_token }
        } catch (err) {
            throw new UnauthorizedException()
        }
    }
}
