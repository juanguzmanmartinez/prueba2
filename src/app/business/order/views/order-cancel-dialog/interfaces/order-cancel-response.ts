export interface OrderStatus {
  code: string;
  name: string;
  detail: string;
  cancellationCode: string;
  statusDate: string;
  successful: boolean;
}

export interface OrderDetail {
  serviceType: string;
}

export interface CancelOrderResponse {
  ecommerceId: number;
  orderStatus: OrderStatus;
  orderDetail: OrderDetail;
  externalRouting: boolean;
}
