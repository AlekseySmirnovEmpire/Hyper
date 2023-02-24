import $api from "../http/api";
import {AxiosResponse} from "axios";
import {UserModel} from "@prisma/client";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<UserModel[]>> {
        return $api.get<UserModel[]>('/users');
    }
}