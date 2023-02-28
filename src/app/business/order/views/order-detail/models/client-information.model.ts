import {
  ClientInformation,
  PersonPickUpInformation,
} from '../interfaces/order-detail.interface';
import { reformatCamelCase } from '../../../../../shared/utils/reformat-camelcase.util';

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
  personToPickup: PersonPickUpInformation;

  constructor(data: ClientInformation) {
    this.fullName = data.clientName ? reformatCamelCase(data.clientName) : '-';
    this.documentNumber = data.documentNumber
      ? data.documentNumber.toString()
      : '-';
    this.ruc = data.ruc ?? '-';
    this.businessName = data.companyName ?? '-';
    this.phone = data.phone ? data.phone : '-';
    this.email = data.email ? data.email : '-';
    this.address = data.addressClient ? data.addressClient : '-';
    this.coordinates = data.coordinates ? data.coordinates : '';
    this.reference = data.reference ? data.reference : '-';
    this.personToPickup = this.transformToPersonPickUp(data.personToPickup);
  }

  transformToPersonPickUp(personPickUp: PersonPickUpInformation) {
    return {
      fullName: personPickUp?.fullName || '-',
      documentNumber: personPickUp?.documentNumber || '-',
      email: personPickUp?.email || '-',
      phoneNumber: personPickUp?.phoneNumber || '-',
    } as PersonPickUpInformation;
  }
}
