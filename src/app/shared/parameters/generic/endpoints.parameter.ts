import { environment } from '@environments/environment';

export const API_GATEWAY = `${environment.api_gateway}`;
export const API_GATEWAY_AUTH = `${environment.api_gateway_auth}`;
export const DATA_STUDIO = `${environment.dataStudio}`;

export class EndpointsParameter {
    public static AUTH_TOKEN = `${API_GATEWAY_AUTH}/oauth/token`;
    public static AUTH_SEND_CODE = `${API_GATEWAY_AUTH}/restorepassword/email`;
    public static AUTH_VALID_CODE = `${API_GATEWAY_AUTH}/restorepassword/code`;
    public static AUTH_RESET_PASSWORD = `${API_GATEWAY_AUTH}/restorepassword/change`;
    public static AUTH_UPDATE_PASSWORD = `${API_GATEWAY_AUTH}/user/changepassword`;

    public static GET_DRUGSTORE = `${API_GATEWAY}/fulfillment/store`;
    public static GET_DRUGSTORE_BY_SERVICE_TYPE = `${API_GATEWAY}/fulfillment/store/servicetype/`;
    public static STORE_SERVICE_TYPE = `${API_GATEWAY}/store-service-type`;

    public static GET_CALENDAR_SERVICE_TYPE = `${API_GATEWAY}/fulfillment/calendar/template`;
    public static PATCH_CALENDAR_UPDATE = `${API_GATEWAY}/fulfillment/calendar/template/detail/hours/quantities`;
    public static PATCH_CALENDAR_RANGE_UPDATE = `${API_GATEWAY}/fulfillment/calendar/detail/hours/quantities`;
    public static GET_CALENDAR_CAPACITIES = `${API_GATEWAY}/fulfillment/calendar/capacities`;

    public static GET_ZONES = `${API_GATEWAY}/zone`;
    public static ZONES_SERVICE_TYPE = `${API_GATEWAY}/zone-service-type`;
    public static ZONE_BACKUP = `${API_GATEWAY}/zone/zone-backup`;
    public static GET_ZONES_CHANNEL = `${API_GATEWAY}/zone/channel`;

    public static DRUGSTORE_LIST_REPORT = `${DATA_STUDIO}/page/fClLC`;
    public static DRUGSTORE_DETAIL_REPORT = `${DATA_STUDIO}/page/XElLC`;
}
