import { ADMINISTRATOR_PERMISSIONS } from '@parameters/auth/permissions/administrator-permissions.parameter';
import { OPERATIONS_PERMISSIONS } from '@parameters/auth/permissions/operations-permissions.parameter';

export const PERMISSIONS = {
    ...ADMINISTRATOR_PERMISSIONS,
    ...OPERATIONS_PERMISSIONS,
};
