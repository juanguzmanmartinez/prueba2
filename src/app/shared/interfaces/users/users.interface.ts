import { IUserPermissions } from '@interfaces/auth/user.interface';

export interface IRegisteredUser {
    id: string;
    name: string;
    lastname: string;
    position: string;
    enabled: boolean;
    email: string;
    permissions: IUserPermissions[];
}

