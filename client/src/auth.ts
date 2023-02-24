import {UserModel} from "@prisma/client";
import {makeAutoObservable} from "mobx";
import AuthService from "./services/AuthService";
import axios from "axios";
import {IAuthResponse} from "./models/response/IAuthResponse";
import {API_URL} from "./http/api";

export default class AuthCon {
    user: UserModel = {} as UserModel;
    isAuth: boolean = false;
    isLoading: boolean = false;
    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean): void {
        this.isAuth = bool;
    }

    setUser(user: UserModel): void {
        this.user = user;
    }

    setLoading(bool: boolean): void {
        this.isLoading = bool;
    }

    async login(email: string, password: string): Promise<void> {
        try {
            const response = await AuthService.login(email, password);
            console.log(response.data);
            localStorage.setItem('jwt-token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    async registration(firstName: string, lastName: string, nickName: string, email: string, password: string): Promise<void> {
        try {
            const response = await AuthService.registration(firstName, lastName, nickName, email, password);
            this.setUser(response.data.user);
        } catch (ex) {
            console.log(ex);
        }
    }

    async logout(): Promise<void> {
        try {
            const response = await AuthService.logOut();
            localStorage.removeItem('jwt-token');
            this.setAuth(false);
            this.setUser({} as UserModel);
        } catch (ex) {
            console.log(ex);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<IAuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true});
            localStorage.setItem('jwt-token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (ex) {
            console.log(ex);
        } finally {
            this.setLoading(false);
        }
    }
}