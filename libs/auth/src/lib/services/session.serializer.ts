import { PassportSerializer } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SessionSerializer extends PassportSerializer {
    serializeUser(user: unknown, done: (err: Error, user: unknown) => void): void {
        console.log('ser', user)
        done(null, user)
    }

    deserializeUser(payload: string, done: (err: Error, payload: string) => void): void {
        console.log('deser', payload)
        done(null, payload)
    }
}
