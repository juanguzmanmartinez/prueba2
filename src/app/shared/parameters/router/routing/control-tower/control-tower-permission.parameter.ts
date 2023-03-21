import { permissions } from '@helpers/auth.helper';
import { TBasePermissions } from '@models/auth/permissions.model';
import { Access } from '@parameters/auth/access.parameter';
import { Role } from '@parameters/auth/role.parameter';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

const EDITOR = Role.Editor;
const VIEWER = Role.Viewer;

const CT_PARENT_PERMISSIONS: TBasePermissions = {
  [ROUTER_PATH.controlTower]: [[EDITOR, VIEWER], Access.ControlTower],
};
const CT_CHILDREN_PERMISSIONS: TBasePermissions = {
  [ROUTER_PATH.ctControlFleet]: [[EDITOR, VIEWER], Access.CTControlFleet],
  [ROUTER_PATH.ctRouteMonitoring]: [[EDITOR, VIEWER], Access.CTRouteMonitoring],
};
export const CT_ROUTER_PERMISSIONS = permissions(
  CT_PARENT_PERMISSIONS,
  CT_CHILDREN_PERMISSIONS
);
