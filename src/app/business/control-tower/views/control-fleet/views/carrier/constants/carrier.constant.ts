
export const ColumnNameList = {
  orderNumber: 'orderNumber',
  orderId: 'orderId',
  local: 'local',
  channel: 'channel',
  service: 'service',
  promiseDate: 'promiseDate',
  address: 'address',
  status: 'status',
  timeLeft: 'timeLeft',
  actions: 'actions',
};

export const displayedColumns: string[] = [
  'local',
  'carrier',
  'provider',
  'startHour',
  'state',
  'paused',
  'actions',
];

export enum ECarrierStatus {
  disponible = 'DISPONIBLE',
  enRuta = 'EN RUTA',
  noDisponible = 'NO DISPONIBLE',
}

export const OrderDescription = {
  [ECarrierStatus.disponible]: 'DISPONIBLE',
  [ECarrierStatus.enRuta]: 'EN RUTA',
  [ECarrierStatus.noDisponible]: 'NO DISPONIBLE',
};


export const OrderStatusColor = {
  [ECarrierStatus.disponible]: '#38B57D',
  [ECarrierStatus.enRuta]: '#6C6FF2',
  [ECarrierStatus.noDisponible]: '#7083AF',
};
