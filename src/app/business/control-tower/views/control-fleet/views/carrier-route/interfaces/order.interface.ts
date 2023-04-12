export interface Coordinates {
  lat: number;
  lng: number;
}

export interface IOrder {
  orderNumber: string;
  orderId: string;
  local: string;
  channel: string;
  service: string;
  promiseDate: string;
  address: string;
  status: string;
  timeLeft: string;
  coordinates: Coordinates;
}
