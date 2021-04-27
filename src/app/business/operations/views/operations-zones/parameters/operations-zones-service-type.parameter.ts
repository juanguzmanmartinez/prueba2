import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { EChannel } from '@models/channel/channel.model';

export type ZoneServiceTypeBasicRequest = {
    code: EDeliveryServiceType,
    channel: EChannel
};

export const CZoneServiceTypeSegmentGap = {
    [EDeliveryServiceType.amPm]: '30',
    [EDeliveryServiceType.scheduled]: '30',
    [EDeliveryServiceType.express]: '5',
    [EDeliveryServiceType.ret]: '0'
};
