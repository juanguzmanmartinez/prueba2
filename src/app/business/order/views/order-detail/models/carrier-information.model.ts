export class CarrierInformationModel {
  transporters: string;
  document: string;
  mobile: string;
  tripGroup: string;

  constructor(data: any) {
    this.transporters = '';
    this.document = '';
    this.mobile = '';
    this.tripGroup = '';
  }
}
