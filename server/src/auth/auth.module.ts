import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import * as process from "process";
import {LocalStrategy} from "./local.strategy";
import {JwtStrategy} from "./jwt.strategy";
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    providers: [AuthService, LocalStrategy, JwtStrategy],
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWTSECRET,
            signOptions: {expiresIn: '1h'}
        })],
    exports: [AuthService]
})
export class AuthModule {
}
