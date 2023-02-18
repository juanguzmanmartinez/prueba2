import { R } from '@angular/cdk/keycodes';
import { LStatusNotAllowed } from '@helpers/disable-cancel-order.helper';
import { ETypeTagBrand } from '@models/tag/tag.model';
import { reorderTimeline } from '../../../../../shared/utils/timeline.util';
import { OrderDetailResponse } from '../interfaces/order-detail.interface';
import { CarrierInformationModel } from './carrier-information.model';
import { ClientInformationModel } from './client-information.model';
import { OrderInformationModel } from './order-information.model';
import { PaymentInformationModel } from './payment-information.model';
import { ProductInformationModel } from './product-information.model';
import { TimelineModel } from './timeline.model';

export class OrderDetailModel {
  orderNumber: string;
  callNumber: string;
  tagCompany: string;
  iconTagCompany: ETypeTagBrand;
  tagChannel: string;
  tagOrderType: string;
  tagServiceType: string;
  promiseDate: string;
  timeline: TimelineModel[];
  clientInformation: ClientInformationModel;
  orderInformation: OrderInformationModel;
  paymentInformation: PaymentInformationModel;
  carrierInformation: CarrierInformationModel;
  productInformation: ProductInformationModel;
  disabled:boolean;
  constructor(data: OrderDetailResponse) {
    this.orderNumber = data.orderInfoConsolidated?.orderInfo?.ecommerceId ?
      data.orderInfoConsolidated.orderInfo.ecommerceId.toString() : '-';
    this.callNumber = data.orderInfoConsolidated.orderInfo.ecommerceIdCall ?
      data.orderInfoConsolidated.orderInfo.ecommerceIdCall.toString() : '';

    this.tagCompany = data.orderInfoConsolidated?.orderInfo?.companyCode ?
      data.orderInfoConsolidated.orderInfo.companyCode : null;
    this.iconTagCompany = data.orderInfoConsolidated?.orderInfo?.companyCode ?
      data.orderInfoConsolidated?.orderInfo?.companyCode.toLowerCase() === ETypeTagBrand.inkafarma ?
        ETypeTagBrand.inkafarma : ETypeTagBrand.mifarma : null;
    this.tagChannel = data.orderInfoConsolidated?.orderInfo?.serviceChannel ?
      data.orderInfoConsolidated.orderInfo.serviceChannel : '-';
    this.tagOrderType = data.orderInfoConsolidated?.orderInfo?.orderType ?
      data.orderInfoConsolidated.orderInfo.orderType.toUpperCase() : '-';
    this.tagServiceType = data.orderInfoConsolidated?.orderInfo?.serviceTypeShortCode ?
      data.orderInfoConsolidated.orderInfo.serviceTypeShortCode.toUpperCase() : '-';

    this.promiseDate = data.orderInfoConsolidated?.orderInfo?.scheduledTime ?
      this.formatPromiseDate(data.orderInfoConsolidated.orderInfo.scheduledTime) : '-';

    this.timeline = data.orderStatusDetail?.statusTimeLine
      ? reorderTimeline(data.orderStatusDetail?.statusTimeLine).map(timeline => {
          return new TimelineModel(
            timeline,
            data.orderInfoConsolidated?.orderInfo?.serviceChannel,
            data.orderInfoConsolidated?.orderInfo?.serviceType
          );
        })
      : null;

    this.clientInformation = data.orderInfoConsolidated?.orderInfoClient ?
      new ClientInformationModel(data.orderInfoConsolidated.orderInfoClient) : null;
    this.orderInformation = data.orderInfoConsolidated?.orderInfoAdditional ?
      new OrderInformationModel(data.orderInfoConsolidated.orderInfoAdditional,
                                data?.orderInfoConsolidated?.orderInfo?.source) : null;
    this.paymentInformation = data.orderInfoConsolidated?.paymentMethodDto ?
      new PaymentInformationModel(data.orderInfoConsolidated.paymentMethodDto) : null;
    this.carrierInformation = data.orderInfoMotorized ?
      new CarrierInformationModel(data.orderInfoMotorized) : null;
    this.productInformation = data.orderInfoConsolidated?.productDetail ?
      new ProductInformationModel(data.orderInfoConsolidated.productDetail) : null;
    this.disabled = this.searchStatusNotAllowed(this.timeline);
  }

  private formatPromiseDate = (scheduledTime: string): string => {
    const day = scheduledTime.slice(0, 2);
    const month = scheduledTime.slice(3, 5);
    const hours = scheduledTime.slice(9)
      .replace('-  -', 'a')
      .replace('AM', 'a.m.')
      .replace('PM', 'p.m.');
    return `${day}/${month} a las ${hours}`;
  }

  private searchStatusNotAllowed(data:TimelineModel[]){
    let dataNotAllowed = data.filter(t=>LStatusNotAllowed.includes(t.codeStatus));
    if(dataNotAllowed.find(r=>r.selected)) return true
    return false;
  }

}
