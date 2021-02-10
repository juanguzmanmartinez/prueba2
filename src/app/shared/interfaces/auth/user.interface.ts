import { Role } from '@parameters/auth/role.parameter';

export interface IUser {
    authorities: Role[];
    email: string;
    user_name: string;
    name: string;
    first_last_name: string;
    second_last_name: string;
}
