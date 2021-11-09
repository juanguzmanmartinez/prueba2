import { Role } from '@parameters/auth/role.parameter';
import { Access } from '@parameters/auth/access.parameter';
import { IUserPermissions } from '@interfaces/auth/user.interface';

export class UserPermissions {
    role: Role;
    access: Access[];

    constructor(iUserPermissions: IUserPermissions) {
        this.role = iUserPermissions?.role?.name || Role.Developer;
        this.access = iUserPermissions?.subModList?.length ? iUserPermissions.subModList
            .map((subModule) => subModule.shortName) : [];
    }

}

export type TBasePermissions = { [key: string]: [Role[], Access] };
export type TPathPermissions = { [key: string]: PathPermissions };

export class PathPermissions {
    roles: Role[];
    access: Access;
    parent?: PathPermissions;
    children?: Access[];
}
