import { CarrierInformation } from '../interfaces/order-detail.interface';

export class CarrierInformationModel {
  transporters: string;
  document: string;
  mobile: string;
  tripGroup: string;

  constructor(data: CarrierInformation) {
    this.transporters = data.name ? this.reformatCamelCase(data.name) : '-';
    this.document = data.document ? data.document : '-';
    this.mobile = data.phone ? data.phone : '-';
    this.tripGroup = data.travelGroup ? data.travelGroup : '-';
  }

  private reformatCamelCase(value: string): string {
    let formattedText = '';
    const arrayWords = value.split(' ');
    arrayWords.forEach(word => {
      const firstLetter = word.slice(0, 1).toUpperCase();
      const restOfTheWord = word.slice(1).toLowerCase();
      formattedText += `${firstLetter}${restOfTheWord} `;
    });
    return formattedText.trim();
  }
}
