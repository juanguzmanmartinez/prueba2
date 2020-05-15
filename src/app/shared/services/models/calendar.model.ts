import { isObject } from 'util';
import { isArray } from '../../helpers/objects-equal';

export interface ICalendarRequestParams {
  fulfillmentCenterCode: string; // D88
  serviceTypeCode: string; // RAD, RED
  segmentType: string; // EXPRESS
  channel: string; // DIGITAL, CALL
}

export interface ICalendar {
  year: string;
  month: string;
  daysList: Array<IDayList>;
  monthNumber?: number;
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
  public year: string;
  public month: string;
  public daysList: Array<IDayList>;
  public monthNumber: number;

  constructor(store: ICalendar) {
    const currentValue = isObject(store) ? store : {} as ICalendar;
    this.year = currentValue.year || '';
    this.month = currentValue.month || '';
    this.daysList = currentValue.daysList || [];
    this.monthNumber = currentValue.monthNumber || 0;
  }

}

// CALENDAR RESPONSE
export interface ICalendarResponse {
  elements: ICalendar[];
}

export class CalendarResponse {
  public elements: Calendar[];

  constructor(response: ICalendarResponse) {
    const current = isObject(response) ? response : {} as ICalendarResponse;
    this.elements = isArray(current.elements) ? current.elements.map(e => new Calendar(e)) : [];
  }
}


// blocked day

export interface IDayBlockedRequest {
  fulfillmentCenterCode: string; // D88
  pathVariable?: string;
}

export interface IBlocked {
  day: string;
  check: boolean;
}


export interface IBlockedResponse {
  elements: IBlocked[];
}


export class BlockedDayResponse {
  public elements: IBlocked[];

  constructor(response: IBlockedResponse) {
    const current = isObject(response) ? response : {} as IBlockedResponse;
    this.elements = isArray(current.elements) ? current.elements.map(e => new Blocked(e)) : [];
  }
}


export class Blocked {
  public day: string;
  public check: boolean;

  constructor(store: IBlocked) {
    const currentValue = isObject(store) ? store : {} as IBlocked;
    this.day = currentValue.day || '';
    this.check = currentValue.check || false;
  }

}
