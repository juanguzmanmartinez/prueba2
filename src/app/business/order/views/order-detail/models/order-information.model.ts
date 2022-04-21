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
    this.reasonForCancellation = data.cancellationReason
      ? data.cancellationReason
      : '-';
    this.zone = data.zoneDescription
      ? this.formatZone(data.zoneDescription)
      : '-';
    this.localService = this.formatLocalDescription(data);
    this.localType = data.serviceType ? data.serviceType : '-';
    this.typeOfOffice = data.stockType
      ? this.formatTypeOfOffice(data.stockType)
      : '-';
    this.source = source ? this.formatSource(source) : '-';
  }

  private formatZone(value: string): string {
    if (value.includes('-')) {
      const replaceLetter = value.replace(' - ', '&');
      return replaceLetter.split('&').reverse().join(' - ');
    }

    return value;
  }

  private reformatLocalDescription(value: string): string {
    return value.split('-')[1].trim();
  }

  private formatLocalDescription(data: OrderInformation): string {
    if (!data.localCode) {
      return '-';
    }
    if (data.localCode && !data.localDescription) {
      return data.localCode;
    }

    if (data.localCode && data.localDescription) {
      return `${this.reformatLocalDescription(data.localDescription)} - ${
        data.localCode
      }`;
    }
  }

  private formatTypeOfOffice(stockType: string): string {
    const firstLetter = stockType.slice(0, 1).toUpperCase();
    const restOfTheWord = stockType.slice(1).toLowerCase();
    return `${firstLetter}${restOfTheWord}`;
  }

  private formatSource(source: string): string {
    if (source.toLowerCase() === 'sc') {
      return source.toUpperCase();
    }
    const firstLetter = source.slice(0, 1).toUpperCase();
    const restOfTheWord = source.slice(1).toLowerCase();
    return `${firstLetter}${restOfTheWord}`;
  }
}
