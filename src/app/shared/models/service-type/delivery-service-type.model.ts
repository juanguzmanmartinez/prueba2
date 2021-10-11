import { DELIVERY_SERVICE_TYPE_PATH } from '@parameters/router/routing/shared/shared-router.parameter';

export enum EDeliveryServiceType {
    amPm = 'AM_PM',
    scheduled = 'PROG',
    express = 'EXP',
    ret = 'RET'
}

export const CDeliveryServiceTypeName = {
    [EDeliveryServiceType.amPm]: 'AM/PM',
    [EDeliveryServiceType.scheduled]: 'Programado',
    [EDeliveryServiceType.express]: 'Express',
    [EDeliveryServiceType.ret]: 'RET'
};

export const CDeliveryServiceTypeRoute = {
    [EDeliveryServiceType.amPm]: DELIVERY_SERVICE_TYPE_PATH.deliveryAmPm,
    [EDeliveryServiceType.scheduled]: DELIVERY_SERVICE_TYPE_PATH.deliveryScheduled,
    [EDeliveryServiceType.express]: DELIVERY_SERVICE_TYPE_PATH.deliveryExpress,
    [EDeliveryServiceType.ret]: DELIVERY_SERVICE_TYPE_PATH.deliveryRet
};


export enum EDeliveryType {
    deliveryCenter = 'DELIVERY_CENTER',
    drugstore = 'DRUGSTORE'
}

export const CDeliveryTypeName = {
    [EDeliveryType.deliveryCenter]: 'Inkatracker',
    [EDeliveryType.drugstore]: 'Lite'
};


export const CDeliveryTypeId = {
    [EDeliveryType.deliveryCenter]: 3,
    [EDeliveryType.drugstore]: 4
};
