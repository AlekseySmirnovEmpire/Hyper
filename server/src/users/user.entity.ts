import {compare, hash} from 'bcryptjs';
import * as process from "process";

export class UserEntity {
    private _password: string

    constructor(
        private readonly _email: string,
        private readonly _firstName: string,
        private readonly _lastName: string,
        private readonly _nickName: string,
        private readonly _role: string,
        private readonly _rating: number,
        pass?: string) {
        this._password = pass;
    }

    public async setPassword(pass: string): Promise<void> {
        this._password = await hash(pass, parseInt(process.env.SALT));
    }

    public async comparePassword(pass: string): Promise<boolean> {
        return await compare(pass, this._password);
    }

    get rating(): number {
        return this._rating;
    }

    get password(): string {
        return this._password;
    }

    get email(): string {
        return this._email;
    }

    get firstName(): string {
        return this._firstName;
    }

    get lastName(): string {
        return this._lastName;
    }

    get nickName(): string {
        return this._nickName;
    }

    get role(): string {
        return this._role;
    }
}