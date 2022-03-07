import { CCardNameIllustration } from '@models/card/card.model';
import { CLiquidationStatusTranslation } from '@models/liquidation-status/liquidation-status.model';
import { PaymentInformation } from '../interfaces/order-detail.interface';

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
    this.transactionId = data.transactionId ?? '-';
    this.changeAmount = data.changeAmount ? `${data.changeAmount}` : '-';
    this.status = CLiquidationStatusTranslation[data?.liquidationStatus] ?? data.liquidationStatus ?? '-';
    this.date = data.paymentDate ? this.formatDate(data.paymentDate) : '-';
    this.cardNumber = '-'; // TODO: No se guarda en base de datos
    this.authorizationCode = '-';
    this.cardBrand = data.paymentGateway ? CCardNameIllustration[data.paymentGateway] : '';
    this.financial = '-';
    this.liquidationUser = '-';
  }

  private formatDate(paymentDate: string): string {
    const day = paymentDate.slice(8, 10);
    const month = paymentDate.slice(5, 7);
    const hour = this.formatHours(paymentDate.slice(11, 13));
    const minutes = paymentDate.slice(14, 16);
    const daySlot = this.getDateAmOrPM(paymentDate.slice(11, 13));
    return `${day}/${month} - ${hour}:${minutes} ${daySlot}`;
  }

  private formatHours = (hour: string): string => {
    if (Number(hour) > 12) {
      switch (Number(hour)) {
        case 13: {
          return '01';
        }
        case 14: {
          return '02';
        }
        case 15: {
          return '03';
        }
        case 16: {
          return '04';
        }
        case 17: {
          return '05';
        }
        case 18: {
          return '06';
        }
        case 19: {
          return '07';
        }
        case 20: {
          return '08';
        }
        case 21: {
          return '09';
        }
        case 22: {
          return '10';
        }
        case 23: {
          return '11';
        }
        case 24: {
          return '12';
        }
      }
    } else {
      return hour;
    }
  }

  private getDateAmOrPM = (hour: string): string => {
    return Number(hour) >= 12 ? 'p.m.' : 'a.m.';
  }
}
