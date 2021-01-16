import { Role } from './role.model';

export class User {
    role: Role;
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token?: string;
}
