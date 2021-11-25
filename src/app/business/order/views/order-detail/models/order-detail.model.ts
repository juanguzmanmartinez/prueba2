import { OrderDetailResponse } from '../interfaces/order-detail.interface';
import { OrderInformationModel } from './order-information.model';
import { ClientInformationModel } from './client-information.model';
import { ProductInformationModel } from './product-information.model';
import { PaymentInformationModel } from './payment-information.model';
import { CarrierInformationModel } from './carrier-information.model';

export class OrderDetailModel {
  orderNumber: string;
  callNumber: string;
  tagCompany: string;
  iconTagCompany: string;
  tagChannel: string;
  tagOrderType: string;
  tagServiceType: string;
  promiseDate: string;
  clientInformation: ClientInformationModel;
  orderInformation: OrderInformationModel;
  paymentInformation: PaymentInformationModel;
  carrierInformation: CarrierInformationModel;
  productInformation: ProductInformationModel;

  constructor(data: OrderDetailResponse) {
    this.orderNumber = data.orderInfoConsolidated.orderInfo.ecommerceId.toString();
    this.callNumber = '';
    this.tagCompany = data.orderInfoConsolidated.orderInfo.companyCode;
    this.iconTagCompany = data.orderInfoConsolidated.orderInfo.companyCode.toLowerCase();
    this.tagChannel = data.orderInfoConsolidated.orderInfo.serviceChannel;
    this.tagOrderType = data.orderInfoConsolidated.orderInfo.orderType.toUpperCase();
    this.tagServiceType = data.orderInfoConsolidated.orderInfo.serviceTypeShortCode.toUpperCase();
    this.promiseDate = data.orderInfoConsolidated.orderInfo.scheduledTime;
    this.clientInformation = data.orderInfoConsolidated.orderInfoClient ?
      new ClientInformationModel(data.orderInfoConsolidated.orderInfoClient) : null;
    this.orderInformation = data.orderInfoConsolidated.orderInfoAdditional ?
      new OrderInformationModel(data.orderInfoConsolidated.orderInfoAdditional) : null;
    this.paymentInformation = data.orderInfoConsolidated.paymentMethodDto ?
      new PaymentInformationModel(data.orderInfoConsolidated.paymentMethodDto) : null;
    this.carrierInformation = null;
    this.productInformation = data.orderInfoConsolidated.productDetail ?
      new ProductInformationModel(data.orderInfoConsolidated.productDetail) : null;
  }
}
