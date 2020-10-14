import {IDatepickerRange} from '../../../../../../../commons/core-components/input-datepicker/views/input-datepicker-range/input-datepicker-range.component';

export interface ICapacityStepAmPmCapacityFormValue {
  capacityRange: IDatepickerRange;
  amCapacity: number;
  pmCapacity: number;
}

export interface ICapacityStepAmPmCapacitySegment {
  segmentHour: string;
  segmentCapacity: number;
  segmentValue: string;
}

export interface ICapacityStepAmPmCapacitySegments {
  capacityRange?: IDatepickerRange;
  amSegment: ICapacityStepAmPmCapacitySegment;
  pmSegment: ICapacityStepAmPmCapacitySegment;
}

export class FromFormToCapacityStepAmPmCapacitySegments implements ICapacityStepAmPmCapacitySegments {
  capacityRange: IDatepickerRange;
  amSegment: ICapacityStepAmPmCapacitySegment;
  pmSegment: ICapacityStepAmPmCapacitySegment;

  constructor(amPmCapacityForm: ICapacityStepAmPmCapacityFormValue, segments: ICapacityStepAmPmCapacitySegments) {
    this.capacityRange = amPmCapacityForm.capacityRange;
    this.amSegment = {
      segmentCapacity: amPmCapacityForm.amCapacity || 0,
      segmentHour: segments && segments.amSegment ? segments.amSegment.segmentHour : '',
      segmentValue: segments && segments.amSegment ? segments.amSegment.segmentValue : ''
    };
    this.pmSegment = {
      segmentCapacity: amPmCapacityForm.pmCapacity || 0,
      segmentHour: segments && segments.pmSegment ? segments.pmSegment.segmentHour : '',
      segmentValue: segments && segments.amSegment ? segments.amSegment.segmentValue : ''
    };
  }
}

