import { IOrder } from '../interfaces/order.interface';
import { OrderRoute } from '../models/order-route.model';

export const ColumnNameList = {
  orderNumber: 'orderNumber',
  orderId: 'orderId',
  local: 'local',
  channel: 'channel',
  service: 'service',
  promiseDate: 'promiseDate',
  address: 'address',
  state: 'state',
  timeLeft: 'timeLeft',
  actions: 'actions',
};

export enum EOrderStatus {
  entregado = 'ENTREGADO',
  rechazado = 'RECHAZADO',
  enRuta = 'EN RUTA',
  asignado = 'ASIGNADO',
  cancelado = 'CANCELADO',
}

export const OrderDescription = {
  [EOrderStatus.entregado]: 'ENTREGADO',
  [EOrderStatus.rechazado]: 'RECHAZADO',
  [EOrderStatus.enRuta]: 'EN RUTA',
  [EOrderStatus.asignado]: 'ASIGNADO',
  [EOrderStatus.cancelado]: 'CANCELADO',
};
export const OrderNameFile = {
  [EOrderStatus.entregado]: 'markerDelivered',
  [EOrderStatus.rechazado]: 'markerCancel',
  [EOrderStatus.enRuta]: 'markerOnRoute',
  [EOrderStatus.asignado]: 'markerAssigned',
  [EOrderStatus.cancelado]: 'markerCancel',
};

export const OrderStatusColor = {
  [EOrderStatus.entregado]: '#38B57D',
  [EOrderStatus.rechazado]: '#D35530',
  [EOrderStatus.enRuta]: '#6C6FF2',
  [EOrderStatus.asignado]: '#7083AF',
  [EOrderStatus.cancelado]: '#D35530',
};

export const DBOrder: OrderRoute[] = [
  {
    orderNumber: '1',
    orderId: '1561589012',
    local: 'IKF-061-DOS DE MAYO',
    channel: 'Call Center',
    service: 'AM / PM',
    promiseDate: '30/09/21 10:00 p.m. - 01:00 p.m.',
    address: 'Av. Ejercito, 670 - Miraflores',
    state: 'ENTREGADO',
    timeLeft: '1',
    coordinates: { lat: -12.074690847992702, lng: -77.09414209389209 },
  } as OrderRoute,
  {
    orderNumber: '2',
    orderId: '1561589012',
    local: 'IKF-061-DOS DE MAYO',
    channel: 'Digital',
    service: 'Programado',
    promiseDate: '30/09/21 10:00 p.m. - 01:00 p.m.',
    address: 'Av. Ejercito, 670 - Miraflores',
    state: 'ENTREGADO',
    timeLeft: '1',
    coordinates: { lat: -12.058090603870156, lng: -77.04450221443963 },
  } as OrderRoute,
  {
    orderNumber: '3',
    orderId: '1561589012',
    local: 'IKF-061-DOS DE MAYO',
    channel: 'Call Center',
    service: 'AM / PM',
    promiseDate: '30/09/21 10:00 p.m. - 01:00 p.m.',
    address: 'Av. Ejercito, 670 - Miraflores',
    state: 'ENTREGADO',
    timeLeft: '1',
    coordinates: { lat: -12.070840509867775, lng: -77.0163855247041 },
  } as OrderRoute,
  {
    orderNumber: '4',
    orderId: '1561589012',
    local: 'IKF-061-DOS DE MAYO',
    channel: 'Call Center',
    service: 'AM / PM',
    promiseDate: '30/09/21 10:00 p.m. - 01:00 p.m.',
    address: 'Av. Ejercito, 670 - Miraflores',
    state: 'RECHAZADO',
    timeLeft: '1',
    coordinates: { lat: -12.076122568833423, lng: -76.9991491494781 },
  } as OrderRoute,
  {
    orderNumber: '5',
    orderId: '1561589012',
    local: 'IKF-061-DOS DE MAYO',
    channel: 'Call Center',
    service: 'Express',
    promiseDate: '30/09/21 10:00 p.m. - 01:00 p.m.',
    address: 'Av. Ejercito, 670 - Miraflores',
    state: 'EN RUTA',
    timeLeft: '3',
    coordinates: { lat: -12.066033152202444, lng: -76.9940510666648 },
  } as OrderRoute,
  {
    orderNumber: '6',
    orderId: '1561589012',
    local: 'IKF-061-DOS DE MAYO',
    channel: 'Call Center',
    service: 'Programado',
    promiseDate: '30/09/21 10:00 p.m. - 01:00 p.m.',
    address: 'Av. Ejercito, 670 - Miraflores',
    state: 'ASIGNADO',
    timeLeft: '1',
    coordinates: { lat: -12.090009732717025, lng: -76.97723953114895 },
  } as OrderRoute,
  {
    orderNumber: '7',
    orderId: '1561589012',
    local: 'IKF-061-DOS DE MAYO',
    channel: 'Call Center',
    service: 'AM / PM',
    promiseDate: '30/09/21 10:00 p.m. - 01:00 p.m.',
    address: 'Av. Ejercito, 670 - Miraflores',
    state: 'ASIGNADO',
    timeLeft: '0',
    coordinates: { lat: -12.105439068808161, lng: -76.97681469091451 },
  } as OrderRoute,
  {
    orderNumber: '8',
    orderId: '1561589012',
    local: 'IKF-061-DOS DE MAYO',
    channel: 'Call Center',
    service: 'Programado',
    promiseDate: '30/09/21 10:00 p.m. - 01:00 p.m.',
    address: 'Av. Ejercito, 670 - Miraflores',
    state: 'ASIGNADO',
    timeLeft: '0',
    coordinates: { lat: -12.110483081831664, lng: -76.98209484794612 },
  } as OrderRoute,
  {
    orderNumber: '9',
    orderId: '1561589012',
    local: 'IKF-061-DOS DE MAYO',
    channel: 'Call Center',
    service: 'AM / PM',
    promiseDate: '30/09/21 10:00 p.m. - 01:00 p.m.',
    address: 'Av. Ejercito, 670 - Miraflores',
    state: 'ASIGNADO',
    timeLeft: '-1',
    coordinates: { lat: -12.118909337710376, lng: -76.99223032211069 },
  } as OrderRoute,
  {
    orderNumber: '10',
    orderId: '1561589012',
    local: 'IKF-061-DOS DE MAYO',
    channel: 'Call Center',
    service: 'Programado',
    promiseDate: '30/09/21 10:00 p.m. - 01:00 p.m.',
    address: 'Av. Ejercito, 670 - Miraflores',
    state: 'CANCELADO',
    timeLeft: '-2',
    coordinates: { lat: -12.118137930980883, lng: -76.98816399415244 },
  } as OrderRoute,
];
