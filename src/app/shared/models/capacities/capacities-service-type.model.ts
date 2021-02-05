import { OPERATIONS_CAPACITIES_PATH } from '@parameters/router-path.parameter';

export enum ECapacitiesServiceType {
    amPm = 'AM_PM',
    scheduled = 'PROG',
    express = 'EXP',
    ret = 'RET'
}

export const CCapacitiesServiceTypeName = {
    [ECapacitiesServiceType.amPm]: 'AM/PM',
    [ECapacitiesServiceType.scheduled]: 'Programado',
    [ECapacitiesServiceType.express]: 'Express',
    [ECapacitiesServiceType.ret]: 'RET'
};

export const CCapacitiesServiceTypeRoute = {
    [ECapacitiesServiceType.amPm]: OPERATIONS_CAPACITIES_PATH.amPm,
    [ECapacitiesServiceType.scheduled]: OPERATIONS_CAPACITIES_PATH.scheduled,
    [ECapacitiesServiceType.express]: OPERATIONS_CAPACITIES_PATH.express,
    [ECapacitiesServiceType.ret]: OPERATIONS_CAPACITIES_PATH.ret
};
