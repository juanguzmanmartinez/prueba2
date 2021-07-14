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

export class DefaultPermissions {
    roles: Role[];
    access: Access;
    parent: DefaultPermissions;
    children: Access[];

    constructor(
        roles: Role[],
        access: Access,
        parent?: DefaultPermissions,
        children?: Access[],
    ) {
        this.roles = roles;
        this.access = access;
        if (parent) {
            this.parent = parent;
        }
        if (children) {
            this.children = children;
        }
    }

}
