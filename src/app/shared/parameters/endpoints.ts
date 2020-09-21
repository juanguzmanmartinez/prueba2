import { environment } from 'src/environments/environment';

export const VERSIONS = {
  'fulfillment_v1.0': '/api/v1.0/fulfillment',
  'fulfillment_v2.0': '/api/v2.0/fulfillment',
};

const API_GATEWAY = `${environment.api_gateway}${VERSIONS['fulfillment_v1.0']}`;
const API_GATEWAY_CALENDAR = `${environment.api_gateway_calendar}${VERSIONS['fulfillment_v2.0']}`;

export class ENDPOINTS {
  public static GET_DRUGSTORE = `${API_GATEWAY}/store`;
  public static GET_CALENDAR = `${API_GATEWAY_CALENDAR}/schedule/calendar`;
  public static PATCH_CALENDAR = `${API_GATEWAY_CALENDAR}/schedule/calendar/days`;
  public static GET_BLOCKSCHEDULE = `${API_GATEWAY_CALENDAR}/schedule/calendar/detail`;
  public static PATCH_CAPACITY = `${API_GATEWAY_CALENDAR}/schedule/calendar/detail/hours/quantities`;
  public static PATCH_CAPACITY_MONTH_DEFAULT = `${API_GATEWAY_CALENDAR}/schedule/calendar/template/detail/hours/quantities`;
  public static GET_LOCAL = `${API_GATEWAY}/store/serviceType/`;
  public static GET_TYPESERVICE = `${API_GATEWAY_CALENDAR}/calendar/template`;
  public static PATCH_CALENDAR_UPDATE =  `${API_GATEWAY_CALENDAR}/calendar/template/detail/hours/quantities`;
  public static PATCH_CALENDAR_RANGE_UPDATE = `${API_GATEWAY_CALENDAR}/calendar/detail/hours/quantities`;
}
