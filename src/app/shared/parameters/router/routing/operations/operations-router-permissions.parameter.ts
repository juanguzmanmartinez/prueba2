import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { Role } from '@parameters/auth/role.parameter';
import { Access } from '@parameters/auth/access.parameter';
import { permissions } from '@helpers/auth.helper';
import { TBasePermissions } from '@models/auth/permissions.model';

const EDITOR = Role.Editor;
const VIEWER = Role.Viewer;
const DEVELOPER = Role.Developer;

const OPERATIONS_PARENT_PERMISSIONS: TBasePermissions = {
  [ROUTER_PATH.operations]: [[EDITOR, VIEWER], Access.Operations],
};
const OPERATIONS_CHILDREN_PERMISSIONS: TBasePermissions = {
  [ROUTER_PATH.operationZones]: [[EDITOR, VIEWER], Access.OperationZones],
  [ROUTER_PATH.opZones_Zone()]: [[EDITOR, VIEWER], Access.OperationZones],
  [ROUTER_PATH.opZones_ZoneEdition()]: [[EDITOR], Access.OperationZones],
  [ROUTER_PATH.opZones_ZoneServiceTypeEdition()]: [
    [EDITOR],
    Access.OperationZones,
  ],
  [ROUTER_PATH.opZones_ZoneBackupEdition()]: [[EDITOR], Access.OperationZones],
  [ROUTER_PATH.opZones_ZoneBackupAmPmEdition()]: [
    [EDITOR],
    Access.OperationZones,
  ],
  [ROUTER_PATH.opZones_ZoneBackupScheduledEdition()]: [
    [EDITOR],
    Access.OperationZones,
  ],

  [ROUTER_PATH.operationDrugstores]: [[EDITOR, VIEWER], Access.OperationStores],
  [ROUTER_PATH.opDrugstores_Drugstore()]: [
    [EDITOR, VIEWER],
    Access.OperationStores,
  ],
  [ROUTER_PATH.opDrugstores_DrugstoreEdition()]: [
    [EDITOR, VIEWER],
    Access.OperationStores,
  ],
  [ROUTER_PATH.opDrugstores_DrugstoreServiceTypeEdition()]: [
    [EDITOR, VIEWER],
    Access.OperationStores,
  ],

  [ROUTER_PATH.operationCapacities]: [
    [EDITOR, VIEWER],
    Access.OperationCapacities,
  ],
  [ROUTER_PATH.opCapacitiesAmPm]: [
    [EDITOR, VIEWER],
    Access.OperationCapacities,
  ],
  [ROUTER_PATH.opCapacitiesExpress]: [
    [EDITOR, VIEWER],
    Access.OperationCapacities,
  ],
  [ROUTER_PATH.opCapacitiesScheduled]: [
    [EDITOR, VIEWER],
    Access.OperationCapacities,
  ],
  [ROUTER_PATH.opCapacitiesRet]: [[EDITOR, VIEWER], Access.OperationCapacities],
  [ROUTER_PATH.opCapacitiesReport]: [
    [EDITOR, VIEWER],
    Access.OperationCapacities,
  ],

  [ROUTER_PATH.operationSettings]: [[DEVELOPER], Access.OperationSettings],
};
export const OPERATIONS_ROUTER_PERMISSIONS = permissions(
  OPERATIONS_PARENT_PERMISSIONS,
  OPERATIONS_CHILDREN_PERMISSIONS
);
