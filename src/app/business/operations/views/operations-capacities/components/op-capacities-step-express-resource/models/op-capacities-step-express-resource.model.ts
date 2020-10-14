import {IDatepickerRange} from '../../../../../../../commons/core-components/input-datepicker/views/input-datepicker-range/input-datepicker-range.component';

export interface ICapacityStepExpressResourceSegments {
  capacityRange?: IDatepickerRange;
  expressResource: number;
}

export class FromFormToCapacityStepExpressResourceSegments implements ICapacityStepExpressResourceSegments {
  capacityRange: IDatepickerRange;
  expressResource: number;

  constructor(amPmCapacityForm: ICapacityStepExpressResourceSegments) {
    this.capacityRange = amPmCapacityForm.capacityRange;
    this.expressResource = amPmCapacityForm.expressResource;
  }
}

