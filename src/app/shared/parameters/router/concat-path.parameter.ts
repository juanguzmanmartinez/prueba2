import { BUSINESS_PATH, LOGIN_PATH, OP_CAPACITIES_PATH, OP_STORES_PATH, OPERATIONS_PATH } from '@parameters/router/router-path.parameter';

export const CONCAT_PATH = {
    base: '/',
    notFound: `/${BUSINESS_PATH.notFound}`,


    operations: `/${BUSINESS_PATH.operations}`,
    operationZones: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}`,
    operationSettings: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.settings}`,

    operationStores: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.stores}`,
    opStoresStoreId: (storeId: string) => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.stores}/${storeId}`,
    opStoresStoreEdition: (storeId: string) => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.stores}/${storeId}/${OP_STORES_PATH.storeEdition}`,
    opStoresStoreAmPmEdition: (storeId: string) => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.stores}/${storeId}/${OP_STORES_PATH.storeAmPm}`,
    opStoresStoreScheduledEdition: (storeId: string) => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.stores}/${storeId}/${OP_STORES_PATH.storeScheduled}`,
    opStoresStoreExpressEdition: (storeId: string) => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.stores}/${storeId}/${OP_STORES_PATH.storeExpress}`,
    opStoresStoreRetEdition: (storeId: string) => `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.stores}/${storeId}/${OP_STORES_PATH.storeRet}`,

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
