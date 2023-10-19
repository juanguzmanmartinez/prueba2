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
  typeRoute: string;
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
  pendingFinalized: boolean;
}

export interface ICarrierListRequest {
  locals: string;
  states: string;
  page: number;
  orderBy: string;
  orderType: string;
}

export interface IPagination {
  totalElements: number;
  page: number;
  pageSize?: number;
  pageElements?: number;
}

export interface ICarrierListResponse {
  motorizeds: ICarrierResponse[];
  pagination: IPagination;
}
