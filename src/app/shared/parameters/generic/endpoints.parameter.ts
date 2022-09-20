import { environment } from '@environments/environment';

export const API_GATEWAY = `${environment.api_gateway}`;
export const API_GATEWAY_ORDER = `${environment.api_gateway_order}`;
export const API_GATEWAY_AUTH = `${environment.api_gateway_auth}`;
export const DATA_STUDIO = `${environment.dataStudio}`;
export class EndpointsParameter {
  public static AUTH_TOKEN = `${API_GATEWAY_AUTH}/oauth/token`;
  public static AUTH_SEND_CODE = `${API_GATEWAY_AUTH}/restorepassword/email`;
  public static AUTH_VALID_CODE = `${API_GATEWAY_AUTH}/restorepassword/code`;
  public static AUTH_RESET_PASSWORD = `${API_GATEWAY_AUTH}/restorepassword/change`;
  public static AUTH_UPDATE_PASSWORD = `${API_GATEWAY_AUTH}/user/changepassword`;

  public static USER_LIST = `assets/user-list.json`;

  public static DRUGSTORE_LIST = `${API_GATEWAY}/fulfillment/store`;
  public static DRUGSTORE_BY_SERVICE_TYPE = `${API_GATEWAY}/fulfillment/store/servicetype/`;
  public static DRUGSTORE_SERVICE_TYPE = `${API_GATEWAY}/store-service-type`;

  public static CALENDAR_CAPACITIES = `${API_GATEWAY}/fulfillment/calendar/capacities`;
  public static CALENDAR_RANGE_UPDATE = `${API_GATEWAY}/fulfillment/calendar/detail/hours/quantities`;
  public static CALENDAR_SERVICE_TYPE = `${API_GATEWAY}/fulfillment/calendar/template`;
  public static CALENDAR_UPDATE = `${API_GATEWAY}/fulfillment/calendar/template/detail/hours/quantities`;

  public static ZONE_LIST = `${API_GATEWAY}/zone`;
  public static ZONE_DETAIL = `${API_GATEWAY}/operations/zone`;
  public static ZONE_SERVICE_TYPE = `${API_GATEWAY}/zone-service-type`;
  public static ZONE_BACKUP = `${API_GATEWAY}/operations/zone/zone-backup`;
  public static ZONE_CHANNEL_LIST = `${API_GATEWAY}/zone/channel`;

  public static DRUGSTORE_LIST_REPORT = `${DATA_STUDIO}/page/fClLC`;
  public static DRUGSTORE_DETAIL_REPORT = `${DATA_STUDIO}/page/XElLC`;

  public static ORDER_LIST = `${API_GATEWAY_ORDER}/order/info`;
  public static ORDER_DETAIL = `${API_GATEWAY_ORDER}/order/detail`;
  public static ORDER_STATUS = `${API_GATEWAY_ORDER}/order/status/groupByName`;
  public static ORDER_REPORT = `${API_GATEWAY_ORDER}/order/selected`;

  public static DEPARTAMENTS = `${API_GATEWAY}/ubigeo/departments`;
  public static PROVINCES = `${API_GATEWAY}/ubigeo/provinces`;
  public static DISTRICS = `${API_GATEWAY}/ubigeo/districts`;
  public static STORES_LIST = `${API_GATEWAY}/ubigeo/stores`;

  public static CAPACITY_TEMPLATE = `${API_GATEWAY}/fulfillment/store/capacity/template`;
  public static PTACH_CAPACITIES = `${API_GATEWAY}/fulfillment/store/capacity/update`;
}
