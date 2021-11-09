import { AD_CHILDREN_PATH, ADMINISTRATOR_ROUTER } from '@parameters/router/routing/administrator/administrator-router.parameter';

export const ADMINISTRATOR_ROUTER_PATH = {
    administrator: `/${ADMINISTRATOR_ROUTER.path}`,
    administratorUsers: `/${ADMINISTRATOR_ROUTER.path}/${AD_CHILDREN_PATH.users}`,
};
