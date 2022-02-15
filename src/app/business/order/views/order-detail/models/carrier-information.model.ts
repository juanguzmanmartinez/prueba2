import { CarrierInformation } from '../interfaces/order-detail.interface';

export class CarrierInformationModel {
  transporters: string;
  document: string;
  mobile: string;
  tripGroup: string;

  constructor(data: CarrierInformation) {
    this.transporters = data.name ? data.name : '-';
    this.document = data.document ? data.document : '-';
    this.mobile = data.phone ? data.phone : '-';
    this.tripGroup = data.travelGroup ? data.travelGroup : '-';
  }
}
