import { PaymentInformation } from '../interfaces/order-detail.interface';
import { CCardNameIllustration } from '@models/card/card.model';

export class PaymentInformationModel {
  paymentType: string;
  transactionId: string;
  changeAmount: string;
  status: string;
  date: string;
  cardNumber: string;
  authorizationCode: string;
  cardBrand: string;
  financial: string;
  liquidationUser: string;

  constructor(data: PaymentInformation) {
    this.paymentType = data.paymentType ? data.paymentType : '-';
    this.transactionId = '-';
    this.changeAmount = data.changeAmount ? `S/ ${data.changeAmount}` : '-';
    this.status = '-';
    this.date = data.paymentDate ? this.formatDate(data.paymentDate) : '-';
    this.cardNumber = '-';
    this.authorizationCode = '-';
    this.cardBrand = data.paymentGateway ? CCardNameIllustration[data.paymentGateway] : '-';
    this.financial = '-';
    this.liquidationUser = '-';
  }

  private formatDate(paymentDate: string): string {
    const date = new Date(paymentDate);
    const day = this.padWithZero(date.getDate());
    const month = this.padWithZero(date.getMonth());
    const hour = date.getUTCDate();
    const minutes = date.getUTCMinutes();
    const daySlot = this.getDateAmOrPM(date.getHours());
    return `${day}/${month} - ${hour}:${minutes} ${daySlot}`;
  }

  private padWithZero = (value: number): string => {
    if (value.toString().length < 2) {
      return `0${value}`;
    }
    return value.toString();
  }

  private getDateAmOrPM = (hour: number): string => {
    return hour >= 12 ? 'pm' : 'am';
  }

}
