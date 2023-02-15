import {IRefreshTokenService} from "./refresh-token.service.interface";
import {RefreshTokenEntity} from "./refresh-token.entity";
import {Inject, Injectable} from "@nestjs/common";
import {REFRESH_TOKEN_REPOSITORY} from "./refresh-token.repository.interface";
import {RefreshTokenRepository} from "./refresh-token.repository";
import {RefreshToken} from "@prisma/client";

@Injectable()
export class RefreshTokenService implements IRefreshTokenService {
    constructor(@Inject(REFRESH_TOKEN_REPOSITORY) private readonly tokenRepository: RefreshTokenRepository) {
    }
    async addToken(refreshToken: RefreshTokenEntity): Promise<void> {
        const existingToken = await this.tokenRepository.findByUserId(refreshToken.userId);
        if (existingToken) {
            await this.tokenRepository.remove(existingToken.id);
        }

        await this.tokenRepository.add(refreshToken.userId);
    }

    async findToken(id: string): Promise<RefreshToken | null> {
        return await this.tokenRepository.findById(id);
    }

    async removeToken(id: string): Promise<void> {
        try {
            await this.tokenRepository.remove(id);
        } catch (ex) {
            return;
        }
    }

}