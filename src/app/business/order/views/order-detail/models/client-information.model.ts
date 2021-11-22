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
    this.fullName = data.clientName;
    this.documentNumber = data.documentNumber;
    this.ruc = '';
    this.businessName = '';
    this.phone = data.phone;
    this.email = data.email;
    this.address = '';
    this.coordinates = data.coordinates;
    this.reference = '';
  }
}
