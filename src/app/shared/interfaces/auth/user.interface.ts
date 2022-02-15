import { Role } from '@parameters/auth/role.parameter';
import { Access } from '@parameters/auth/access.parameter';

export interface IUserPosition {
    description: string;
    shortName: string;
    enabled: boolean;
    cargoId: string;
}

export interface IUserPermissions {
    role: IUserPermissionsRole;
    subModList: IUserPermissionsAccess[];
}

export interface IUserPermissionsRole {
    description: string;
    enabled: boolean;
    name: Role;
    roleId: string;
}

export interface IUserPermissionsAccess {
    enabled: boolean;
    moduleId: string;
    moduleDescription: string;
    moduleShortName: Access;
    subModId: string;
    description: string;
    shortName: Access;
}
