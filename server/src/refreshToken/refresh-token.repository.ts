import {IRefreshTokenRepository} from "./refresh-token.repository.interface";
import {RefreshTokenEntity} from "./refresh-token.entity";
import {PrismaService} from "../database/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository{
    constructor(private readonly prismaService: PrismaService) {
    }

    async findById(tokenId: string): Promise<RefreshTokenEntity | null> {
        try {
            const data = await this.prismaService.client.refreshToken.findFirst({
                where: {
                    id: tokenId
                },
                include: {User: true}
            });
            const token = new RefreshTokenEntity(data.User);
            token.id = data.id;

            return token;
        } catch (ex) {
            return null;
        }
    }

    async add(userId: string): Promise<void> {
        await this.prismaService.client.refreshToken.create({
            data: {
                userId
            }
        });
    }

    async findByUserId(userId: string): Promise<RefreshTokenEntity | null> {
        try {
            const data = await this.prismaService.client.refreshToken.findFirst({
                where: {
                    userId
                },
                include: {User: true}
            });
            const token = new RefreshTokenEntity(data.User);
            token.id = data.id;

            return token;
        } catch (ex) {
            return null;
        }
    }

    async remove(id: string): Promise<void> {
        await this.prismaService.client.refreshToken.delete({
            where: {
                id
            }
        });
    }

}