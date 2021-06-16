import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { Role } from '@parameters/auth/role.parameter';
import { Access } from '@parameters/auth/access.parameter';
import { LocalPermissions } from '@models/auth/permissions.model';

const EDITOR = Role.Editor;
const VIEWER = Role.Viewer;
const DEVELOPER = Role.Developer;

export const OPERATIONS_PARENT_PERMISSIONS = new LocalPermissions([EDITOR, VIEWER], Access.Operations, null,
    [Access.OperationZones, Access.OperationStores, Access.OperationCapacities, Access.OperationSettings]);

export const OPERATIONS_PERMISSIONS: { [key: string]: LocalPermissions } = {
    [ROUTER_PATH.operations]: OPERATIONS_PARENT_PERMISSIONS,

    [ROUTER_PATH.operationZones]: new LocalPermissions([EDITOR, VIEWER], Access.OperationZones, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opZones_Zone()]: new LocalPermissions([EDITOR, VIEWER], Access.OperationZones, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opZones_ZoneEdition()]: new LocalPermissions([EDITOR], Access.OperationZones, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opZones_ZoneServiceTypeEdition()]: new LocalPermissions([EDITOR], Access.OperationZones, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opZones_ZoneBackupEdition()]: new LocalPermissions([EDITOR], Access.OperationZones, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opZones_ZoneBackupAmPmEdition()]: new LocalPermissions([EDITOR], Access.OperationZones, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opZones_ZoneBackupScheduledEdition()]: new LocalPermissions([EDITOR], Access.OperationZones, OPERATIONS_PARENT_PERMISSIONS),

    [ROUTER_PATH.operationStores]: new LocalPermissions([DEVELOPER], Access.OperationStores, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opStores_Store()]: new LocalPermissions([DEVELOPER], Access.OperationStores, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opStores_StoreEdition()]: new LocalPermissions([DEVELOPER], Access.OperationStores, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opStores_StoreServiceTypeEdition()]: new LocalPermissions([DEVELOPER], Access.OperationStores, OPERATIONS_PARENT_PERMISSIONS),

    [ROUTER_PATH.operationCapacities]: new LocalPermissions([EDITOR, VIEWER], Access.OperationCapacities, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opCapacitiesAmPm]: new LocalPermissions([EDITOR, VIEWER], Access.OperationCapacities, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opCapacitiesExpress]: new LocalPermissions([EDITOR, VIEWER], Access.OperationCapacities, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opCapacitiesScheduled]: new LocalPermissions([EDITOR, VIEWER], Access.OperationCapacities, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opCapacitiesRet]: new LocalPermissions([EDITOR, VIEWER], Access.OperationCapacities, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opCapacitiesReport]: new LocalPermissions([DEVELOPER], Access.OperationCapacities, OPERATIONS_PARENT_PERMISSIONS),

    [ROUTER_PATH.operationSettings]: new LocalPermissions([DEVELOPER], Access.OperationSettings, OPERATIONS_PARENT_PERMISSIONS),
};
