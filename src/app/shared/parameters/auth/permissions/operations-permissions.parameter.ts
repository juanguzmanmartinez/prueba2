import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { Role } from '@parameters/auth/role.parameter';
import { Access } from '@parameters/auth/access.parameter';
import { DefaultPermissions } from '@models/auth/permissions.model';

const EDITOR = Role.Editor;
const VIEWER = Role.Viewer;
const DEVELOPER = Role.Developer;

export const OPERATIONS_PARENT_PERMISSIONS = new DefaultPermissions([EDITOR, VIEWER], Access.Operations, null,
    [Access.OperationZones, Access.OperationStores, Access.OperationCapacities, Access.OperationSettings]);

export const OPERATIONS_PERMISSIONS: { [key: string]: DefaultPermissions } = {
    [ROUTER_PATH.operations]: OPERATIONS_PARENT_PERMISSIONS,

    [ROUTER_PATH.operationZones]: new DefaultPermissions([EDITOR, VIEWER], Access.OperationZones, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opZones_Zone()]: new DefaultPermissions([EDITOR, VIEWER], Access.OperationZones, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opZones_ZoneEdition()]: new DefaultPermissions([EDITOR], Access.OperationZones, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opZones_ZoneServiceTypeEdition()]: new DefaultPermissions([EDITOR], Access.OperationZones, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opZones_ZoneBackupEdition()]: new DefaultPermissions([EDITOR], Access.OperationZones, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opZones_ZoneBackupAmPmEdition()]: new DefaultPermissions([EDITOR], Access.OperationZones, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opZones_ZoneBackupScheduledEdition()]: new DefaultPermissions([EDITOR], Access.OperationZones, OPERATIONS_PARENT_PERMISSIONS),

    [ROUTER_PATH.operationDrugstores]: new DefaultPermissions([EDITOR, VIEWER], Access.OperationStores, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opDrugstores_Drugstore()]: new DefaultPermissions([EDITOR, VIEWER], Access.OperationStores, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opDrugstores_DrugstoreEdition()]: new DefaultPermissions([EDITOR, VIEWER], Access.OperationStores, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opDrugstores_DrugstoreServiceTypeEdition()]: new DefaultPermissions([EDITOR, VIEWER], Access.OperationStores, OPERATIONS_PARENT_PERMISSIONS),

    [ROUTER_PATH.operationCapacities]: new DefaultPermissions([EDITOR, VIEWER], Access.OperationCapacities, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opCapacitiesAmPm]: new DefaultPermissions([EDITOR, VIEWER], Access.OperationCapacities, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opCapacitiesExpress]: new DefaultPermissions([EDITOR, VIEWER], Access.OperationCapacities, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opCapacitiesScheduled]: new DefaultPermissions([EDITOR, VIEWER], Access.OperationCapacities, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opCapacitiesRet]: new DefaultPermissions([EDITOR, VIEWER], Access.OperationCapacities, OPERATIONS_PARENT_PERMISSIONS),
    [ROUTER_PATH.opCapacitiesReport]: new DefaultPermissions([DEVELOPER], Access.OperationCapacities, OPERATIONS_PARENT_PERMISSIONS),

    [ROUTER_PATH.operationSettings]: new DefaultPermissions([DEVELOPER], Access.OperationSettings, OPERATIONS_PARENT_PERMISSIONS),
};
