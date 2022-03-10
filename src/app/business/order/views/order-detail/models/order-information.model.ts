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
  source: string;

  constructor(data: OrderInformation, source: string) {
    this.orderId = data.ecommerceId ? data.ecommerceId.toString() : '-';
    this.purchaseId = data.purchaseId ? data.purchaseId : '-';
    this.operator = data.operator ? data.operator : '-';
    this.observation = data.observation ? data.observation : '-';
    this.reasonForCancellation = data.cancellationReason ? data.cancellationReason : '-';
    this.zone = data.zoneDescription ? data.zoneDescription : '-';
    this.localService = data.localDescription && data.localCode ? `${data.localDescription} - ${data.localCode}` : '-';
    this.localType = data.serviceType ? data.serviceType : '-';
    this.typeOfOffice = data.stockType ? this.formatTypeOfOffice(data.stockType) : '-';
    this.source = source ? this.formatTypeOfOffice(source) : '-';
  }

  private formatTypeOfOffice = (stockType: string): string => {
    const firstLetter = stockType.slice(0, 1).toUpperCase();
    const restOfTheWord = stockType.slice(1).toLowerCase();
    return `${firstLetter}${restOfTheWord}`;
  }

}
