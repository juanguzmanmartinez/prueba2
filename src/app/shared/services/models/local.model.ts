import { isObject } from '../../helpers/objects-equal';

export interface ILocal {
  localCode: string;
  name: string;
  description: string;
  address: string;
  wmsEnabled: boolean;
  companies: Array<ICompany>;
}

export interface ICompany {
  company: string;
  code: string;
}

export class Local {
  localCode: string;
  name: string;
  description: string;
  address: string;
  wmsEnabled: boolean;
  companies: Array<ICompany>;

  constructor(store: ILocal) {
    const currentValue = isObject(store) ? store : {} as ILocal;
    this.localCode = currentValue.localCode || '';
    this.name = currentValue.name || '';
    this.description = currentValue.description || '';
    this.address = currentValue.address || '';
    this.localCode = currentValue.localCode || '';
    this.address = currentValue.address || '';
    this.companies = currentValue.companies || [];

  }

}

export interface IAlert {
  typeService: string;
  selectedStepOne: string;
  nameLocal: string;
  showAlert: boolean;
}


export class Alert {
  typeService: string;
  selectedStepOne: string;
  nameLocal: string;
  showAlert: boolean;

  constructor(store: Alert) {
    const currentValue = isObject(store) ? store : {} as Alert;
    this.typeService = currentValue.typeService || '';
    this.selectedStepOne = currentValue.selectedStepOne || '';
    this.nameLocal = currentValue.nameLocal || '';
    this.showAlert = currentValue.showAlert || false;

  }

}
