import { Role } from '@parameters/auth/role.parameter';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';

const DEVELOPER = Role.Developer.valueOf();
const ADMIN = Role.Admin.valueOf();
const ASSISTANT = Role.Assistant.valueOf();
const VIEWER = Role.Viewer.valueOf();

export const ROUTER_ACCESS = {
    [CONCAT_PATH.admin]: [DEVELOPER],
    [CONCAT_PATH.operationZones]: [DEVELOPER],
    [CONCAT_PATH.operationStores]: [DEVELOPER],
    [CONCAT_PATH.operationCapacities]: [ADMIN, VIEWER, ASSISTANT],
    [CONCAT_PATH.operationSettings]: [ADMIN, VIEWER],
    [CONCAT_PATH.operationCapacitiesReport]: [DEVELOPER],
};
