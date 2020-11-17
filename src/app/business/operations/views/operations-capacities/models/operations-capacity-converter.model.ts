import {
  ICapacityStepAmPmCapacitySegment, ICapacityStepAmPmCapacitySegments,
} from '../components/op-capacities-step-am-pm-capacity/models/op-capacities-step-am-pm-capacity.model';
import { ICapacityStepExpressResourceSegments } from '../components/op-capacities-step-express-resource/models/op-capacities-step-express-resource.model';
import {
  ICapacityStepCapacityTableSegments
} from '../components/op-capacities-step-capacity-table/models/op-capacities-step-capacity-table.model';
import { CapacitiesServiceType } from './operations-capacities-responses.model';
import { IDatepickerRange } from '../../../../../commons/core-components/input-datepicker/views/input-datepicker-range/input-datepicker-range.component';


export class ToCapacityStepAmPmCapacitySegments implements ICapacityStepAmPmCapacitySegments {
  amSegment: ICapacityStepAmPmCapacitySegment;
  pmSegment: ICapacityStepAmPmCapacitySegment;

  constructor(iServiceType: CapacitiesServiceType) {
    if (iServiceType && iServiceType.segmentList && iServiceType.segmentList.length) {
      this.amSegment = iServiceType.segmentList[0];
      this.pmSegment = iServiceType.segmentList[1];
    }
  }
}

export class ToCapacityStepExpressResourceSegments implements ICapacityStepExpressResourceSegments {
  expressResource: number;

  constructor(iServiceType: CapacitiesServiceType) {
    if (iServiceType && iServiceType.segmentList && iServiceType.segmentList.length) {
      const expressResourceSegment = iServiceType.segmentList[0];
      this.expressResource = expressResourceSegment ? expressResourceSegment.segmentCapacity : 0;
    }
  }
}


export class ToCapacityStepScheduledCapacitySegments implements ICapacityStepCapacityTableSegments {
  capacitySegmentList: ICapacityStepAmPmCapacitySegment[] = [];

  constructor(iServiceType: CapacitiesServiceType) {
    if (iServiceType && iServiceType.segmentList && iServiceType.segmentList.length) {
      this.capacitySegmentList = iServiceType.segmentList;
    }
  }
}


export class ToCapacityStepRetCapacitySegments extends ToCapacityStepScheduledCapacitySegments {
  constructor(capacitiesServiceType: CapacitiesServiceType) {
    super(capacitiesServiceType);
  }

}

export class CapacityRangeLimit implements IDatepickerRange {
  endDate: string;
  startDate: string;

  constructor(capacitiesServiceType: CapacitiesServiceType) {
    this.startDate = capacitiesServiceType.startDay;
    this.endDate = capacitiesServiceType.endDay;
  }
}
