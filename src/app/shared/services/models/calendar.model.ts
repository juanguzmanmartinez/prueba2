import { isObject } from 'util';

export interface ICalendarRequestParams {
  fulfillmentCenterCode: string; // D88
  serviceTypeCode: string; // RAD, RED
  segmentType: string; // EXPRESS
  channel: string; // DIGITAL, CALL
}

export interface ICalendar {
  year: string;
  month: string;
  dayList: Array<IDayList>;
}

export interface IDayList {
  capacity: number;
  order: number;
  dayNumber: number;
  day: string;
  dayToShow: boolean;
  check: boolean;
  restrictedDay: boolean;
  dayType?: 'empty' | 'only_number' | 'active';
}


export class Calendar {
  year: string;
  month: string;
  daysList: Array<IDayList>;

  constructor(store: ICalendar) {
    const currentValue = isObject(store) ? store : {} as ICalendar;
    this.year = currentValue.year || '';
    this.month = currentValue.month  || '';
    this.daysList = currentValue.dayList || [];
  }

}

// CALENDAR RESPONSE
export interface ICalendarResponse {
  elements: ICalendar[];
}
