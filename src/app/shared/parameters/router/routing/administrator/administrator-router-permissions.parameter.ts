import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { Role } from '@parameters/auth/role.parameter';
import { Access } from '@parameters/auth/access.parameter';
import { permissions } from '@helpers/auth.helper';
import { TBasePermissions } from '@models/auth/permissions.model';

const DEVELOPER = Role.Developer;

const ADMINISTRATOR_PARENT_PERMISSIONS: TBasePermissions =
    {[ROUTER_PATH.administrator]: [[DEVELOPER], Access.Administrator]};
const ADMINISTRATOR_CHILDREN_PERMISSIONS: TBasePermissions = {
    [ROUTER_PATH.administratorUsers]: [[DEVELOPER], Access.Administrator]
};

export const ADMINISTRATOR_ROUTER_PERMISSIONS = permissions(ADMINISTRATOR_PARENT_PERMISSIONS, ADMINISTRATOR_CHILDREN_PERMISSIONS);
