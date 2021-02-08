import { ICapacityStepExpressResourceSegments } from '../components/op-capacities-step-express-resource/models/op-capacities-step-express-resource.model';
import { ICapacityStepCapacityTableSegments } from '../components/op-capacities-step-capacity-table/models/op-capacities-step-capacity-table.model';
import { CapacitiesServiceType } from './operations-capacities-responses.model';
import { IDatepickerRange } from '@atoms/input-datepicker/views/input-datepicker-range/input-datepicker-range.component';
import { ServiceTypeSegment } from '@models/local/service-type.model';


export class ToCapacityStepExpressResourceSegments implements ICapacityStepExpressResourceSegments {
  expressResource: number;

  constructor(iServiceType: CapacitiesServiceType) {
    if (iServiceType && iServiceType.segmentList && iServiceType.segmentList.length) {
      const expressResourceSegment = iServiceType.segmentList[0];
      this.expressResource = expressResourceSegment ? expressResourceSegment.segmentCapacity : 0;
    }
  }
}

export class ToCapacityStepAmPmCapacitySegments implements ICapacityStepCapacityTableSegments {
  capacitySegmentList: ServiceTypeSegment[] = [];

  constructor(iServiceType: CapacitiesServiceType) {
    if (iServiceType && iServiceType.segmentList && iServiceType.segmentList.length) {
      this.capacitySegmentList = iServiceType.segmentList;
    }
  }
}

export class ToCapacityStepScheduledCapacitySegments extends ToCapacityStepAmPmCapacitySegments {
  constructor(capacitiesServiceType: CapacitiesServiceType) {
    super(capacitiesServiceType);
  }
}


export class ToCapacityStepRetCapacitySegments extends ToCapacityStepAmPmCapacitySegments {
  constructor(capacitiesServiceType: CapacitiesServiceType) {
    super(capacitiesServiceType);
  }

}

export class CapacityRangeLimit implements IDatepickerRange {
  endDate: number;
  startDate: number;

  constructor(capacitiesServiceType: CapacitiesServiceType) {
    if (capacitiesServiceType) {
      this.startDate = capacitiesServiceType.startDay;
      this.endDate = capacitiesServiceType.endDay;
    }
  }
}
