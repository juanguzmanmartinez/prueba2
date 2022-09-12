import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { Role } from '@parameters/auth/role.parameter';
import { Access } from '@parameters/auth/access.parameter';
import { permissions } from '@helpers/auth.helper';
import { TBasePermissions } from '@models/auth/permissions.model';

const EDITOR = Role.Editor;
const VIEWER = Role.Viewer;

const CAPACITIES_PARENT_PERMISSIONS: TBasePermissions = {
  [ROUTER_PATH.capacity]: [[EDITOR, VIEWER], Access.Order],
};
const CAPACITIES_CHILDREN_PERMISSIONS: TBasePermissions = {
  [ROUTER_PATH.capacitiesPath]: [[EDITOR, VIEWER], Access.OrderRecords],
  [ROUTER_PATH.intervalPath]: [[EDITOR, VIEWER], Access.OrderRecords],
  [ROUTER_PATH.reportPath]: [[EDITOR, VIEWER], Access.OrderRecords],
};

export const CAPACITY_ROUTER_PERMISSIONS = permissions(
  CAPACITIES_PARENT_PERMISSIONS,
  CAPACITIES_CHILDREN_PERMISSIONS
);
