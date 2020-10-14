import {IDatepickerRange} from '../../../../../../../commons/core-components/input-datepicker/views/input-datepicker-range/input-datepicker-range.component';


export interface ICapacityStepScheduledCapacityFormValue {
  capacityRange?: IDatepickerRange;
  capacityForSelection: number;
  scheduledSegmentList: ICapacityStepScheduledCapacitySegment[];
}

export interface ICapacityStepScheduledCapacitySegment {
  segmentHour: string;
  segmentCapacity: number;
  segmentValue: string;
}

export interface ICapacityStepScheduledCapacitySegments {
  capacityRange?: IDatepickerRange;
  scheduledSegmentList: ICapacityStepScheduledCapacitySegment[];
}

export class FromFormToCapacityStepScheduledCapacitySegments implements ICapacityStepScheduledCapacitySegments {
  capacityRange: IDatepickerRange;
  scheduledSegmentList: ICapacityStepScheduledCapacitySegment[];

  constructor(amPmCapacityForm: ICapacityStepScheduledCapacityFormValue) {
    this.capacityRange = amPmCapacityForm.capacityRange;
    this.scheduledSegmentList = amPmCapacityForm.scheduledSegmentList;
  }

}
