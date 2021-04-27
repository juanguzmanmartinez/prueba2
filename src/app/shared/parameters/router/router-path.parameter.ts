import { BUSINESS_PATH, LOGIN_PATH, OP_CAPACITIES_PATH, OP_STORES_PATH, OP_ZONES_PATH, OPERATIONS_PATH } from '@parameters/router/routing-module-path.parameter';

export const ROUTER_PATH = {
    base: '/',
    notFound: `/${BUSINESS_PATH.notFound}`,
    notInternetConnection: `/${BUSINESS_PATH.notInternetConnection}`,

    operations: `/${BUSINESS_PATH.operations}`,
    operationSettings: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.settings}`,

    operationStores: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.stores}`,
    opStores_StoreId: (storeId: string) => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.stores}/${storeId}`,
    opStores_StoreEdition: (storeId: string) => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.stores}/${storeId}/${OP_STORES_PATH.storeEdition}`,
    opStores_StoreAmPmEdition: (storeId: string) => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.stores}/${storeId}/${OP_STORES_PATH.storeAmPm}`,
    opStores_StoreScheduledEdition: (storeId: string) => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.stores}/${storeId}/${OP_STORES_PATH.storeScheduled}`,
    opStores_StoreExpressEdition: (storeId: string) => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.stores}/${storeId}/${OP_STORES_PATH.storeExpress}`,
    opStores_StoreRetEdition: (storeId: string) => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.stores}/${storeId}/${OP_STORES_PATH.storeRet}`,

    operationZones: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}`,
    opZones_Zone: (zoneCode = '?') => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}/${zoneCode}`,
    opZones_ZoneEdition: (zoneCode = '?') => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}/${zoneCode}/${OP_ZONES_PATH.zoneEdition}`,
    opZones_ZoneBackupEdition: (zoneCode = '?') => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}/${zoneCode}/${OP_ZONES_PATH.zoneBackupEdition}`,
    opZones_ZoneBackupAmPmEdition: (zoneCode = '?') => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}/${zoneCode}/${OP_ZONES_PATH.zoneBackupAmPmEdition}`,
    opZones_ZoneBackupScheduledEdition: (zoneCode = '?') => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}/${zoneCode}/${OP_ZONES_PATH.zoneBackupScheduledEdition}`,
    opZones_ZoneServiceTypeEdition: (serviceType = '?', zoneCode = '?', zoneChannel = '?') => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}/${zoneCode}/${serviceType}/${zoneChannel}`,

    operationCapacities: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.capacities}`,
    opCapacitiesAmPm: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.capacities}/${OP_CAPACITIES_PATH.capacityAmPm}`,
    opCapacitiesScheduled: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.capacities}/${OP_CAPACITIES_PATH.capacityScheduled}`,
    opCapacitiesExpress: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.capacities}/${OP_CAPACITIES_PATH.capacityExpress}`,
    opCapacitiesRet: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.capacities}/${OP_CAPACITIES_PATH.capacityRet}`,
    opCapacitiesReport: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.capacities}/${OP_CAPACITIES_PATH.report}`,


    login: `/${BUSINESS_PATH.account}/${LOGIN_PATH.login}`,
    recoverPassword: `/${BUSINESS_PATH.account}/${LOGIN_PATH.recoverPassword}`,
    recoverPasswordReset: `/${BUSINESS_PATH.account}/${LOGIN_PATH.recoverPassword}/${LOGIN_PATH.recoverPasswordReset}`,
    recoverPasswordUser: `/${BUSINESS_PATH.account}/${LOGIN_PATH.recoverPassword}/${LOGIN_PATH.recoverPasswordUser}`,
    recoverPasswordCode: `/${BUSINESS_PATH.account}/${LOGIN_PATH.recoverPassword}/${LOGIN_PATH.recoverPasswordCode}`,


    admin: `/${BUSINESS_PATH.admin}`,
};
