import {UserModel} from "@prisma/client";

export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
    user: UserModel;
}