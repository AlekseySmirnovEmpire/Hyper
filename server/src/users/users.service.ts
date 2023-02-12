import {Inject, Injectable} from '@nestjs/common';
import {IUserService} from "./user.service.interface";
import {RegisterDto} from "./dto/register.dto";
import {UserEntity} from "./user.entity";
import {LoginDto} from "./dto/login.dto";
import {Role} from "./role.enum";
import {IUserRepository, USER_REPOSITORY} from "./user.repository.interface";
import {UserModel} from "@prisma/client";
import * as process from "process";

@Injectable()
export class UsersService implements IUserService{

    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {
    }
    async createUser({email, firstName, lastName, nickName, password}: RegisterDto): Promise<UserModel | null> {
        const newUser = new UserEntity(email, firstName, lastName, nickName, Role.User, parseInt(process.env.DEFAULT_RATING));
        await newUser.setPassword(password);
        const existedUser = await this.userRepository.find(email);
        if (existedUser) {
            return null;
        }

        return await this.userRepository.create(newUser);
    }

}
