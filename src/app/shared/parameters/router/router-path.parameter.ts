import { ROUTING } from '@parameters/router/routing.parameter';
import { OP_CAPACITIES_PATH, OP_CHILDREN_PATH, OP_STORES_PATH, OP_ZONES_PATH } from '@parameters/router/routing/operations-routing.parameter';
import { AC_CHILDREN_PATH } from '@parameters/router/routing/account-routing.parameter';
import { AD_CHILDREN_PATH } from '@parameters/router/routing/administrator-routing.parameter';

export const ROUTER_PATH = {
    base: '/',
    notFound: `/${ROUTING.notFound}`,
    notInternetConnection: `/${ROUTING.notInternetConnection}`,

    administrator: `/${ROUTING.administrator}`,
    administratorUsers: `/${ROUTING.administrator}/${AD_CHILDREN_PATH.users}`,

    login: `/${ROUTING.account}/${AC_CHILDREN_PATH.login}`,
    recoverPassword: `/${ROUTING.account}/${AC_CHILDREN_PATH.recoverPassword}`,
    recoverPasswordReset: `/${ROUTING.account}/${AC_CHILDREN_PATH.recoverPassword}/${AC_CHILDREN_PATH.recoverPasswordReset}`,
    recoverPasswordUser: `/${ROUTING.account}/${AC_CHILDREN_PATH.recoverPassword}/${AC_CHILDREN_PATH.recoverPasswordUser}`,
    recoverPasswordCode: `/${ROUTING.account}/${AC_CHILDREN_PATH.recoverPassword}/${AC_CHILDREN_PATH.recoverPasswordCode}`,


    operations: `/${ROUTING.operations}`,
    operationSettings: `/${ROUTING.operations}/${OP_CHILDREN_PATH.settings}`,

    operationStores: `/${ROUTING.operations}/${OP_CHILDREN_PATH.stores}`,
    opStores_Store: (storeCode = '?') => `/${ROUTING.operations}/${OP_CHILDREN_PATH.stores}/${storeCode}`,
    opStores_StoreEdition: (storeCode = '?') => `/${ROUTING.operations}/${OP_CHILDREN_PATH.stores}/${storeCode}/${OP_STORES_PATH.storeEdition}`,
    opStores_StoreServiceTypeEdition: (storeCode = '?', serviceType = '?') => `/${ROUTING.operations}/${OP_CHILDREN_PATH.stores}/${storeCode}/${serviceType}`,

    operationZones: `/${ROUTING.operations}/${OP_CHILDREN_PATH.zones}`,
    opZones_Zone: (zoneCode = '?') => `/${ROUTING.operations}/${OP_CHILDREN_PATH.zones}/${zoneCode}`,
    opZones_ZoneEdition: (zoneCode = '?') => `/${ROUTING.operations}/${OP_CHILDREN_PATH.zones}/${zoneCode}/${OP_ZONES_PATH.zoneEdition}`,
    opZones_ZoneBackupEdition: (zoneCode = '?') => `/${ROUTING.operations}/${OP_CHILDREN_PATH.zones}/${zoneCode}/${OP_ZONES_PATH.zoneBackupEdition}`,
    opZones_ZoneBackupAmPmEdition: (zoneCode = '?') => `/${ROUTING.operations}/${OP_CHILDREN_PATH.zones}/${zoneCode}/${OP_ZONES_PATH.zoneBackupAmPmEdition}`,
    opZones_ZoneBackupScheduledEdition: (zoneCode = '?') => `/${ROUTING.operations}/${OP_CHILDREN_PATH.zones}/${zoneCode}/${OP_ZONES_PATH.zoneBackupScheduledEdition}`,
    opZones_ZoneServiceTypeEdition: (serviceType = '?', zoneCode = '?', zoneChannel = '?') => `/${ROUTING.operations}/${OP_CHILDREN_PATH.zones}/${zoneCode}/${serviceType}/${zoneChannel}`,

    operationCapacities: `/${ROUTING.operations}/${OP_CHILDREN_PATH.capacities}`,
    opCapacitiesAmPm: `/${ROUTING.operations}/${OP_CHILDREN_PATH.capacities}/${OP_CAPACITIES_PATH.capacityAmPm}`,
    opCapacitiesScheduled: `/${ROUTING.operations}/${OP_CHILDREN_PATH.capacities}/${OP_CAPACITIES_PATH.capacityScheduled}`,
    opCapacitiesExpress: `/${ROUTING.operations}/${OP_CHILDREN_PATH.capacities}/${OP_CAPACITIES_PATH.capacityExpress}`,
    opCapacitiesRet: `/${ROUTING.operations}/${OP_CHILDREN_PATH.capacities}/${OP_CAPACITIES_PATH.capacityRet}`,
    opCapacitiesReport: `/${ROUTING.operations}/${OP_CHILDREN_PATH.capacities}/${OP_CAPACITIES_PATH.capacityReport}`,

};
