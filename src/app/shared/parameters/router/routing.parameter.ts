import { OPERATIONS_ROUTING } from '@parameters/router/routing/operations-routing.parameter';
import { ACCOUNT_ROUTING } from '@parameters/router/routing/account-routing.parameter';
import { ADMINISTRATOR_ROUTING } from '@parameters/router/routing/administrator-routing.parameter';

export const ROUTING = {
    account: ACCOUNT_ROUTING.path,
    administrator: ADMINISTRATOR_ROUTING.path,
    operations: OPERATIONS_ROUTING.path,
    notFound: 'no-encontrado',
    notInternetConnection: 'sin-internet',
    wildcard: '**',
};
