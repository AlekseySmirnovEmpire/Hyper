import {PrismaClient} from "@prisma/client";
import {INestApplication, Injectable, Logger, OnModuleInit} from "@nestjs/common";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    client: PrismaClient;
    constructor() {
        super();
        this.client = new PrismaClient({
            log: [
                { level: 'warn', emit: 'event' },
                { level: 'info', emit: 'event' },
                { level: 'error', emit: 'event' },
            ],
        });
    }
    async onModuleInit(): Promise<void> {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on("beforeExit", async () => {
            await app.close();
        });
    }
}