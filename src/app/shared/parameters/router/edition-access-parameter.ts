import { Role } from '@parameters/auth/role.parameter';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';

const ADMIN = Role.Admin;
const ASSISTANT = Role.Assistant;

export const EDITION_ACCESS: { [p: string]: Role[] } = {
    [CONCAT_PATH.operationZones]: [ADMIN, ASSISTANT],
    [CONCAT_PATH.operationStores]: [ADMIN],
    [CONCAT_PATH.operationCapacities]: [ADMIN, ASSISTANT],
    [CONCAT_PATH.operationSettings]: [ADMIN],
};
