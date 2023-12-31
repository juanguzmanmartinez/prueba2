import { Coordinates } from '../../control-fleet/views/carrier-route/interfaces/order.interface';

export interface IOrder {
  idOrder: string;
  local: string;
  address: string;
  channel: string;
  service: string;
  promiseDate: string;
  detail: string;
  coordinates: Coordinates;
  numberOrder?: number;
}

export interface IOrderStoreState {
  errorOrders: IOrder[];
  pendingOrders: IOrder[];
  selectedErrorOrders: IOrder[];
  selectedPendingOrders: IOrder[];
  routeOrders: IOrder[];
}
