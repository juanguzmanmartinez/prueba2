import { ADMINISTRATOR_ROUTER_PERMISSIONS } from '@parameters/router/routing/administrator/administrator-router-permissions.parameter';
import { OPERATIONS_ROUTER_PERMISSIONS } from '@parameters/router/routing/operations/operations-router-permissions.parameter';
import { ORDER_ROUTER_PERMISSIONS } from '@parameters/router/routing/order/order-router-permission.parameter';
import { CAPACITIES_ROUTER_PERMISSIONS } from './routing/capacities/capacities-router-permission.parameter';
// import { CAPACITY_ROUTER_PERMISSIONS } from './routing/capacity/capacities-router-permission.parameter';
// import { ZONE_ROUTER_PERMISSIONS } from './routing/zones/zones-router-permission.parameter';

export const ROUTER_PERMISSIONS = {
  ...ADMINISTRATOR_ROUTER_PERMISSIONS,
  ...OPERATIONS_ROUTER_PERMISSIONS,
  ...ORDER_ROUTER_PERMISSIONS,
  // ...ZONE_ROUTER_PERMISSIONS,
  // ...CAPACITY_ROUTER_PERMISSIONS,
  ...CAPACITIES_ROUTER_PERMISSIONS
};
