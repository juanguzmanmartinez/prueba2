export interface ICarrierStateResponse {
  stateType: string;
  description: string;
  value: string;
}

export interface ILocalResponse {
  localCode: string;
  name: string;
}

export interface ICarrierResponse {
  motorizedId: string;
  localCode: string;
  localFullName: string;
  nameMotorized: string;
  pendingRoute: string;
  supplier: string;
  entryTime: string;
  state: string;
  stateDescripcion: string;
  slow: string;
}

export interface ICoordinate {
  lat: number;
  lng: number;
}

export interface IOrderRouteResponse {
  orderNumber: string;
  orderId: string;
  local: string;
  channel: string;
  service: string;
  promiseDate: string;
  address: string;
  state: string;
  timeLeft: string;
  coordinates: ICoordinate;
}

export interface IDetailRouteResponse {
  routeId: string;
  motorized: string;
  telephone: string;
  local: string;
  completedOrderCount: number;
  totalOrderCount: number;
  motorizedState: string;
  motorizedCoordinates: ICoordinate;
  orders: IOrderRouteResponse[];
}
