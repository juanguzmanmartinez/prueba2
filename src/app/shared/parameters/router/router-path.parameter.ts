import { ACCOUNT_ROUTER_PATH } from '@parameters/router/routing/account/account-router-path.parameter';
import { ADMINISTRATOR_ROUTER_PATH } from '@parameters/router/routing/administrator/administrator-router-path.parameter';
import { CORE_ROUTER_PATH } from '@parameters/router/routing/core/core-router-path.parameter';
import { OPERATIONS_ROUTER_PATH } from '@parameters/router/routing/operations/operations-router-path.parameter';

export const ROUTER_PATH = {
    ...CORE_ROUTER_PATH,
    ...ACCOUNT_ROUTER_PATH,
    ...ADMINISTRATOR_ROUTER_PATH,
    ...OPERATIONS_ROUTER_PATH,
};
