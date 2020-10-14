import {IDatepickerRange} from '../../../../../../../commons/core-components/input-datepicker/views/input-datepicker-range/input-datepicker-range.component';


export interface ICapacityStepCapacityTableFormValue {
  capacityRange?: IDatepickerRange;
  capacityForSelection: number;
  capacitySegmentList: ICapacityStepCapacityTableSegment[];
}

export interface ICapacityStepCapacityTableSegment {
  segmentHour: string;
  segmentCapacity: number;
  segmentValue: string;
}

export interface ICapacityStepCapacityTableSegments {
  capacityRange?: IDatepickerRange;
  capacitySegmentList: ICapacityStepCapacityTableSegment[];
}

export class FromFormToCapacityStepCapacityTableSegments implements ICapacityStepCapacityTableSegments {
  capacityRange: IDatepickerRange;
  capacitySegmentList: ICapacityStepCapacityTableSegment[];

  constructor(amPmCapacityForm: ICapacityStepCapacityTableFormValue) {
    this.capacityRange = amPmCapacityForm.capacityRange;
    this.capacitySegmentList = amPmCapacityForm.capacitySegmentList;
  }

}
