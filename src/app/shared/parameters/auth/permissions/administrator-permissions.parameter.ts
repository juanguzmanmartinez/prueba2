import { Role } from '@parameters/auth/role.parameter';
import { Access } from '@parameters/auth/access.parameter';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { DefaultPermissions } from '@models/auth/permissions.model';

const EDITOR = Role.Editor;
const DEVELOPER = Role.Developer;

export const ADMINISTRATOR_PARENT_PERMISSIONS = new DefaultPermissions([DEVELOPER], Access.Administrator, null, [Access.AdministratorUsers]);

export const ADMINISTRATOR_PERMISSIONS: { [key: string]: DefaultPermissions } = {
    [ROUTER_PATH.administrator]: ADMINISTRATOR_PARENT_PERMISSIONS,
    [ROUTER_PATH.administratorUsers]: new DefaultPermissions([DEVELOPER], Access.Administrator, ADMINISTRATOR_PARENT_PERMISSIONS)
};
