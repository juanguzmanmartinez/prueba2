import { EDeliveryServiceType } from '@models/capacities/capacities-service-type.model';

export interface IZone {
    code: string;
    name: string;
    serviceType: Array<EDeliveryServiceType>;
    assignedStore: string;
    state: string;
}

export const ZONES_LIST: IZone[] = [
    {code: 'IKB-B03', name: 'San Miguel 1', assignedStore: 'DC Surquillo', serviceType: [EDeliveryServiceType.amPm, EDeliveryServiceType.scheduled, EDeliveryServiceType.express], state: 'activo'},
    {code: 'IKB-B03', name: 'San Miguel 1', assignedStore: 'DC Surquillo', serviceType: [EDeliveryServiceType.express], state: 'activo'},
    {code: 'IKB-B03', name: 'San Miguel 1', assignedStore: 'DC Surquillo', serviceType: [EDeliveryServiceType.amPm], state: 'cerrado'},
    {code: 'IKB-B03', name: 'San Borja Sur', assignedStore: 'DC Surquillo', serviceType: [EDeliveryServiceType.scheduled], state: 'activo'},
    {code: 'IKB-B03', name: 'San Miguel 1', assignedStore: 'Flora Tristán', serviceType: [EDeliveryServiceType.express, EDeliveryServiceType.amPm], state: 'cerrado'},
    {code: 'IKB-B03', name: 'San Miguel 1', assignedStore: 'DC Surquillo', serviceType: [EDeliveryServiceType.amPm, EDeliveryServiceType.scheduled], state: 'activo'},
    {code: 'IKB-B03', name: 'Miraflores 3', assignedStore: 'Angamos 5   ', serviceType: [EDeliveryServiceType.express, EDeliveryServiceType.scheduled], state: 'activo'},
];
