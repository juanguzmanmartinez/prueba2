import { Role } from './role.model';
import { IUser } from '@interfaces/auth/user.interface';

export class User {
    role: Role;
    username: string;
    email: string;
    name: string;
    firstLastName: string;
    secondLastName: string;

    constructor(iUser: IUser) {
        this.role = iUser.authorities[0];
        this.username = iUser.user_name;
        this.email = iUser.email;
        this.name = iUser.name;
        this.firstLastName = iUser.first_last_name;
        this.secondLastName = iUser.second_last_name;
    }
}
