import { BUSINESS_PATH, LOGIN_PATH, OP_CAPACITIES_PATH, OP_STORES_PATH, OP_ZONES_PATH, OPERATIONS_PATH } from '@parameters/router/router-path.parameter';

export const CONCAT_PATH = {
    base: '/',
    notFound: `/${BUSINESS_PATH.notFound}`,


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
    opZones_ZoneId: (zoneId: string) => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}/${zoneId}`,
    opZones_ZoneEdition: (zoneId: string) => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}/${zoneId}/${OP_ZONES_PATH.zoneEdition}`,
    opZones_ZoneAmPmEdition: (zoneId: string) => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}/${zoneId}/${OP_ZONES_PATH.zoneAmPm}`,
    opZones_ZoneScheduledEdition: (zoneId: string) => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}/${zoneId}/${OP_ZONES_PATH.zoneScheduled}`,
    opZones_ZoneExpressEdition: (zoneId: string) => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}/${zoneId}/${OP_ZONES_PATH.zoneExpress}`,
    opZones_ZoneRetEdition: (zoneId: string) => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}/${zoneId}/${OP_ZONES_PATH.zoneRet}`,

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
