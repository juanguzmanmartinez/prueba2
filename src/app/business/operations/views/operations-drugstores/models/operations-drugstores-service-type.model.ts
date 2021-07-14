import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { EState } from '@models/state/state.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { IDrugstoreServiceType } from '@interfaces/drugstores/drugstores.interface';
import { EPaymentMethod } from '@models/payment-method/payment-method.model';

export class DrugstoreServiceType {
    id: string;
    code: EDeliveryServiceType;
    startHour: number;
    endHour: number;
    state: EState;
    intervalTime: number;
    paymentMethodList: EPaymentMethod[];

    constructor(iDrugstoreServiceType: IDrugstoreServiceType) {
        this.id = iDrugstoreServiceType.id || null;
        this.code = iDrugstoreServiceType.code || null;
        this.startHour = DatesHelper.date(iDrugstoreServiceType.startHour, DATES_FORMAT.hourMinuteSecond).valueOf() || null;
        this.endHour = DatesHelper.date(iDrugstoreServiceType.endHour, DATES_FORMAT.hourMinuteSecond).valueOf() || null;
        this.state = iDrugstoreServiceType.enabled ? EState.active : EState.inactive;
        this.paymentMethodList = [EPaymentMethod.online, EPaymentMethod.pos, EPaymentMethod.cash];
        this.intervalTime = 125;
    }
}


export class DrugstoreServiceTypeRegistered {
    serviceType: DrugstoreServiceType;
    registered: boolean;
    code: EDeliveryServiceType;

    constructor(
        serviceType: DrugstoreServiceType,
        serviceTypeCode: EDeliveryServiceType
    ) {
        this.registered = !!serviceType;
        this.serviceType = serviceType || null;
        this.code = serviceTypeCode;
    }
}

export class DrugstoreServiceTypeList {
    amPm: DrugstoreServiceTypeRegistered;
    express: DrugstoreServiceTypeRegistered;
    scheduled: DrugstoreServiceTypeRegistered;
    ret: DrugstoreServiceTypeRegistered;

    constructor(drugstoreServiceTypeList: DrugstoreServiceType[]) {
        const drugstoreAmPm: DrugstoreServiceType = drugstoreServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.amPm);
        const drugstoreExpress: DrugstoreServiceType = drugstoreServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.express);
        const drugstoreScheduled: DrugstoreServiceType = drugstoreServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.scheduled);
        const drugstoreRet: DrugstoreServiceType = drugstoreServiceTypeList
            .find((serviceType) => serviceType.code === EDeliveryServiceType.ret);
        this.amPm = new DrugstoreServiceTypeRegistered(drugstoreAmPm, EDeliveryServiceType.amPm);
        this.express = new DrugstoreServiceTypeRegistered(drugstoreExpress, EDeliveryServiceType.express);
        this.scheduled = new DrugstoreServiceTypeRegistered(drugstoreScheduled, EDeliveryServiceType.scheduled);
        this.ret = new DrugstoreServiceTypeRegistered(drugstoreRet, EDeliveryServiceType.ret);
    }

}
