import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UserController} from "./user.controller";
import {USER_SERVICE} from "./user.service.interface";
import {UserRepository} from "./user.repository";
import {USER_REPOSITORY} from "./user.repository.interface";
import {PrismaService} from "../database/prisma.service";

@Module({
    providers: [
        {
            useClass: UsersService,
            provide: USER_SERVICE
        },
        {
            useClass: UserRepository,
            provide: USER_REPOSITORY
        },
        PrismaService
    ],
    exports: [
        {
            useClass: UsersService,
            provide: USER_SERVICE
        },
        {
            useClass: UserRepository,
            provide: USER_REPOSITORY
        }
    ],
    controllers: [UserController]
})
export class UsersModule {
}
