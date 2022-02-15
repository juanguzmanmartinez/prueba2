import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { Role } from '@parameters/auth/role.parameter';
import { Access } from '@parameters/auth/access.parameter';
import { permissions } from '@helpers/auth.helper';
import { TBasePermissions } from '@models/auth/permissions.model';

const EDITOR = Role.Editor;
const VIEWER = Role.Viewer;

const ORDER_PARENT_PERMISSIONS: TBasePermissions =
  {[ROUTER_PATH.order]: [[EDITOR, VIEWER], Access.Order]};
const ORDER_CHILDREN_PERMISSIONS: TBasePermissions = {
  [ROUTER_PATH.orderRecords]: [[EDITOR, VIEWER], Access.OrderRecords],
  [ROUTER_PATH.orderDetail()]: [[EDITOR, VIEWER], Access.OrderRecords],

};
export const ORDER_ROUTER_PERMISSIONS = permissions(ORDER_PARENT_PERMISSIONS, ORDER_CHILDREN_PERMISSIONS);
