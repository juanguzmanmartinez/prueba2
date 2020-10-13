import {ITypeService} from '../../../../../shared/services/models/type-service.model';
import {
  ICapacityStepAmPmCapacitySegment, ICapacityStepAmPmCapacitySegments,
} from '../components/operations-capacities-step-am-pm-capacity/models/operations-capacities-step-am-pm-capacity.model';
import {ICapacityStepExpressResourceSegments} from '../components/operations-capacities-step-express-resource/models/operations-capacities-step-express-resource.model';

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
