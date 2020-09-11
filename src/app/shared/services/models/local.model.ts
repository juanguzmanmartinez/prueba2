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
    debugger;
    this.localCode = currentValue.localCode || '';
    this.name = currentValue.name  || '';
    this.description = currentValue.description  || '';
    this.address = currentValue.address  || '';
    this.localCode = currentValue.localCode || '';
    this.address = currentValue.address || '';
    this.companies = currentValue.companies || [];

  }

}
