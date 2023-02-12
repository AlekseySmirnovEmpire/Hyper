import { Module } from '@nestjs/common';
import {PrismaService} from "./database/prisma.service";
import {UsersModule} from "./users/users.module";
import {AppController} from "./app.controller";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  providers: [PrismaService],
  controllers: [AppController]
})
export class AppModule {}
