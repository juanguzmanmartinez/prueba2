import { environment } from '@environments/environment';

export enum EFulfillmentVersion {
  fulfillment_v1_0 = '/api/v1.0/fulfillment',
  fulfillment_v2_0 = '/api/v2.0/fulfillment'
}

const API_GATEWAY = `${environment.api_gateway}${EFulfillmentVersion.fulfillment_v1_0}`;
const API_GATEWAY_CALENDAR = `${environment.api_gateway_calendar}${EFulfillmentVersion.fulfillment_v2_0}`;

export class EndpointsParameter {
  public static GET_DRUGSTORE = `${API_GATEWAY}/store`;
  public static GET_DRUGSTORE_BY_SERVICE_TYPE = `${API_GATEWAY}/store/serviceType/`;

  public static GET_CALENDAR = `${API_GATEWAY_CALENDAR}/schedule/calendar`;
  public static PATCH_CALENDAR = `${API_GATEWAY_CALENDAR}/schedule/calendar/days`;
  public static GET_BLOCK_SCHEDULE = `${API_GATEWAY_CALENDAR}/schedule/calendar/detail`;
  public static PATCH_CAPACITY = `${API_GATEWAY_CALENDAR}/schedule/calendar/detail/hours/quantities`;
  public static PATCH_CAPACITY_MONTH_DEFAULT = `${API_GATEWAY_CALENDAR}/schedule/calendar/template/detail/hours/quantities`;
  public static GET_CALENDAR_SERVICE_TYPE = `${API_GATEWAY_CALENDAR}/calendar/template`;
  public static PATCH_CALENDAR_UPDATE = `${API_GATEWAY_CALENDAR}/calendar/template/detail/hours/quantities`;
  public static PATCH_CALENDAR_RANGE_UPDATE = `${API_GATEWAY_CALENDAR}/calendar/detail/hours/quantities`;
  public static GET_CALENDAR_CAPACITIES = `${API_GATEWAY_CALENDAR}/calendar/capacities`;
}
