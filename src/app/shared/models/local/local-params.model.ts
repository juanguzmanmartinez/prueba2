import { EDeliveryServiceType } from '../capacities/capacities-service-type.model';

export interface ILocalParams {
    detailType: string;
    fulfillmentCenter: string;
    serviceType: EDeliveryServiceType;
}
