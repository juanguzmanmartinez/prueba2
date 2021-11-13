export interface DatepickerFilter {
  startDate: number;
  endDate: number;
}

export interface DatepickerFilterEvent {
  dateInitFilter: string;
  dateEndFilter: string;
  notFound: string;
}

export interface OrderRecordsResponse {
  documentoId: string;
  ecommerceId: number;
  fechaPromesa: string;
  localId: string;
  orderId: number;
  orderStatus: string;
  razonSocial: string;
  serviceChannel: string;
  serviceTypeId: string;
}
