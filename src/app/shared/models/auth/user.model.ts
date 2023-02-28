import { IUserPosition } from '@interfaces/auth/user.interface';
import { UserPermissions } from '@models/auth/permissions.model';
import { IDecodeToken } from '@interfaces/auth/token.interface';

export class User {
    username: string;
    email: string;
    name: string;
    firstLastName: string;
    secondLastName: string;
    position: UserPosition;
    permissionList: UserPermissions[];
    id:string;
    constructor(iDecodeToken: IDecodeToken) {
        this.id = iDecodeToken.id;
        this.username = iDecodeToken.user_name;
        this.email = iDecodeToken.email;
        this.name = iDecodeToken.name;
        this.firstLastName = iDecodeToken.first_last_name;
        this.secondLastName = iDecodeToken.second_last_name;
        this.position = new UserPosition(iDecodeToken.cargo);
        this.permissionList = iDecodeToken.access_list?.length ? iDecodeToken.access_list
            .map((iUserPermissions) => new UserPermissions(iUserPermissions)) : [];
    }
}

export class UserPosition {
    code: string;
    name: string;

    constructor(iUserPosition: IUserPosition) {
        this.code = iUserPosition?.shortName || '';
        this.name = iUserPosition?.description || '';
    }
}
