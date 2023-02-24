import $api from "../http/api";
import {AxiosResponse} from "axios";
import {IAuthResponse} from "../models/response/IAuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/auth/login', {email, password});
    }

    static async registration(firstName: string, lastName: string, nickName: string, email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/auth/register', {firstName, lastName, nickName, email, password});
    }

    static async logOut(): Promise<void> {
        return $api.delete('/auth/logout');
    }
}