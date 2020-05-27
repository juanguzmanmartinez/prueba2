import { environment } from 'src/environments/environment';

export class ENDPOINTS {
  public static GET_DRUGSTORE = `${environment.api_gateway}/store `;
  public static GET_CALENDAR = `${environment.api_gateway_calendar}/schedule/calendar`;
  public static PATCH_CALENDAR = `${environment.api_gateway_calendar}/schedule/calendar/days`;
  public static GET_BLOCKSCHEDULE = `${environment.api_gateway_calendar}/schedule/calendar/detail`;
  public static PATCH_CAPACITY = `${environment.api_gateway_calendar}/schedule/calendar/detail/hours/quantities`;
}
