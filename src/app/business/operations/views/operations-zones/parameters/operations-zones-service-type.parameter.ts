import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';

export const CZoneServiceTypeSegmentGap = {
    [EDeliveryServiceType.amPm]: '30',
    [EDeliveryServiceType.scheduled]: '30',
    [EDeliveryServiceType.express]: '5',
    [EDeliveryServiceType.ret]: '0'
};
