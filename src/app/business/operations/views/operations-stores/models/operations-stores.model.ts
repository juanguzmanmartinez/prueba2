import { ECompany } from '@models/company/company.model';
import { EChannel } from '@models/channel/channel.model';
import { EState } from '@models/state/state.model';
import { IStore, IStoreDetail } from '@interfaces/stores/stores.interface';
import { StoreServiceType } from './operations-stores-service-type';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { EPaymentMethod } from '@models/payment-method/payment-method.model';
import { StoresZone } from './operations-stores-zone.model';

export class Store {
    code: string;
    name: string;
    state: EState;
    channelList: EChannel[];
    companyList: ECompany[];

    constructor(iStore: IStore) {
        this.code = iStore.localCode || null;
        this.name = iStore.name || null;
        this.channelList = iStore.channel || [EChannel.digital, EChannel.call, EChannel.omnichannel];
        this.state = iStore.enabled ? EState.active : EState.close;
        this.companyList = iStore.companies ? iStore.companies
            .map(company => company.code) : [];
    }
}


export class StoreDetail extends Store {
    address: string;
    latitude: string;
    longitude: string;
    startHour: number;
    endHour: number;
    serviceTypeList: StoreServiceType[];
    groupName: string;
    paymentMethodList: EPaymentMethod[];
    zoneList: StoresZone[];

    constructor(iStoreDetail: IStoreDetail) {
        super(iStoreDetail);
        this.address = iStoreDetail.address || 'Av. Guardia Civil 244, San Borja';
        this.latitude = `${iStoreDetail.latitude}`;
        this.longitude = `${iStoreDetail.longitude}`;
        this.startHour = DatesHelper.date(iStoreDetail.startHour, DATES_FORMAT.hourMinuteSecond).valueOf();
        this.endHour = DatesHelper.date(iStoreDetail.endHour, DATES_FORMAT.hourMinuteSecond).valueOf();
        this.serviceTypeList = iStoreDetail.services ? iStoreDetail.services
            .map(serviceType => new StoreServiceType(serviceType)) : [];
        this.groupName = iStoreDetail.group || 'San Borja Sur';
        this.paymentMethodList = iStoreDetail.paymentMethodList || [EPaymentMethod.pos, EPaymentMethod.cash, EPaymentMethod.online];
        this.zoneList = iStoreDetail.zoneList ? iStoreDetail.zoneList
            .map(storesZone => new StoresZone(storesZone)) : [{code: 'B03', name: 'San Miguel 1'}, {code: 'B03', name: 'San Miguel 1'}, {code: 'B03', name: 'San Borja Sur'}];
    }
}
