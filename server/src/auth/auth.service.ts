import {Inject, Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {IUserRepository, USER_REPOSITORY} from "../users/user.repository.interface";
import {UserEntity} from "../users/user.entity";
import {UserModel} from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
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

    async login(user: UserModel): Promise<{user: UserModel, access_token: string}> {
        const payload = {
            user
        }

        return {
            user: user,
            access_token: this.jwtService.sign(payload)
        };
    }
}
