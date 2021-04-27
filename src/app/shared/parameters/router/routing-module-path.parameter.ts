export const BUSINESS_PATH = {
    wildcard: '**',
    account: 'cuenta',
    admin: 'administrador',
    operations: 'operaciones',
    notFound: 'no-encontrado',
    notInternetConnection: 'sin-internet',
};

export const DELIVERY_SERVICE_TYPE_PATH = {
    deliveryAmPm: 'am-pm',
    deliveryScheduled: 'programado',
    deliveryExpress: 'express',
    deliveryRet: 'retiro-tienda',
};

export const CHANNEL_PATH = {
    channelDigital: 'digital',
    channelCall: 'call-center',
    channelOmnichannel: 'omnicanal'
};


export const LOGIN_PATH = {
    login: 'iniciar-sesion',
    recoverPassword: 'recuperar-contrasena',
    recoverPasswordReset: 'contrasena',
    recoverPasswordUser: 'usuario',
    recoverPasswordCode: 'codigo',
};

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
    report: 'reportes'
};

export const OP_STORES_PATH = {
    storeId: 'storeId',
    storeEdition: 'editar-local',
    storeAmPm: DELIVERY_SERVICE_TYPE_PATH.deliveryAmPm,
    storeScheduled: DELIVERY_SERVICE_TYPE_PATH.deliveryScheduled,
    storeExpress: DELIVERY_SERVICE_TYPE_PATH.deliveryExpress,
    storeRet: DELIVERY_SERVICE_TYPE_PATH.deliveryRet,
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
