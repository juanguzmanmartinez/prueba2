import { isObject } from 'util';

export interface IStore {
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
  segmentType: Array<ISegmentType>;
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


export class Store {
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
  segmentType: Array<ISegmentType>;
  channel: string;
  enabled: boolean;

  constructor(store: IStore) {
    const currentValue = isObject(store) ? store : {} as IStore;
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
    this.segmentType = currentValue.segmentType || [];
    this.channel = currentValue.channel || '';
    this.enabled = currentValue.enabled || false;
  }

}

// STORE RESPONSE
export interface IStoreResponse {
  elements: IStore[];
}
