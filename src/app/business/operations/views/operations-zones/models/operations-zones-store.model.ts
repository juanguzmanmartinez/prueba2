import { IDrugstore, IDrugstoreServiceType } from '@interfaces/drugstores/drugstores.interface';
import { EState } from '@models/state/state.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { EDeliveryType } from '@models/service-type/delivery-service-type.model';

export class ZonesDrugstore {
  name: string;
  code: string;
  serviceTypeList: ZonesDrugstoreServiceType[];
  deliveryType: EDeliveryType;

  constructor(iDrugstore: IDrugstore) {
    this.code = iDrugstore.localCode || null;
    this.name = iDrugstore.name || null;
    this.deliveryType = iDrugstore.localType || null;
    this.serviceTypeList = iDrugstore.services?.length ? iDrugstore.services
      .map((serviceType) => new ZonesDrugstoreServiceType(serviceType)) : [];
  }
}

export class ZonesDrugstoreServiceType {
  code: string;
  state: EState;
  startHour: number;
  endHour: number;

  constructor(iDrugstoreServiceType: IDrugstoreServiceType) {
    this.code = iDrugstoreServiceType.code || null;
    this.state = iDrugstoreServiceType.enabled ? EState.active : EState.inactive;
    this.startHour = DatesHelper.date(iDrugstoreServiceType.startHour, DATES_FORMAT.hourMinuteSecond).valueOf() || null;
    this.endHour = DatesHelper.date(iDrugstoreServiceType.endHour, DATES_FORMAT.hourMinuteSecond).valueOf() || null;
  }

}
