import { permissions } from '@helpers/auth.helper';
import { TBasePermissions } from '@models/auth/permissions.model';
import { Access } from '@parameters/auth/access.parameter';
import { Role } from '@parameters/auth/role.parameter';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

const EDITOR = Role.Editor;
const VIEWER = Role.Viewer;

export const CAPACITIES_PARENT_PERMISSIONS: TBasePermissions = {
  [ROUTER_PATH.capacities]: [[EDITOR, VIEWER], Access.Capacities],
};

const CAPACITIES_CHILDREN_PERMISSIONS: TBasePermissions = {
  [ROUTER_PATH.capacitiesServiceType]: [
    [EDITOR, VIEWER],
    Access.CapacitiesServiceType,
  ],
  [ROUTER_PATH.capacitiesConfigurationBase]: [
    [EDITOR, VIEWER],
    Access.CapacitiesServiceType,
  ],
  [ROUTER_PATH.capacitiesConfigurationIntervalTime]: [
    [EDITOR, VIEWER],
    Access.CapacitiesServiceType,
  ],
  [ROUTER_PATH.capacitiesConfigurationWindowsTime]: [
    [EDITOR, VIEWER],
    Access.CapacitiesServiceType,
  ],
  [ROUTER_PATH.capacitiesAmPm]: [
    [EDITOR, VIEWER],
    Access.CapacitiesServiceType,
  ],
  [ROUTER_PATH.capacitiesScheduled]: [
    [EDITOR, VIEWER],
    Access.CapacitiesServiceType,
  ],
  [ROUTER_PATH.capacitiesExpress]: [
    [EDITOR, VIEWER],
    Access.CapacitiesServiceType,
  ],
  [ROUTER_PATH.capacitiesRet]: [[EDITOR, VIEWER], Access.CapacitiesServiceType],
  [ROUTER_PATH.capacityUpload]: [[EDITOR, VIEWER], Access.CapacitiesServiceType],
  [ROUTER_PATH.capacityReport]: [
    [EDITOR, VIEWER],
    Access.CapacitiesServiceType,
  ],
};

export const CAPACITIES_ROUTER_PERMISSIONS = permissions(
  CAPACITIES_PARENT_PERMISSIONS,
  CAPACITIES_CHILDREN_PERMISSIONS
);
