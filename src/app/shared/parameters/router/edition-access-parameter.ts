import { Role } from '@parameters/auth/role.parameter';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

const ADMIN = Role.Admin;
const ASSISTANT = Role.Assistant;

export const EDITION_ACCESS: { [p: string]: Role[] } = {
    [ROUTER_PATH.operationZones]: [ADMIN, ASSISTANT],
    [ROUTER_PATH.operationStores]: [ADMIN, ASSISTANT],
    [ROUTER_PATH.operationCapacities]: [ADMIN, ASSISTANT],
    [ROUTER_PATH.operationSettings]: [ADMIN],
};
