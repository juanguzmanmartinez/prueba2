import { Store } from './operations-stores.model';
import { CCompanyName } from '@models/company/company.model';
import { CChannelName } from '@models/channel/channel.model';
import { CStateCode, CStateName, CStateValue, EState } from '@models/state/state.model';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { StoreServiceType } from './operations-stores-service-type.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';

export const ExportStoreListFileName = 'lista-locales';
export const ExportStoreListHeader = [
    'Marca', 'Código', 'Id', 'Nombre', 'Dirección', 'Latitude',
    'Longitude', 'Hora inicio', 'Hora fin', 'Canal', 'Estado',
    'AM/PM', 'Hora inicio AM/PM', 'Hora fin AM/PM', 'Express',
    'Hora inicio Express', 'Hora fin Express', 'Programado', 'Hora inicio Programado', 'Hora fin Programado'];


export class ExportStoreList {
    data: Array<ExportStore>;

    constructor(storeList: Array<Store>) {
        this.data = storeList.map((store: Store) => {
            const amPm: StoreServiceType = store.serviceTypeList
                .find((serviceType) => serviceType.code === EDeliveryServiceType.amPm && CStateValue[serviceType.state]);
            const express: StoreServiceType = store.serviceTypeList
                .find((serviceType) => serviceType.code === EDeliveryServiceType.express && CStateValue[serviceType.state]);
            const scheduled: StoreServiceType = store.serviceTypeList
                .find((serviceType) => serviceType.code === EDeliveryServiceType.scheduled && CStateValue[serviceType.state]);

            return {
                company: store.companyList.map(company => CCompanyName[company]).join(' - '),
                code: store.code || '',
                id: store.id || '',
                name: store.name || '',
                address: store.address || '',
                latitude: store.latitude || '',
                longitude: store.longitude || '',
                startHour: store.startHour ? DatesHelper.date(store.startHour, DATES_FORMAT.millisecond)
                    .format(DATES_FORMAT.hourMinute24Hours) : '',
                endHour: store.endHour ? DatesHelper.date(store.endHour, DATES_FORMAT.millisecond)
                    .format(DATES_FORMAT.hourMinute24Hours) : '',
                channel: store.channelList.map(channel => CChannelName[channel]).join(' - '),
                state: CStateName[store.state](),

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
            } as ExportStore;
        });
    }

}

class ExportStore {
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
