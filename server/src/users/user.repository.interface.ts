import {UserEntity} from "./user.entity";
import {UserModel} from "@prisma/client";

export const USER_REPOSITORY = 'USER_REPOSITORY';
export interface IUserRepository {
    create: (user: UserEntity) => Promise<UserModel>;
    find: (email: string) => Promise<UserModel | null>;
    findById: (id: string) => Promise<UserModel | null>;
    confirm: (id: string) => Promise<void>;
}