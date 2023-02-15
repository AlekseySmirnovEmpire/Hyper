import {RefreshTokenEntity} from "./refresh-token.entity";
import {RefreshToken} from "@prisma/client";

export const REFRESH_TOKEN_SERVICE = 'REFRESH_TOKEN_SERVICE';
export interface IRefreshTokenService {
    addToken: (refreshToken: RefreshTokenEntity) => Promise<void>;
    findToken: (id: string) => Promise<RefreshToken | null>;
    removeToken: (id: string) => Promise<void>;
}