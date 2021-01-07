import { IDatepickerRange } from '@atoms/input-datepicker/views/input-datepicker-range/input-datepicker-range.component';
import { ServiceTypeSegment } from '@models/local/service-type.model';


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
