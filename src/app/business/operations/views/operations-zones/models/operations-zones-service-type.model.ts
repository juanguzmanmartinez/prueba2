import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ZonesDrugstoreServiceType } from './operations-zones-store.model';
import { CStateValue, EState } from '@models/state/state.model';
import { IZoneServiceType } from '@interfaces/zones/zones.interface';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { ZoneBackup } from './operations-zones.model';
import { EChannel } from '@models/channel/channel.model';
import { CZoneServiceTypeSegmentGap } from '../parameters/operations-zones-service-type.parameter';
import { ECompany } from '@models/company/company.model';

export class ZoneServiceType {
  id: string;
  code: EDeliveryServiceType;
  segmentGap: number;
  startHour: number;
  endHour: number;
  state: EState;
  intervalTime: number;
  channel: EChannel;
  company: ECompany;
  //nuevos campos
  timeMeasureUnit: string;
  serviceCost: number;
  serviceCostDefault: number;
  serviceNew: boolean;
  flagServiceType: string;
  orderView: number;
  companyCode: ECompany;

  constructor(iZoneServiceType: IZoneServiceType) {
    this.id = iZoneServiceType.serviceTypeId || null;
    this.code = iZoneServiceType.service || null;
    this.segmentGap = iZoneServiceType.segmentGap || 0;
    this.intervalTime = iZoneServiceType.intervalTime || 0;
    this.startHour =
      DatesHelper.date(
        iZoneServiceType.startHour,
        DATES_FORMAT.hourMinuteSecond
      ).valueOf() || null;
    this.endHour =
      DatesHelper.date(
        iZoneServiceType.endHour,
        DATES_FORMAT.hourMinuteSecond
      ).valueOf() || null;
    this.state = iZoneServiceType.enabled ? EState.active : EState.inactive;
    this.channel = iZoneServiceType.channel || EChannel.default;
    // this.company = iZoneServiceType.company || ECompany.default;

    this.timeMeasureUnit = iZoneServiceType.timeMeasureUnit;
    this.serviceCost = iZoneServiceType.serviceCost;
    this.serviceCostDefault = iZoneServiceType.serviceCostDefault;
    this.serviceNew = iZoneServiceType.serviceNew;
    this.flagServiceType = iZoneServiceType.flagServiceType;
    this.orderView = iZoneServiceType.orderView;
    this.companyCode = iZoneServiceType.companyCode;
  }
}

export class ZoneServiceTypeRegistered {
  serviceType: ZoneServiceType;
  code: EDeliveryServiceType;
  channel: EChannel;
  registered: boolean;
  available: boolean;
  company: ECompany;
  enabled: boolean;

  constructor(
    serviceType: ZoneServiceType,
    storeServiceType: ZonesDrugstoreServiceType,
    serviceTypeCode: EDeliveryServiceType,
    serviceTypeChannel: EChannel,
    serviceTypeCompany: ECompany
  ) {
    this.available = !!storeServiceType && CStateValue[storeServiceType.state];
    this.registered = !!serviceType;
    this.enabled = !!serviceType && CStateValue[serviceType.state];
    this.code = serviceTypeCode;
    this.channel = serviceTypeChannel;
    this.company = serviceTypeCompany;
    this.serviceType = serviceType || null;
    // Exception RET Digital
    // if (
    //   serviceTypeCode === EDeliveryServiceType.ret &&
    //   serviceTypeChannel === EChannel.digital
    // ) {
    if (serviceTypeCode === EDeliveryServiceType.ret) {
      this.available = false;
      this.serviceType = null;

      if (!!storeServiceType) {
        this.serviceType = new ZoneServiceType({} as IZoneServiceType);
        this.serviceType.state = storeServiceType.state;
        this.serviceType.startHour = storeServiceType.startHour;
        this.serviceType.endHour = storeServiceType.endHour;
        this.serviceType.segmentGap =
          CZoneServiceTypeSegmentGap[serviceTypeCode];
      }
    }
  }
}

export class ZonesChannelServiceTypeRegistered {
  channel: EChannel;
  zonesRegistered: ZoneServiceTypeRegistered[];
  constructor(channel: EChannel, zonesRegistered: ZoneServiceTypeRegistered[]) {
    this.channel = channel;
    this.zonesRegistered = zonesRegistered;
  }
}

export class ZoneServiceTypeList {
  amPm: ZoneServiceTypeRegistered;
  express: ZoneServiceTypeRegistered;
  scheduled: ZoneServiceTypeRegistered;
  ret: ZoneServiceTypeRegistered;

  constructor(
    zoneServiceTypeList: ZoneServiceType[],
    zoneStoreServiceTypeList: ZonesDrugstoreServiceType[],
    zoneChannel: EChannel,
    zoneCompany: ECompany
  ) {
    const zoneAmPm: ZoneServiceType = zoneServiceTypeList.find(
      (serviceType) => serviceType.code === EDeliveryServiceType.amPm
    );
    const zoneExpress: ZoneServiceType = zoneServiceTypeList.find(
      (serviceType) => serviceType.code === EDeliveryServiceType.express
    );
    const zoneScheduled: ZoneServiceType = zoneServiceTypeList.find(
      (serviceType) => serviceType.code === EDeliveryServiceType.scheduled
    );
    const zoneRet: ZoneServiceType = zoneServiceTypeList.find(
      (serviceType) => serviceType.code === EDeliveryServiceType.ret
    );

    const zoneStoreAmPm: ZonesDrugstoreServiceType =
      zoneStoreServiceTypeList.find(
        (serviceType) => serviceType.code === EDeliveryServiceType.amPm
      );
    const zoneStoreExpress: ZonesDrugstoreServiceType =
      zoneStoreServiceTypeList.find(
        (serviceType) => serviceType.code === EDeliveryServiceType.express
      );
    const zoneStoreScheduled: ZonesDrugstoreServiceType =
      zoneStoreServiceTypeList.find(
        (serviceType) => serviceType.code === EDeliveryServiceType.scheduled
      );
    const zoneStoreRet: ZonesDrugstoreServiceType =
      zoneStoreServiceTypeList.find(
        (serviceType) => serviceType.code === EDeliveryServiceType.ret
      );

    this.amPm = new ZoneServiceTypeRegistered(
      zoneAmPm,
      zoneStoreAmPm,
      EDeliveryServiceType.amPm,
      zoneChannel,
      zoneCompany
    );
    this.express = new ZoneServiceTypeRegistered(
      zoneExpress,
      zoneStoreExpress,
      EDeliveryServiceType.express,
      zoneChannel,
      zoneCompany
    );
    this.scheduled = new ZoneServiceTypeRegistered(
      zoneScheduled,
      zoneStoreScheduled,
      EDeliveryServiceType.scheduled,
      zoneChannel,
      zoneCompany
    );
    this.ret = new ZoneServiceTypeRegistered(
      zoneRet,
      zoneStoreRet,
      EDeliveryServiceType.ret,
      zoneChannel,
      zoneCompany
    );
  }
}

export class ZoneChannelServiceTypeList {
  channel: EChannel;
  serviceTypeList: ZoneServiceTypeList;
  company: ECompany[];

  constructor(
    zoneServiceTypeList: ZoneServiceType[],
    zoneStoreServiceTypeList: ZonesDrugstoreServiceType[],
    zoneChannel: EChannel,
    zoneCompany: ECompany[]
  ) {
    const zoneChannelServiceTypeList: ZoneServiceType[] =
      zoneServiceTypeList.filter(
        (serviceType: ZoneServiceType) => serviceType.channel === zoneChannel
      );

    this.channel = zoneChannel;
    this.company = zoneCompany;

    this.serviceTypeList = new ZoneServiceTypeList(
      zoneChannelServiceTypeList,
      zoneStoreServiceTypeList,
      zoneChannel,
      zoneCompany[0]
    );
  }
}

export class ZoneCompanyServiceTypeList {
  company: ECompany;
  listCompany: ECompany[];
  serviceTypeList: ZoneServiceTypeList;

  constructor(zoneListCompany: ECompany[], zoneCompany: ECompany) {
    this.company = zoneCompany;
    this.listCompany = zoneListCompany;
  }
}

export class ZoneBackupServiceType {
  id: string;
  code: EDeliveryServiceType;
  segmentGap: number;
  startHour: number;
  endHour: number;
  forceService: EState;

  timeMeasureUnit: string;
  serviceCost: number;
  serviceNew: boolean;
  flagServiceType: string;
  orderView: number;
  companyCode: ECompany;

  constructor(zoneServiceType: ZoneServiceType, forceService: EState) {
    this.id = zoneServiceType.id || null;
    this.code = zoneServiceType.code || null;
    this.segmentGap = zoneServiceType.segmentGap || 0;
    this.startHour = zoneServiceType.startHour || null;
    this.endHour = zoneServiceType.endHour || null;
    this.forceService = forceService || EState.disabled;

    this.timeMeasureUnit = zoneServiceType.timeMeasureUnit;
    this.serviceCost = zoneServiceType.serviceCost;
    this.serviceNew = zoneServiceType.serviceNew;
    this.flagServiceType = zoneServiceType.flagServiceType;
    this.orderView = zoneServiceType.orderView;
    this.companyCode = zoneServiceType.companyCode;
  }
}

export class ZoneBackupServiceTypeRegistered {
  serviceType: ZoneBackupServiceType;
  code: EDeliveryServiceType;

  constructor(
    serviceType: ZoneServiceType,
    forceService: EState,
    serviceTypeCode: EDeliveryServiceType
  ) {
    this.serviceType = serviceType
      ? new ZoneBackupServiceType(serviceType, forceService)
      : null;
    this.code = serviceTypeCode || null;
  }
}

export class ZoneBackupServiceTypeList {
  amPm: ZoneBackupServiceTypeRegistered;
  scheduled: ZoneBackupServiceTypeRegistered;

  constructor(zoneServiceTypeList: ZoneServiceType[], zoneBackup?: ZoneBackup) {
    const zoneDigitalServiceTypeList = zoneServiceTypeList.filter(
      (zoneServiceType) => CStateValue[zoneServiceType.state]
    );
    const zoneAmPm: ZoneServiceType = zoneDigitalServiceTypeList.find(
      (serviceType) => serviceType.code === EDeliveryServiceType.amPm
    );
    const zoneScheduled: ZoneServiceType = zoneDigitalServiceTypeList.find(
      (serviceType) => serviceType.code === EDeliveryServiceType.scheduled
    );
    this.amPm = new ZoneBackupServiceTypeRegistered(
      zoneAmPm,
      zoneBackup?.forceServiceAMPM,
      EDeliveryServiceType.amPm
    );
    this.scheduled = new ZoneBackupServiceTypeRegistered(
      zoneScheduled,
      zoneBackup?.forceServiceSCHEDULED,
      EDeliveryServiceType.scheduled
    );
  }
}
