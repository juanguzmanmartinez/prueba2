import { ECompany } from '@models/company/company.model';
import { EChannel } from '@models/channel/channel.model';
import { EState } from '@models/state/state.model';
import { IDrugstore, IDrugstoreDetail } from '@interfaces/drugstores/drugstores.interface';
import { DrugstoreServiceType } from './operations-drugstores-service-type.model';
import { DatesHelper } from '@helpers/dates.helper';
import { DATES_FORMAT } from '@parameters/dates-format.parameters';
import { DrugstoreZone } from './operations-drugstores-zone.model';

export class Drugstore {
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
    serviceTypeList: DrugstoreServiceType[];

    constructor(iDrugstore: IDrugstore) {
        this.id = iDrugstore.legacyId || null;
        this.code = iDrugstore.localCode || '';
        this.name = iDrugstore.name || '';
        this.channelList = iDrugstore.channel || [EChannel.digital, EChannel.call, EChannel.omnichannel];
        this.state = iDrugstore.enabled ? EState.active : EState.inactive;
        this.companyList = iDrugstore.companies ? iDrugstore.companies
            .map(company => company.code) : [];
        this.address = iDrugstore.address || '';
        this.latitude = `${iDrugstore.latitude}`;
        this.longitude = `${iDrugstore.longitude}`;
        this.startHour = DatesHelper.date(iDrugstore.startHour, DATES_FORMAT.hourMinuteSecond).valueOf();
        this.endHour = DatesHelper.date(iDrugstore.endHour, DATES_FORMAT.hourMinuteSecond).valueOf();
        this.serviceTypeList = iDrugstore.services ? iDrugstore.services
            .map(serviceType => new DrugstoreServiceType(serviceType)) : [];
    }
}


export class DrugstoreDetail extends Drugstore {
    groupName: string;
    zoneList: DrugstoreZone[];

    constructor(iDrugstoreDetail: IDrugstoreDetail) {
        super(iDrugstoreDetail);
        this.groupName = iDrugstoreDetail.group || 'San Borja Sur';
        this.zoneList = iDrugstoreDetail.zoneList ? iDrugstoreDetail.zoneList
                .map(drugstoreZone => new DrugstoreZone(drugstoreZone)) :
            [{code: '4', name: 'San Miguel 1', backupZone: 'San Miguel 1', backupAssignedStore: 'San Miguel 1'},
                {code: '36', name: 'San Miguel 1', backupZone: 'San Miguel 1', backupAssignedStore: 'San Miguel 1'},
                {code: '46', name: 'San Borja Sur', backupZone: 'San Miguel 1', backupAssignedStore: 'San Miguel 1'}];
    }
}
