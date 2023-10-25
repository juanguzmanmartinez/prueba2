import { Role } from '@parameters/auth/role.parameter';
import { IUserPermissions, IUserPosition } from '@interfaces/auth/user.interface';

export interface IDecodeToken {
    client_id: string;
    exp: number;
    jti: string;
    scope: ('read' | 'write')[];
    authorities: Role[];
    email: string;
    user_name: string;
    name: string;
    first_last_name: string;
    second_last_name: string;
    id: string;
    uuid: string;
    access_list: IUserPermissions[];
    cargo: IUserPosition;
}


export interface ITokenDetail {
    exp: number;
    jti: string;
    client_id: string;
}
