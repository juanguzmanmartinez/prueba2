import { ADMINISTRATOR_ROUTER_PERMISSIONS } from '@parameters/router/routing/administrator/administrator-router-permissions.parameter';
import { OPERATIONS_ROUTER_PERMISSIONS } from '@parameters/router/routing/operations/operations-router-permissions.parameter';
import { ORDER_ROUTER_PERMISSIONS } from '@parameters/router/routing/order/order-router-permission.parameter';

export const ROUTER_PERMISSIONS = {
  ...ADMINISTRATOR_ROUTER_PERMISSIONS,
  ...OPERATIONS_ROUTER_PERMISSIONS,
  ...ORDER_ROUTER_PERMISSIONS
};
