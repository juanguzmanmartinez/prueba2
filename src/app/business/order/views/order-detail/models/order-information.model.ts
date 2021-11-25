import { OrderInformation } from '../interfaces/order-detail.interface';

export class OrderInformationModel {
  orderId: string;
  purchaseId: string;
  operator: string;
  observation: string;
  reasonForCancellation: string;
  zone: string;
  localService: string;
  localType: string;
  typeOfOffice: string;

  constructor(data: OrderInformation) {
    this.orderId = data.ecommerceId ? data.ecommerceId.toString() : '-';
    this.purchaseId = data.purchaseId ? data.purchaseId : '-';
    this.operator = data.operator ? data.operator : '-';
    this.observation = data.observation ? data.observation : '-';
    this.reasonForCancellation = data.cancellationReason ? data.cancellationReason : '-';
    this.zone = data.zoneDescription ? data.zoneDescription : '-';
    this.localService = data.localDescription ? data.localDescription : '-';
    this.localType = '-'; // TODO: Verificar posibles de response para serviceType;
    this.typeOfOffice = '-'; // TODO: Verficar si el response es stockType
  }

}
