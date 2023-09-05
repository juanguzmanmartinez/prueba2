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
  pendingRoute: boolean;
  supplier: string;
  entryTime: string;
  state: string;
  stateDescription: string;
  slow: string;
  counterRouter: number;
}

export interface ICoordinate {
  lat: number;
  lng: number;
}

export interface IOrderRouteResponse {
  orderNumber: number;
  orderId: number;
  local: string;
  channel: string;
  service: string;
  promiseDate: string;
  address: string;
  state: string;
  timeLeft: string;
  lat?: number;
  lng?: number;
}

export interface IPointRouteResponse {
  typePoint: string;
  lat: number;
  lng: number;
  code: string;
}

export interface IDetailRouteResponse {
  routeId: string;
  motorized: string;
  telephone: string;
  local: string;
  completedOrderCount: number;
  totalOrderCount: number;
  routeState: string;
  lat: number;
  lng: number;
  orders: IOrderRouteResponse[];
  points: IPointRouteResponse[];
}
