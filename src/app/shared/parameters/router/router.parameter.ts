import { OPERATIONS_ROUTER } from '@parameters/router/routing/operations/operations-router.parameter';
import { ADMINISTRATOR_ROUTER } from '@parameters/router/routing/administrator/administrator-router.parameter';
import { ORDER_ROUTER } from '@parameters/router/routing/order/order-router.parameter';
import { TRouter } from '@models/auth/router.model';
import { CAPACITIES_ROUTER } from './routing/capacities/capacities-router.parameters';
import { CT_ROUTER } from './routing/control-tower/control-tower-router.parameter';

export const ROUTER_LIST: TRouter[] = [
  ADMINISTRATOR_ROUTER,
  OPERATIONS_ROUTER,
  ORDER_ROUTER,
  CAPACITIES_ROUTER,
  CT_ROUTER
];
