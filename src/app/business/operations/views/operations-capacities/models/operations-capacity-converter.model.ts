import {ITypeService} from '../../../../../shared/services/models/type-service.model';
import {
  ICapacityStepAmPmCapacitySegment, ICapacityStepAmPmCapacitySegments,
} from '../components/op-capacities-step-am-pm-capacity/models/op-capacities-step-am-pm-capacity.model';
import {ICapacityStepExpressResourceSegments} from '../components/op-capacities-step-express-resource/models/op-capacities-step-express-resource.model';
import {
  ICapacityStepCapacityTableSegment,
  ICapacityStepCapacityTableSegments
} from '../components/op-capacities-step-capacity-table/models/op-capacities-step-capacity-table.model';


export class ToCapacityStepAmPmCapacitySegments implements ICapacityStepAmPmCapacitySegments {
  amSegment: ICapacityStepAmPmCapacitySegment;
  pmSegment: ICapacityStepAmPmCapacitySegment;

  constructor(iTypeService: ITypeService) {
    if (iTypeService && iTypeService.segments && iTypeService.segments.length) {
      const amSegment = iTypeService.segments[0];
      const pmSegment = iTypeService.segments[1];

      this.amSegment = {
        segmentCapacity: amSegment ? amSegment.capacity : 0,
        segmentHour: amSegment ? amSegment.hour : '',
        segmentValue: amSegment ? amSegment.value : ''
      };

      this.pmSegment = {
        segmentCapacity: pmSegment ? pmSegment.capacity : 0,
        segmentHour: pmSegment ? pmSegment.hour : '',
        segmentValue: amSegment ? amSegment.value : ''
      };
    }
  }


}

export class ToCapacityStepExpressResourceSegments implements ICapacityStepExpressResourceSegments {
  expressResource: number;

  constructor(iTypeService: ITypeService) {
    if (iTypeService && iTypeService.segments && iTypeService.segments.length) {
      const expressResourceSegment = iTypeService.segments[0];
      this.expressResource = expressResourceSegment ? expressResourceSegment.capacity : 0;
    }
  }
}


export class ToCapacityStepScheduledCapacitySegments implements ICapacityStepCapacityTableSegments {
  capacitySegmentList: ICapacityStepCapacityTableSegment[] = [];

  constructor(iTypeService: ITypeService) {
    if (iTypeService && iTypeService.segments && iTypeService.segments.length) {
      this.capacitySegmentList = iTypeService.segments.map(segment => {
        return {
          segmentCapacity: segment.capacity || 0,
          segmentHour: segment.hour || '',
          segmentValue: segment.value || ''
        } as ICapacityStepCapacityTableSegment;
      });
    }
  }

}
