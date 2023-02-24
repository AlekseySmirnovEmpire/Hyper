import { sign } from 'jsonwebtoken';
import {UserModel} from "@prisma/client";

export class RefreshTokenEntity {
    constructor(user: UserModel) {
        this.user = user;
        this.userId = user.id;
    }

    id: string;
    userId: string;
    user: UserModel;
    sign(): string {
        return sign({ ...this }, process.env.JWT_REFRESH, {expiresIn: '30d'});
    }
}