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
  [ECapacitiesServiceType.amPm]: 'am-pm',
  [ECapacitiesServiceType.scheduled]: 'programado',
  [ECapacitiesServiceType.express]: 'express',
  [ECapacitiesServiceType.ret]: 'retiro-tienda'
};
