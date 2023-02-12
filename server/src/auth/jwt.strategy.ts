import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import * as process from "process";
import {AuthService} from "./auth.service";
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWTSECRET,
        });
    }

    async validate(payload: any) {
        const user = await this.authService.validateUser(payload.user.email, payload.user.password);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}