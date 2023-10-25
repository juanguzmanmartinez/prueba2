import { ICarrierStateResponse } from '@interfaces/control-tower/control-tower.interface';
import { ISelectOption } from '@interfaces/vita/select.interface';

export class CarrierStateFilter implements ISelectOption {
  label?: string;
  value: any;

  constructor(res: ICarrierStateResponse) {
    this.value = res.stateType;
    this.label = res.description;
  }
}
