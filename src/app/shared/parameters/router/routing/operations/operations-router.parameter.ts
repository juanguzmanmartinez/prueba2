import { DELIVERY_SERVICE_TYPE_PATH } from '@parameters/router/routing/shared/shared-router.parameter';
import { TRouter } from '@models/auth/router.model';

export const OPERATIONS_ROUTER: TRouter = {
    path: 'operaciones',
    name: 'Operaciones',
    description: 'Visualiza todos los locales y edita algunas de sus características.',
    iconCard: 'configuration',
    iconMenu: 'settings',
};

export const OP_CHILDREN_PATH = {
    drugstores: 'locales',
    zones: 'zonas',
    capacities: 'capacidades',
    settings: 'configuraciones'
};

export const OP_CAPACITIES_PATH = {
    capacityAmPm: DELIVERY_SERVICE_TYPE_PATH.deliveryAmPm,
    capacityScheduled: DELIVERY_SERVICE_TYPE_PATH.deliveryScheduled,
    capacityExpress: DELIVERY_SERVICE_TYPE_PATH.deliveryExpress,
    capacityRet: DELIVERY_SERVICE_TYPE_PATH.deliveryRet,
    capacityReport: 'reportes'
};

export const OP_DRUGSTORES_PATH = {
    drugstoreCode: 'storeId',
    drugstoreEdition: 'editar-local',
    drugstoreServiceTypeEdition: 'storeServiceType',
};

export const OP_ZONES_PATH = {
    zoneCode: 'zoneCode',
    zoneEdition: 'editar-zona',
    zoneBackupEdition: 'editar-zona-backup',
    zoneServiceTypeEdition: 'zoneServiceType',
    zoneServiceTypeChannelEdition: 'zoneChannel',
    zoneServiceTypeCompanyEdition: 'zoneCompany',
    zoneBackupAmPmEdition: `backup-${DELIVERY_SERVICE_TYPE_PATH.deliveryAmPm}`,
    zoneBackupScheduledEdition: `backup-${DELIVERY_SERVICE_TYPE_PATH.deliveryScheduled}`,
};
