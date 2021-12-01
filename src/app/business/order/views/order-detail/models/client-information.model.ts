import { ClientInformation } from '../interfaces/order-detail.interface';

export class ClientInformationModel {
  fullName: string;
  documentNumber: string;
  ruc: string;
  businessName: string;
  phone: string;
  email: string;
  address: string;
  coordinates: string;
  reference: string;

  constructor(data: ClientInformation) {
    this.fullName = data.clientName ? data.clientName : '-';
    this.documentNumber = data.documentNumber ? data.documentNumber.toString() : '-';
    this.ruc = '-';
    this.businessName = '-';
    this.phone = data.phone ? data.phone : '-';
    this.email = data.email ? data.email : '-';
    this.address = '';
    this.coordinates = data.coordinates ? data.coordinates : '-';
    this.reference = data.reference ? data.reference : '-';
  }
}
