import { DELIVERY_SERVICE_TYPE_PATH } from '@parameters/router/paths/shared-path.parameter';

export const OPERATIONS_PATH = {
    stores: 'locales',
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

export const OP_STORES_PATH = {
    storeCode: 'storeId',
    storeEdition: 'editar-local',
    storeServiceTypeEdition: 'storeServiceType',
};

export const OP_ZONES_PATH = {
    zoneCode: 'zoneCode',
    zoneEdition: 'editar-zona',
    zoneBackupEdition: 'editar-zona-backup',
    zoneServiceTypeEdition: 'zoneServiceType',
    zoneServiceTypeChannelEdition: 'zoneChannel',
    zoneBackupAmPmEdition: `backup-${DELIVERY_SERVICE_TYPE_PATH.deliveryAmPm}`,
    zoneBackupScheduledEdition: `backup-${DELIVERY_SERVICE_TYPE_PATH.deliveryScheduled}`,
};
