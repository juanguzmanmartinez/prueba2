import { Role } from '@parameters/auth/role.parameter';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

const DEVELOPER = Role.Developer.valueOf();
const ADMIN = Role.Admin.valueOf();
const ASSISTANT = Role.Assistant.valueOf();
const VIEWER = Role.Viewer.valueOf();

export const ROUTER_ACCESS = {
    [ROUTER_PATH.admin]: [DEVELOPER],

    [ROUTER_PATH.operationZones]: [ADMIN, VIEWER, ASSISTANT],
    [ROUTER_PATH.opZones_Zone()]: [ADMIN, VIEWER, ASSISTANT],
    [ROUTER_PATH.opZones_ZoneEdition()]: [ADMIN, ASSISTANT],
    [ROUTER_PATH.opZones_ZoneServiceTypeEdition()]: [ADMIN, ASSISTANT],
    [ROUTER_PATH.opZones_ZoneBackupEdition()]: [ADMIN, ASSISTANT],
    [ROUTER_PATH.opZones_ZoneBackupAmPmEdition()]: [ADMIN, ASSISTANT],
    [ROUTER_PATH.opZones_ZoneBackupScheduledEdition()]: [ADMIN, ASSISTANT],

    [ROUTER_PATH.operationStores]: [DEVELOPER],
    [ROUTER_PATH.opStores_Store()]: [DEVELOPER],
    [ROUTER_PATH.opStores_StoreEdition()]: [DEVELOPER],
    [ROUTER_PATH.opStores_StoreServiceTypeEdition()]: [DEVELOPER],

    [ROUTER_PATH.operationCapacities]: [ADMIN, VIEWER, ASSISTANT],
    [ROUTER_PATH.operationSettings]: [DEVELOPER],
    [ROUTER_PATH.opCapacitiesReport]: [DEVELOPER],
};

