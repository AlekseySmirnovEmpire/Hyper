import {Module} from "@nestjs/common";
import {PrismaService} from "../database/prisma.service";
import {REFRESH_TOKEN_REPOSITORY} from "./refresh-token.repository.interface";
import {RefreshTokenRepository} from "./refresh-token.repository";
import {RefreshTokenService} from "./refresh-token.service";
import {REFRESH_TOKEN_SERVICE} from "./refresh-token.service.interface";

@Module({
    providers: [
        {
            useClass: RefreshTokenRepository,
            provide: REFRESH_TOKEN_REPOSITORY
        },
        {
            useClass: RefreshTokenService,
            provide: REFRESH_TOKEN_SERVICE
        },
        PrismaService
    ],
    exports: [
        {
            useClass: RefreshTokenRepository,
            provide: REFRESH_TOKEN_REPOSITORY
        },
        {
            useClass: RefreshTokenService,
            provide: REFRESH_TOKEN_SERVICE
        }
    ]
})
export class RefreshTokenModule {
}