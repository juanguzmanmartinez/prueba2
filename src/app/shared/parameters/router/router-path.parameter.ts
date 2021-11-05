import { BUSINESS_PATH, LOGIN_PATH } from '@parameters/router/routing-module-path.parameter';
import { OP_CAPACITIES_PATH, OP_STORES_PATH, OP_ZONES_PATH, OPERATIONS_PATH } from '@parameters/router/paths/operations-path.parameter';

export const ROUTER_PATH = {
    base: '/',
    notFound: `/${BUSINESS_PATH.notFound}`,
    notInternetConnection: `/${BUSINESS_PATH.notInternetConnection}`,

    operations: `/${BUSINESS_PATH.operations}`,
    operationSettings: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.settings}`,

    operationStores: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.stores}`,
    opStores_Store: (storeCode = '?') => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.stores}/${storeCode}`,
    opStores_StoreEdition: (storeCode = '?') => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.stores}/${storeCode}/${OP_STORES_PATH.storeEdition}`,
    opStores_StoreServiceTypeEdition: (storeCode = '?', serviceType = '?') => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.stores}/${storeCode}/${serviceType}`,

    operationZones: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}`,
    opZones_Zone: (zoneCode = '?') => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}/${zoneCode}`,
    opZones_ZoneEdition: (zoneCode = '?') => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}/${zoneCode}/${OP_ZONES_PATH.zoneEdition}`,
    opZones_ZoneBackupEdition: (zoneCode = '?') => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}/${zoneCode}/${OP_ZONES_PATH.zoneBackupEdition}`,
    opZones_ZoneBackupAmPmEdition: (zoneCode = '?') => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}/${zoneCode}/${OP_ZONES_PATH.zoneBackupAmPmEdition}`,
    opZones_ZoneBackupScheduledEdition: (zoneCode = '?') => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}/${zoneCode}/${OP_ZONES_PATH.zoneBackupScheduledEdition}`,
    opZones_ZoneServiceTypeEdition: (serviceType = '?', zoneCode = '?', zoneChannel = '?',zoneCompany = '?') => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}/${zoneCode}/${serviceType}/${zoneChannel}/${zoneCompany}`,

    operationCapacities: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.capacities}`,
    opCapacitiesAmPm: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.capacities}/${OP_CAPACITIES_PATH.capacityAmPm}`,
    opCapacitiesScheduled: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.capacities}/${OP_CAPACITIES_PATH.capacityScheduled}`,
    opCapacitiesExpress: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.capacities}/${OP_CAPACITIES_PATH.capacityExpress}`,
    opCapacitiesRet: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.capacities}/${OP_CAPACITIES_PATH.capacityRet}`,
    opCapacitiesReport: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.capacities}/${OP_CAPACITIES_PATH.capacityReport}`,


    login: `/${BUSINESS_PATH.account}/${LOGIN_PATH.login}`,
    recoverPassword: `/${BUSINESS_PATH.account}/${LOGIN_PATH.recoverPassword}`,
    recoverPasswordReset: `/${BUSINESS_PATH.account}/${LOGIN_PATH.recoverPassword}/${LOGIN_PATH.recoverPasswordReset}`,
    recoverPasswordUser: `/${BUSINESS_PATH.account}/${LOGIN_PATH.recoverPassword}/${LOGIN_PATH.recoverPasswordUser}`,
    recoverPasswordCode: `/${BUSINESS_PATH.account}/${LOGIN_PATH.recoverPassword}/${LOGIN_PATH.recoverPasswordCode}`,


    admin: `/${BUSINESS_PATH.admin}`,
};
