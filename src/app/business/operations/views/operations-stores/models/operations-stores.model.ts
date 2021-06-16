import { ECompany } from '@models/company/company.model';
import { EChannel } from '@models/channel/channel.model';
import { EState } from '@models/state/state.model';
import { IDrugstore, IDrugstoreDetail } from '@interfaces/drugstores/drugstores.interface';
import { StoreServiceType } from './operations-stores-service-type.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { StoresZone } from './operations-stores-zone.model';

export class Store {
    id: number;
    code: string;
    name: string;
    state: EState;
    channelList: EChannel[];
    companyList: ECompany[];
    address: string;
    latitude: string;
    longitude: string;
    startHour: number;
    endHour: number;
    serviceTypeList: StoreServiceType[];

    constructor(iStore: IDrugstore) {
        this.id = iStore.legacyId || null;
        this.code = iStore.localCode || '';
        this.name = iStore.name || '';
        this.channelList = iStore.channel || [EChannel.digital, EChannel.call, EChannel.omnichannel];
        this.state = iStore.enabled ? EState.active : EState.inactive;
        this.companyList = iStore.companies ? iStore.companies
            .map(company => company.code) : [];
        this.address = iStore.address || '';
        this.latitude = `${iStore.latitude}`;
        this.longitude = `${iStore.longitude}`;
        this.startHour = DatesHelper.date(iStore.startHour, DATES_FORMAT.hourMinuteSecond).valueOf();
        this.endHour = DatesHelper.date(iStore.endHour, DATES_FORMAT.hourMinuteSecond).valueOf();
        this.serviceTypeList = iStore.services ? iStore.services
            .map(serviceType => new StoreServiceType(serviceType)) : [];
    }
}


export class StoreDetail extends Store {
    groupName: string;
    zoneList: StoresZone[];

    constructor(iStoreDetail: IDrugstoreDetail) {
        super(iStoreDetail);
        this.groupName = iStoreDetail.group || 'San Borja Sur';
        this.zoneList = iStoreDetail.zoneList ? iStoreDetail.zoneList
                .map(storesZone => new StoresZone(storesZone)) :
            [{code: '4', name: 'San Miguel 1', backupZone: 'San Miguel 1', backupAssignedStore: 'San Miguel 1'},
                {code: '36', name: 'San Miguel 1', backupZone: 'San Miguel 1', backupAssignedStore: 'San Miguel 1'},
                {code: '46', name: 'San Borja Sur', backupZone: 'San Miguel 1', backupAssignedStore: 'San Miguel 1'}];
    }
}
