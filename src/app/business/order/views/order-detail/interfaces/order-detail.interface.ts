export interface ClientInformation {
  addressClient: string;
  clientName: string;
  companyName: string;
  documentNumber: number;
  phone: string;
  email: string;
  coordinates: string;
  reference: string;
  ruc: string;
}

export interface OrderTimeline {
  code: string;
  selected: boolean;
  order: string;
  updatedBy: string;
  time: string;
  status: string;
}

export interface OrderStatusDetail {
  localCode: string;
  endScheduleDate: string;
  statusTimeLine: OrderTimeline[];
}

export interface OrderMainData {
  orderId: number;
  ecommerceId: number;
  ecommerceIdCall: number;
  companyCode: string;
  serviceChannel: string;
  orderType: string;
  serviceTypeShortCode: string;
  scheduledTime: string;
  statusName: string;
  localCode: string;
  serviceType: string;
  source: string;
}

export interface OrderInformation {
  ecommerceId: number;
  purchaseId: string;
  operator: string;
  observation: string;
  cancellationReason: string;
  zoneDescription: string;
  localDescription: string;
  serviceType: string;
  stockType: string;
}

export interface PaymentInformation {
  paymentType: string;
  paymentGateway: string;
  changeAmount: number;
  liquidationStatus: string;
  transactionId: string;
  paymentDate: string;
  serviceTypeCode: string;
}

export interface ProductInformation {
  totalImport: number;
  totalDiscount: number;
  deliveryAmount: number;
  totalImportWithOutDiscount: number;
  products: Product[];
}

export interface Product {
  sku: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
  name: string;
  presentationDescription: string;
}

export interface CarrierInformation {
  document: string;
  name: string;
  phone: string;
  travelGroup: string;
}

export interface OrderInformationConsolidatedResponse {
  orderInfo: OrderMainData;
  orderInfoClient: ClientInformation;
  orderInfoAdditional: OrderInformation;
  paymentMethodDto: PaymentInformation;
  productDetail: ProductInformation;
}

export interface OrderDetailResponse {
  orderInfoConsolidated: OrderInformationConsolidatedResponse;
  orderInfoMotorized: CarrierInformation;
  orderStatusDetail: OrderStatusDetail;
}
