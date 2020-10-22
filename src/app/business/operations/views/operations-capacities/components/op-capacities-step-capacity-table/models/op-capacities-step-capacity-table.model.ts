import {IDatepickerRange} from '../../../../../../../commons/core-components/input-datepicker/views/input-datepicker-range/input-datepicker-range.component';
import {ICapacityStepAmPmCapacitySegment} from '../../op-capacities-step-am-pm-capacity/models/op-capacities-step-am-pm-capacity.model';


export interface ICapacityStepCapacityTableFormValue {
  capacityRange?: IDatepickerRange;
  capacityForSelection: number;
  capacitySegmentList: ICapacityStepAmPmCapacitySegment[];
}

export interface ICapacityStepCapacityTableSegments {
  capacityRange?: IDatepickerRange;
  capacitySegmentList: ICapacityStepAmPmCapacitySegment[];
}

export class FromFormToCapacityStepCapacityTableSegments implements ICapacityStepCapacityTableSegments {
  capacityRange: IDatepickerRange;
  capacitySegmentList: ICapacityStepAmPmCapacitySegment[];

  constructor(amPmCapacityForm: ICapacityStepCapacityTableFormValue) {
    this.capacityRange = amPmCapacityForm.capacityRange;
    this.capacitySegmentList = amPmCapacityForm.capacitySegmentList;
  }

}
