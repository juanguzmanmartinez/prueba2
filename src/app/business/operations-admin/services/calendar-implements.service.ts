import { Injectable } from '@angular/core';
import { CalendarClientService } from 'src/app/shared/services/calendar/calendar-client.service';

@Injectable()
export class CalendarImplementService {
  constructor(
    private storeClient: CalendarClientService,
   ) { }

  public getStoreImplements$() {
    return this.storeClient.getStoreClient$();
  }
}
