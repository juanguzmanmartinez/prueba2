import { OPERATIONS_ROUTER } from '@parameters/router/routing/operations/operations-router.parameter';
import { ADMINISTRATOR_ROUTER } from '@parameters/router/routing/administrator/administrator-router.parameter';
import { TRouter } from '@models/auth/router.model';

export const ROUTER_LIST: TRouter[] = [
    ADMINISTRATOR_ROUTER,
    OPERATIONS_ROUTER
];
