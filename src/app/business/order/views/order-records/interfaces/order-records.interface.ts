import { OrderModel } from '../models/order-records.model';

export interface DatepickerFilter {
  startDate: number;
  endDate: number;
}

export interface DatepickerFilterEvent {
  dateRange: [dateInitFilter: string, dateEndFilter: string];
  notFound: string;
}

export interface LocalFilterEvent {
  locals: string[];
  notFound: string;
}

export interface CompanyFilterEvent {
  companies: string[];
  notFound: string;
}

export interface ServicesFilterEvent {
  services: string[];
  notFound: string;
}

export interface StatusFilterEvent {
  status: string[];
  notFound: string;
}

export interface ChannelFilterEvent {
  channels: string[];
  notFound: string;
}

export interface OrderRecordsResponse {
  orders: OrderResponse[];
  page: number;
  currentRecords: number;
  totalRecords: number;
}

export interface OrderRecords {
  orders: OrderModel[];
  page: number;
  currentRecords: number;
  totalRecords: number;
}

export interface OrderResponse {
  orderStatus: string;
  localId: string;
  companyCode: string;
  serviceChannel: string;
  orderId: number;
  ecommerceId: number;
  serviceTypeId: string;
  documentoId: string;
  client: string;
  promiseDate: string;
}

export interface OrderStatusResponse {
  code: string;
  name: string;
}

export interface OrderStatus {
  id: string;
  code: string;
  name: string;
}
