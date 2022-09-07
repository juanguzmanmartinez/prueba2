import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { Role } from '@parameters/auth/role.parameter';
import { Access } from '@parameters/auth/access.parameter';
import { permissions } from '@helpers/auth.helper';
import { TBasePermissions } from '@models/auth/permissions.model';

const EDITOR = Role.Editor;
const VIEWER = Role.Viewer;

const ZONES_PARENT_PERMISSIONS: TBasePermissions = {
  [ROUTER_PATH.zone]: [[EDITOR, VIEWER], Access.Order],
};
const ZONES_CHILDREN_PERMISSIONS: TBasePermissions = {
  [ROUTER_PATH.zonesPath]: [[EDITOR, VIEWER], Access.OrderRecords],
};
export const ZONE_ROUTER_PERMISSIONS = permissions(
  ZONES_PARENT_PERMISSIONS,
  ZONES_CHILDREN_PERMISSIONS
);
