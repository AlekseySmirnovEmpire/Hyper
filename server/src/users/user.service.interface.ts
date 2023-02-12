import {RegisterDto} from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";
import {UserModel} from "@prisma/client";
import {UserEntity} from "./user.entity";

export const USER_SERVICE = 'USER SERVICE';
export interface IUserService {
    createUser: (dto: RegisterDto) => Promise<UserModel | null>;
}