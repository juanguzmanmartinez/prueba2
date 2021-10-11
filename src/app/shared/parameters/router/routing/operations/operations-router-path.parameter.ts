import { OP_CAPACITIES_PATH, OP_CHILDREN_PATH, OP_DRUGSTORES_PATH, OP_ZONES_PATH, OPERATIONS_ROUTER } from '@parameters/router/routing/operations/operations-router.parameter';

export const OPERATIONS_ROUTER_PATH = {
    operations: `/${OPERATIONS_ROUTER.path}`,
    operationSettings: `/${OPERATIONS_ROUTER.path}/${OP_CHILDREN_PATH.settings}`,

    operationDrugstores:
        `/${OPERATIONS_ROUTER.path}/${OP_CHILDREN_PATH.drugstores}`,
    opDrugstores_Drugstore: (drugstoreCode = 'drugstoreCode') =>
        `/${OPERATIONS_ROUTER.path}/${OP_CHILDREN_PATH.drugstores}/${drugstoreCode}`,
    opDrugstores_DrugstoreEdition: (drugstoreCode = 'drugstoreCode') =>
        `/${OPERATIONS_ROUTER.path}/${OP_CHILDREN_PATH.drugstores}/${drugstoreCode}/${OP_DRUGSTORES_PATH.drugstoreEdition}`,
    opDrugstores_DrugstoreServiceTypeEdition: (drugstoreCode = 'drugstoreCode', serviceType = 'serviceType') =>
        `/${OPERATIONS_ROUTER.path}/${OP_CHILDREN_PATH.drugstores}/${drugstoreCode}/${serviceType}`,

    operationZones:
        `/${OPERATIONS_ROUTER.path}/${OP_CHILDREN_PATH.zones}`,
    opZones_Zone: (zoneId = 'zoneId') =>
        `/${OPERATIONS_ROUTER.path}/${OP_CHILDREN_PATH.zones}/${zoneId}`,
    opZones_ZoneEdition: (zoneId = 'zoneId') =>
        `/${OPERATIONS_ROUTER.path}/${OP_CHILDREN_PATH.zones}/${zoneId}/${OP_ZONES_PATH.zoneEdition}`,
    opZones_ZoneBackupEdition: (zoneId = 'zoneId') =>
        `/${OPERATIONS_ROUTER.path}/${OP_CHILDREN_PATH.zones}/${zoneId}/${OP_ZONES_PATH.zoneBackupEdition}`,
    opZones_ZoneBackupAmPmEdition: (zoneId = 'zoneId') =>
        `/${OPERATIONS_ROUTER.path}/${OP_CHILDREN_PATH.zones}/${zoneId}/${OP_ZONES_PATH.zoneBackupAmPmEdition}`,
    opZones_ZoneBackupScheduledEdition: (zoneId = 'zoneId') =>
        `/${OPERATIONS_ROUTER.path}/${OP_CHILDREN_PATH.zones}/${zoneId}/${OP_ZONES_PATH.zoneBackupScheduledEdition}`,
    opZones_ZoneServiceTypeEdition: (serviceType = 'serviceType', zoneId = 'zoneId', zoneChannel = 'zoneChannel') =>
        `/${OPERATIONS_ROUTER.path}/${OP_CHILDREN_PATH.zones}/${zoneId}/${serviceType}/${zoneChannel}`,

    operationCapacities: `/${OPERATIONS_ROUTER.path}/${OP_CHILDREN_PATH.capacities}`,
    opCapacitiesAmPm: `/${OPERATIONS_ROUTER.path}/${OP_CHILDREN_PATH.capacities}/${OP_CAPACITIES_PATH.capacityAmPm}`,
    opCapacitiesScheduled: `/${OPERATIONS_ROUTER.path}/${OP_CHILDREN_PATH.capacities}/${OP_CAPACITIES_PATH.capacityScheduled}`,
    opCapacitiesExpress: `/${OPERATIONS_ROUTER.path}/${OP_CHILDREN_PATH.capacities}/${OP_CAPACITIES_PATH.capacityExpress}`,
    opCapacitiesRet: `/${OPERATIONS_ROUTER.path}/${OP_CHILDREN_PATH.capacities}/${OP_CAPACITIES_PATH.capacityRet}`,
    opCapacitiesReport: `/${OPERATIONS_ROUTER.path}/${OP_CHILDREN_PATH.capacities}/${OP_CAPACITIES_PATH.report}`,
};
