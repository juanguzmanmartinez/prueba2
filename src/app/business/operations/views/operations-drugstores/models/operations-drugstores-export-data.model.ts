import { Drugstore } from './operations-drugstores.model';
import { CCompanyName } from '@models/company/company.model';
import { CChannelName } from '@models/channel/channel.model';
import { CStateCode, CStateName, CStateValue, EState } from '@models/state/state.model';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { DrugstoreServiceType } from './operations-drugstores-service-type.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';

export const ExportStoreListFileName = 'lista-locales';
export const ExportStoreListHeader = [
  'Marca', 'Código', 'Id', 'Nombre', 'Dirección', 'Latitude',
  'Longitude', 'Hora inicio', 'Hora fin', 'Canal', 'Estado',
  'AM/PM', 'Hora inicio AM/PM', 'Hora fin AM/PM', 'Express',
  'Hora inicio Express', 'Hora fin Express', 'Programado', 'Hora inicio Programado', 'Hora fin Programado'];

export class ExportDrugstoreList {
  data: Array<ExportDrugstore>;

  constructor(drugstoreList: Array<Drugstore>) {
    this.data = drugstoreList.map((drugstore: Drugstore) => {
      const amPm: DrugstoreServiceType = drugstore.serviceTypeList
        .find((serviceType) => serviceType.code === EDeliveryServiceType.amPm && CStateValue[serviceType.state]);
      const express: DrugstoreServiceType = drugstore.serviceTypeList
        .find((serviceType) => serviceType.code === EDeliveryServiceType.express && CStateValue[serviceType.state]);
      const scheduled: DrugstoreServiceType = drugstore.serviceTypeList
        .find((serviceType) => serviceType.code === EDeliveryServiceType.scheduled && CStateValue[serviceType.state]);

      return {
        company: drugstore.companyList.map(company => CCompanyName[company]).join(' - '),
        code: drugstore.code || '',
        id: drugstore.id || '',
        name: drugstore.name || '',
        address: drugstore.address || '',
        latitude: drugstore.latitude || '',
        longitude: drugstore.longitude || '',
        startHour: drugstore.startHour ? DatesHelper.date(drugstore.startHour, DATES_FORMAT.millisecond)
          .format(DATES_FORMAT.hourMinute24Hours) : '',
        endHour: drugstore.endHour ? DatesHelper.date(drugstore.endHour, DATES_FORMAT.millisecond)
          .format(DATES_FORMAT.hourMinute24Hours) : '',
        channel: drugstore.channelList.map(channel => CChannelName[channel]).join(' - '),
        state: CStateName[drugstore.state](),

        amPm: amPm ? CStateCode[amPm.state] : CStateCode[EState.inactive],
        amPmStartHour: amPm ? DatesHelper.date(amPm.startHour, DATES_FORMAT.millisecond)
          .format(DATES_FORMAT.hourMinute24Hours) : '',
        amPmEndHour: amPm ? DatesHelper.date(amPm.endHour, DATES_FORMAT.millisecond)
          .format(DATES_FORMAT.hourMinute24Hours) : '',

        express: express ? CStateCode[express.state] : CStateCode[EState.inactive],
        expressStartHour: express ? DatesHelper.date(express.startHour, DATES_FORMAT.millisecond)
          .format(DATES_FORMAT.hourMinute24Hours) : '',
        expressEndHour: express ? DatesHelper.date(express.endHour, DATES_FORMAT.millisecond)
          .format(DATES_FORMAT.hourMinute24Hours) : '',

        scheduled: scheduled ? CStateCode[scheduled.state] : CStateCode[EState.inactive],
        scheduledStartHour: scheduled ? DatesHelper.date(scheduled.startHour, DATES_FORMAT.millisecond)
          .format(DATES_FORMAT.hourMinute24Hours) : '',
        scheduledEndHour: scheduled ? DatesHelper.date(scheduled.endHour, DATES_FORMAT.millisecond)
          .format(DATES_FORMAT.hourMinute24Hours) : '',
      } as ExportDrugstore;
    });
  }
}

class ExportDrugstore {
  company: string;
  code: string;
  id: number;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  startHour: string;
  endHour: string;
  channel: string;
  state: string;

  amPm: string;
  amPmStartHour: string;
  amPmEndHour: string;

  express: string;
  expressStartHour: string;
  expressEndHour: string;

  scheduled: string;
  scheduledStartHour: string;
  scheduledEndHour: string;
}
