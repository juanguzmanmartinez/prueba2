import { Role } from '@models/auth/role.model';

export interface IUser {
    client_id: string;
    exp: number;
    jti: string;
    scope: Array<'read' | 'write'>;
    authorities: Role[];
    email: string;
    user_name: string;
    name: string;
    first_last_name: string;
    second_last_name: string;
}
