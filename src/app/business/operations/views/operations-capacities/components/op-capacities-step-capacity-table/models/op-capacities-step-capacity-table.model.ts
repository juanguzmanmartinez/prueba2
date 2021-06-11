import { IDatepickerRange } from '@atoms/input-datepicker/input-datepicker-range/input-datepicker-range.component';
import { ServiceTypeSegment } from '@interfaces/stores/stores.interface';


export interface ICapacityStepCapacityTableFormValue {
  capacityRange?: IDatepickerRange;
  capacityForSelection: number;
  capacitySegmentList: ServiceTypeSegment[];
}

export interface ICapacityStepCapacityTableSegments {
  capacityRange?: IDatepickerRange;
  capacitySegmentList: ServiceTypeSegment[];
}

export class FromFormToCapacityStepCapacityTableSegments implements ICapacityStepCapacityTableSegments {
  capacityRange: IDatepickerRange;
  capacitySegmentList: ServiceTypeSegment[];

  constructor(amPmCapacityForm: ICapacityStepCapacityTableFormValue) {
    this.capacityRange = amPmCapacityForm.capacityRange;
    this.capacitySegmentList = amPmCapacityForm.capacitySegmentList;
  }

}
