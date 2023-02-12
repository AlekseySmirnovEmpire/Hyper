import {PrismaClient} from "@prisma/client";
import {INestApplication, Injectable, Logger, OnModuleInit} from "@nestjs/common";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    client: PrismaClient;
    constructor() {
        super();
        this.client = new PrismaClient();
    }
    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on("beforeExit", async () => {
            await app.close();
        });
    }
}