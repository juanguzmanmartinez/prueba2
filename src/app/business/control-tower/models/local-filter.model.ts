import { ILocalResponse } from '@interfaces/control-tower/control-tower.interface';
import { ISelectOption } from '@interfaces/vita/select.interface';

export class LocalFilter implements ISelectOption {
  label?: string;
  value: any;

  constructor(res: ILocalResponse) {
    this.value = res.localCode;
    this.label = res.name;
  }
}
