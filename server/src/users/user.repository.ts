import {IUserRepository} from "./user.repository.interface";
import {UserEntity} from "./user.entity";
import {UserModel} from "@prisma/client";
import {Injectable} from "@nestjs/common";
import {PrismaService} from "../database/prisma.service";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private readonly prismaService: PrismaService) {
    }

    create({email, firstName, lastName, nickName, password}: UserEntity): Promise<UserModel> {
        return this.prismaService.client.userModel.create({
            data: {
                firstName,
                lastName,
                nickName,
                email,
                password
            }
        });
    }

    find(email: string): Promise<UserModel | null> {
        return this.prismaService.client.userModel.findFirst({
            where: {
                email
            },
            include: {RefreshToken: true}
        });
    }

    findById(id: string): Promise<UserModel | null> {
        return this.prismaService.client.userModel.findFirst({
            where: {
                id
            },
            include: {RefreshToken: true}
        });
    }

}