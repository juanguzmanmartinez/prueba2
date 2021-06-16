import { IDrugstore, IDrugstoreServiceType } from '@interfaces/drugstores/drugstores.interface';
import { EState } from '@models/state/state.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { EDeliveryType } from '@models/service-type/delivery-service-type.model';

export class ZonesStore {
    name: string;
    code: string;
    serviceTypeList: ZonesStoreServiceType[];
    deliveryType: EDeliveryType;

    constructor(iStore: IDrugstore) {
        this.code = iStore.localCode || null;
        this.name = iStore.name || null;
        this.deliveryType = iStore.localType || null;
        this.serviceTypeList = iStore.services?.length ? iStore.services
            .map((serviceType) => new ZonesStoreServiceType(serviceType)) : [];
    }
}

export class ZonesStoreServiceType {
    code: string;
    state: EState;
    startHour: number;
    endHour: number;

    constructor(iStoreService: IDrugstoreServiceType) {
        this.code = iStoreService.code || null;
        this.state = iStoreService.enabled ? EState.active : EState.inactive;
        this.startHour = DatesHelper.date(iStoreService.startHour, DATES_FORMAT.hourMinuteSecond).valueOf() || null;
        this.endHour = DatesHelper.date(iStoreService.endHour, DATES_FORMAT.hourMinuteSecond).valueOf() || null;
    }

}
