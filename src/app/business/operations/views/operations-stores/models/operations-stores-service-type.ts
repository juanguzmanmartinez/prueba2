import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { EState } from '@models/state/state.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { IStoreServiceType } from '@interfaces/stores/stores.interface';

export class StoreServiceType {
    id: string;
    code: EDeliveryServiceType;
    startHour: number;
    endHour: number;
    state: EState;
    paymentMethodList: string[];
    intervalTime: number;

    constructor(iStoreServiceType: IStoreServiceType) {
        this.id = iStoreServiceType.id || null;
        this.code = iStoreServiceType.code || null;
        this.intervalTime = iStoreServiceType.intervalTime || 0;
        this.startHour = DatesHelper.date(iStoreServiceType.startHour, DATES_FORMAT.hourMinuteSecond).valueOf() || null;
        this.endHour = DatesHelper.date(iStoreServiceType.endHour, DATES_FORMAT.hourMinuteSecond).valueOf() || null;
        this.state = iStoreServiceType.enabled ? EState.active : EState.inactive;
    }
}
