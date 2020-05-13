import { environment } from 'src/environments/environment';

export class ENDPOINTS {
  public static GET_DRUGSTORE = `${environment.api_gateway}/store `;
  public static GET_CALENDAR = `${environment.api_gateway_calendar}/schedule/calendar`;
}
