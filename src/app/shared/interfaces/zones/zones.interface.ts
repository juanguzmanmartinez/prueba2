import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { EChannel } from '@models/channel/channel.model';
import { ECompany } from '@models/company/company.model';
import { IDrugstore } from '@interfaces/drugstores/drugstores.interface';
import { EStateSetting } from '@models/state/state.model';

export interface IZoneServiceType {
  id: string;
  serviceTypeId: string;
  serviceTypeCode: EDeliveryServiceType;
  segmentGap: number;
  startHour: string;
  endHour: string;
  enabled: boolean;
  intervalTime: number;
  channel: EChannel;
  companyCode: ECompany;
  //nuevos campos
  timeMeasureUnit: string;
  serviceCost: number;
  serviceCostDefault: number;
  serviceNew: boolean;
  flagServiceType: string;
  ompanyCode: string;
  orderView: number;
  service: EDeliveryServiceType;
}

// export interface IZoneServiceTypeUpdate {
//   enabled: boolean;
//   startHour: string;
//   endHour: string;
//   segmentGap: number;
//   channel: EChannel;
//   companyCode: ECompany;
// }

export interface IZoneServiceTypeUpdate {
  enabled: boolean;
  startHour: string;
  endHour: string;
  segmentGap: number;

  zoneId: string;
  service: string;
  serviceTypeId: string;
  serviceCost: number;
  intervalTime: number;
}

export interface IZoneServiceTypeRegister {
  zoneId: string;
  serviceTypeCode: string;
  startHour: string;
  endHour: string;
  segmentGap: string;
  channel: EChannel;
  companyCode: ECompany;
}

export interface IZone {
  id: string;
  idZone: string;
  name: string;
  enabled: boolean;
  fulfillmentCenterCode: string;
  serviceType: IZoneServiceType[];
  storeCenter: IDrugstore;
  channel: EChannel[];
  companyCode: ECompany[];
  backUpZone: boolean;
}

export interface IZoneDetail extends IZone {
  zoneType: string;
  companyCode: ECompany[];
  zoneBackup: IZoneBackUp;
  backUpZone: boolean;
}

export interface IZoneDetailUpdate {
  fulfillmentCenterCode: string;
  enabled: boolean;
  backUpZone: boolean;
  zoneType: string;
  deliveryServiceId: number;
  channel: EChannel[];
  companyCode: ECompany[];
}

export interface IZoneBackUp {
  zoneId: string;
  idZone: number;
  name: string;
  preferableLocalBackupToShow: EStateSetting;
  forceServiceAMPM: EStateSetting;
  forceServicePROG: EStateSetting;
  fulfillmentCenterCode: string;
  fulfillmentCenterName: string;
  serviceType: IZoneServiceType[];
}

export interface IZoneBackupUpdate {
  zoneId: string;
  preferableLocalBackupToShow: EStateSetting;
  forceServiceAMPM: EStateSetting;
  forceServicePROG: EStateSetting;
  serviceTypeId: string;
  serviceCost: number;
  service: string;
}
