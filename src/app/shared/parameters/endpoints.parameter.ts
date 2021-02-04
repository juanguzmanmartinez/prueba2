import { environment } from '@environments/environment';

const API_GATEWAY = `${environment.api_gateway}`;
const API_GATEWAY_CALENDAR = `${environment.api_gateway_calendar}`;
const API_GATEWAY_AUTH = `${environment.api_gateway_auth}`;

export class EndpointsParameter {
  public static AUTH_TOKEN = `${API_GATEWAY_AUTH}/oauth/token`;

  public static GET_DRUGSTORE = `${API_GATEWAY}/fulfillment/store`;
  public static GET_DRUGSTORE_BY_SERVICE_TYPE = `${API_GATEWAY}/fulfillment/store/serviceType/`;

  public static GET_CALENDAR_SERVICE_TYPE = `${API_GATEWAY_CALENDAR}/fulfillment/calendar/template`;
  public static PATCH_CALENDAR_UPDATE = `${API_GATEWAY_CALENDAR}/fulfillment/calendar/template/detail/hours/quantities`;
  public static PATCH_CALENDAR_RANGE_UPDATE = `${API_GATEWAY_CALENDAR}/fulfillment/calendar/detail/hours/quantities`;
  public static GET_CALENDAR_CAPACITIES = `${API_GATEWAY_CALENDAR}/fulfillment/calendar/capacities`;
}
