export interface ILocal {
    localCode: string;
    name: string;
    description: string;
    position: number;
    address: string;
    wmsEnabled: boolean;
    companies: Array<ILocalCompany>;
    legacyId: number;
    latitude: number;
    longitude: number;
    inkaVentaId: string;
    startHour: string;
    endHour: string;
    drugstoreWareHouseId: number;
    localType: string;
    services: Array<ILocalService>;
}

export interface ILocalService {
    code: string;
    service: string;
    shortName: string;
    enabled: boolean;
}

export interface ILocalCompany {
    company: string;
    code: string;
}

export class Local {
    localCode: string;
    name: string;
    description: string;
    position: number;
    address: string;
    wmsEnabled: boolean;
    companies: Array<ILocalCompany>;
    legacyId: number;
    latitude: number;
    longitude: number;
    inkaVentaId: string;
    startHour: string;
    endHour: string;
    drugstoreWareHouseId: number;
    localType: string;
    services: Array<ILocalService>;
}
