import { isObject } from 'util';

export interface IDrugstore {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  inkaVentaId: string;
  localCode: string;
  address: string;
  services: Array<IServices>;
  company: Array<ICompany>;
  segmentType: ISegmentType;
  channel: string;
  enabled: boolean;
}

export interface IServices {
  code: string;
  service: string;
  shortName: string;
  enabled: boolean;
}

export interface ICompany {
  company: string;
  code: string;
}

export interface ISegmentType {
  name: string;
  shortName: string;
  enabled: boolean;
}


export class Drugstore {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  inkaVentaId: string;
  localCode: string;
  address: string;
  services: Array<IServices>;
  company: Array<ICompany>;
  segmentType: ISegmentType;
  channel: string;
  enabled: boolean;

  constructor(store: IDrugstore) {
    const currentValue = isObject(store) ? store : {} as IDrugstore;
    this.id = currentValue.id || '';
    this.name = currentValue.name  || '';
    this.description = currentValue.description  || '';
    this.latitude = currentValue.latitude  || -1;
    this.longitude = currentValue.longitude || -1;
    this.inkaVentaId = currentValue.inkaVentaId || '';
    this.localCode = currentValue.localCode || '';
    this.address = currentValue.address || '';
    this.services = currentValue.services || [];
    this.company = currentValue.company || [];
    this.segmentType = currentValue.segmentType || {} as ISegmentType;
    this.channel = currentValue.channel || '';
    this.enabled = currentValue.enabled || false;
  }

}

// DRUGSTORE RESPONSE
export interface IStoreResponse {
  elements: IDrugstore[];
}
