import {RefreshTokenEntity} from "./refresh-token.entity";
import {RefreshToken} from "@prisma/client";

export const REFRESH_TOKEN_REPOSITORY = 'REFRESH_TOKEN_REPOSITORY';
export interface IRefreshTokenRepository {
    findById: (tokenId: string) => Promise<RefreshToken | null>

    findByUserId: (userId: string) => Promise<RefreshToken | null>

    add: (userId: string) => Promise<void>;

    remove: (id: string) => Promise<void>;
}