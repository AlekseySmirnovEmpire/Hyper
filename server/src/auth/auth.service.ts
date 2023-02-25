import {BadRequestException, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {IUserRepository, USER_REPOSITORY} from "../users/user.repository.interface";
import {UserEntity} from "../users/user.entity";
import {UserModel, RefreshToken} from "@prisma/client";
import {RefreshTokenEntity} from "../refreshToken/refresh-token.entity";
import {LoginDto} from "../users/dto/login.dto";
import {IRefreshTokenService, REFRESH_TOKEN_SERVICE} from "../refreshToken/refresh-token.service.interface";
import {sign, verify} from "jsonwebtoken";

@Injectable()
export class AuthService {
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
        @Inject(REFRESH_TOKEN_SERVICE) private readonly refreshTokenService: IRefreshTokenService,
        private readonly jwtService: JwtService) {
    }

    async validateUser(email: string, password: string): Promise<UserModel | null> {
        const existedUser = await this.userRepository.find(email);
        if (!existedUser) {
            return null;
        }
        const newUser = new UserEntity(
            existedUser.email,
            existedUser.firstName,
            existedUser.lastName,
            existedUser.nickName,
            existedUser.role,
            existedUser.rating,
            existedUser.password);
        if (await newUser.comparePassword(password)) {
            return existedUser;
        }
    }

    async confirmUser(userId: string): Promise<void> {
        const user = await this.userRepository.findById(userId);
        if (!user || user.isActivated) {
            throw new BadRequestException();
        }

        await this.userRepository.confirm(userId);
    }

    async login({email, password}: LoginDto): Promise<{ accessToken: string; refreshToken: string; user: UserModel }> {
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new BadRequestException();
        }
        // need to create this method
        return await this.newRefreshAndAccessToken(user);
    }

    async refresh(refreshStr: string | undefined | null): Promise<{accessToken: string, user: UserModel}> {
        if (!refreshStr) {
            throw new BadRequestException();
        }
        const refreshToken = await this.retrieveRefreshToken(refreshStr);
        if (!refreshToken) {
            throw new BadRequestException();
        }

        const user = await this.userRepository.findById(refreshToken.userId);
        if (!user) {
            throw new BadRequestException();
        }

        const accessToken = {
            email: user.email,
            password: user.password
        };

        return {
            accessToken: sign(accessToken, process.env.JWTSECRET, { expiresIn: '1h' }),
            user
        };
    }

    async logout(refreshStr: string): Promise<void> {
        const refreshToken = await this.retrieveRefreshToken(refreshStr);
        if (!refreshToken) {
            throw new UnauthorizedException();
        }

        await this.refreshTokenService.removeToken(refreshToken.id);
    }

    private retrieveRefreshToken(refreshStr: string,): Promise<RefreshToken | null> {
        try {
            const decoded = verify(refreshStr, process.env.JWT_REFRESH);
            if (typeof decoded === 'string') {
                return null;
            }
            return Promise.resolve(
                this.refreshTokenService.findToken(decoded.id),
            );
        } catch (ex) {
            return null;
        }
    }

    private async newRefreshAndAccessToken(user: UserModel): Promise<{ accessToken: string; refreshToken: string; user: UserModel }> {
        const refreshObject = new RefreshTokenEntity(user);

        await this.refreshTokenService.addToken(refreshObject);

        return {
            refreshToken: refreshObject.sign(),
            accessToken: this.jwtService.sign(
                {
                    email: user.email,
                    password: user.password
                }
            ),
            user
        };
    }
}
