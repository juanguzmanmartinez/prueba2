import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { EState } from '@models/state/state.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { IDrugstoreServiceType } from '@interfaces/drugstores/drugstores.interface';
import { EPaymentMethod } from '@models/payment-method/payment-method.model';

export class StoreServiceType {
    id: string;
    code: EDeliveryServiceType;
    startHour: number;
    endHour: number;
    state: EState;
    intervalTime: number;
    paymentMethodList: EPaymentMethod[];

    constructor(iStoreServiceType: IDrugstoreServiceType) {
        this.id = iStoreServiceType.id || null;
        this.code = iStoreServiceType.code || null;
        this.startHour = DatesHelper.date(iStoreServiceType.startHour, DATES_FORMAT.hourMinuteSecond).valueOf() || null;
        this.endHour = DatesHelper.date(iStoreServiceType.endHour, DATES_FORMAT.hourMinuteSecond).valueOf() || null;
        this.state = iStoreServiceType.enabled ? EState.active : EState.inactive;
        this.paymentMethodList = [EPaymentMethod.online, EPaymentMethod.pos, EPaymentMethod.cash];
        this.intervalTime = 125;
    }
}


export class StoreServiceTypeRegistered {
    serviceType: StoreServiceType;
    registered: boolean;
    code: EDeliveryServiceType;

    constructor(
        serviceType: StoreServiceType,
        serviceTypeCode: EDeliveryServiceType
    ) {
        this.registered = !!serviceType;
        this.serviceType = serviceType || null;
        this.code = serviceTypeCode;
    }
}

export class StoreServiceTypeList {
    amPm: StoreServiceTypeRegistered;
    express: StoreServiceTypeRegistered;
    scheduled: StoreServiceTypeRegistered;
    ret: StoreServiceTypeRegistered;

    constructor(storeServiceTypeList: StoreServiceType[]) {
        const storeAmPm: StoreServiceType = storeServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.amPm);
        const storeExpress: StoreServiceType = storeServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.express);
        const storeScheduled: StoreServiceType = storeServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.scheduled);
        const storeRet: StoreServiceType = storeServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.ret);
        this.amPm = new StoreServiceTypeRegistered(storeAmPm, EDeliveryServiceType.amPm);
        this.express = new StoreServiceTypeRegistered(storeExpress, EDeliveryServiceType.express);
        this.scheduled = new StoreServiceTypeRegistered(storeScheduled, EDeliveryServiceType.scheduled);
        this.ret = new StoreServiceTypeRegistered(storeRet, EDeliveryServiceType.ret);
    }

}
