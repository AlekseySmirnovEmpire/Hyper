import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import * as process from "process";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtStrategy} from "./strategies/jwt.strategy";
import * as dotenv from 'dotenv';
import {RefreshTokenModule} from "../refreshToken/refresh-token.module";
dotenv.config();

@Module({
    providers: [AuthService, LocalStrategy, JwtStrategy],
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWTSECRET,
            signOptions: {expiresIn: '1h'}
        }),
        RefreshTokenModule],
    exports: [AuthService]
})
export class AuthModule {
}
