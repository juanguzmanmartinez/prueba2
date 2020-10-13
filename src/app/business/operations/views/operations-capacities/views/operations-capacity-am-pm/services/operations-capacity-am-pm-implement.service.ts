import {Injectable} from '@angular/core';
import {ICustomSelectOption} from 'src/app/commons/interfaces/custom-controls.interface';
import {LocalClientService} from 'src/app/shared/services/calendar/local-client.service';
import {CapacityImplementService} from '../../../../../../../shared/services/capacity-edition/capacity-implements.service';
import {CalendarClientService} from '../../../../../../../shared/services/calendar/calendar-client.service';
import {ICalendarUpdateRequestParams} from '../../../../../../../shared/services/models/capacity.model';
import {map, take} from 'rxjs/operators';

@Injectable()
export class OperationsCapacityAmPmImplementService {
  private amPmCapacityId = 'AM_PM';
  private amPmChannel = 'DIGITAL';

  constructor(
    private localClient: LocalClientService,
    private calendarClient: CalendarClientService,
    private _capacityImplementService: CapacityImplementService
  ) {
  }

  public getLocalImplements$() {
    return this._capacityImplementService.getLocalImplements$(this.amPmCapacityId)
      .pipe(take(1),
        map((locals) => {
          return locals ? locals.map(store => {
            return {
              text: store.description,
              value: store.localCode,
              code: store.localCode,
              fulfillmentCenterCode: store.localCode,
            } as ICustomSelectOption;
          }) : [];
        }));
  }

  public getLocalGroupImplements$() {
    return this._capacityImplementService.getGroupLocalImplements$(this.amPmCapacityId)
      .pipe(take(1),
        map((locals) => {
          return locals ? locals.map(store => {
            return {
              text: store.description,
              value: store.localCode,
              code: store.localCode,
              fulfillmentCenterCode: store.localCode,
            } as ICustomSelectOption;
          }) : [];
        }));
  }

  public getTypeOperationImplements$(editionMode: string, selectedLocal: ICustomSelectOption) {
    return this._capacityImplementService.getTypeOperationImplements$(editionMode, selectedLocal, this.amPmCapacityId)
      .pipe(take(1));
  }

  public getTypeOperationGroupImplements$(editionMode: string, selectedLocal: ICustomSelectOption) {
    return this._capacityImplementService.getTypeOperationGroupImplements$(editionMode, selectedLocal, this.amPmCapacityId)
      .pipe(take(1));
  }

  public patchCalendarUpdateClient$(request: ICalendarUpdateRequestParams) {
    request.serviceTypeCode = this.amPmCapacityId;
    request.channel = this.amPmChannel;
    return this._capacityImplementService.patchCalendarUpdateClient$(request)
      .pipe(take(1));
  }

  public patchCalendarRangeUpdateClient$(request: ICalendarUpdateRequestParams) {
    request.serviceTypeCode = this.amPmCapacityId;
    request.channel = this.amPmChannel;
    return this._capacityImplementService.patchCalendarRangeUpdateClient$(request)
      .pipe(take(1));
  }

}
