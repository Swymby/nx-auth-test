import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class OidcGuard extends AuthGuard('oidc') {
    async canActivate(context: ExecutionContext) {
        console.log('oidc can activate')
        const result = (await super.canActivate(context)) as boolean
        const request = context.switchToHttp().getRequest()
        await super.logIn(request)
        return result
    }
}
