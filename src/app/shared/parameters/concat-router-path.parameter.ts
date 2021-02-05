import { BUSINESS_PATH, LOGIN_PATH, OPERATIONS_CAPACITIES_PATH, OPERATIONS_PATH } from '@parameters/router-path.parameter';

export const CONCAT_PATH = {
    base: '/',
    operations: `/${BUSINESS_PATH.operations}`,
    operationCapacities: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.capacities}`,
    operationZones: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.zones}`,
    operationStores: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.stores}`,
    operationSettings: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.settings}`,
    operationCapacitiesAmPm: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.capacities}/${OPERATIONS_CAPACITIES_PATH.amPm}`,
    operationCapacitiesScheduled: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.capacities}/${OPERATIONS_CAPACITIES_PATH.scheduled}`,
    operationCapacitiesExpress: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.capacities}/${OPERATIONS_CAPACITIES_PATH.express}`,
    operationCapacitiesRet: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.capacities}/${OPERATIONS_CAPACITIES_PATH.ret}`,
    operationCapacitiesReport: `/${BUSINESS_PATH.operations}/${OPERATIONS_PATH.capacities}/${OPERATIONS_CAPACITIES_PATH.report}`,

    login: `/${BUSINESS_PATH.login}/${LOGIN_PATH.login}`,
    recoverPassword: `/${BUSINESS_PATH.login}/${LOGIN_PATH.recoverPassword}`,
    recoverPasswordReset: `/${BUSINESS_PATH.login}/${LOGIN_PATH.recoverPassword}/${LOGIN_PATH.recoverPasswordReset}`,
    recoverPasswordUser: `/${BUSINESS_PATH.login}/${LOGIN_PATH.recoverPassword}/${LOGIN_PATH.recoverPasswordUser}`,
    recoverPasswordCode: `/${BUSINESS_PATH.login}/${LOGIN_PATH.recoverPassword}/${LOGIN_PATH.recoverPasswordCode}`,

    admin: `/${BUSINESS_PATH.admin}`,
};
