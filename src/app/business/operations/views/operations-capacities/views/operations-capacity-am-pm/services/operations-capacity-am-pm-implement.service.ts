import {Injectable} from '@angular/core';
import {ICustomSelectOption} from 'src/app/commons/interfaces/custom-controls.interface';
import {LocalClientService} from 'src/app/shared/services/calendar/local-client.service';
import {CapacityImplementService} from '../../../../../../../shared/services/capacity-edition/capacity-implements.service';
import {CalendarClientService} from '../../../../../../../shared/services/calendar/calendar-client.service';
import {ICalendarUpdateRequestParams} from '../../../../../../../shared/services/models/capacity.model';
import {map, take} from 'rxjs/operators';

@Injectable()
export class OperationsCapacityAmPmImplementService {
  private capacityId = 'AM_PM';

  constructor(
    private localClient: LocalClientService,
    private calendarClient: CalendarClientService,
    private _capacityImplementService: CapacityImplementService
  ) {
  }

  public getLocalImplements$() {
    return this._capacityImplementService.getLocalImplements$(this.capacityId)
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
    return this._capacityImplementService.getGroupLocalImplements$(this.capacityId)
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
    return this._capacityImplementService.getTypeOperationImplements$(editionMode, selectedLocal, this.capacityId);
  }

  public getTypeOperationGroupImplements$(editionMode: string, selectedLocal: ICustomSelectOption) {
    return this._capacityImplementService.getTypeOperationGroupImplements$(editionMode, selectedLocal, this.capacityId);
  }

  public patchCalendarUpdateClient$(request: ICalendarUpdateRequestParams) {
    return this.calendarClient.patchCalendarUpdateClient$(request);
  }

  public patchCalendarRangeUpdateClient$(request: ICalendarUpdateRequestParams) {
    return this.calendarClient.patchCalendarRangeUpdateClient$(request);
  }

}
