import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { filter, map, take } from 'rxjs/operators';
import { EndpointsParameter } from '@parameters/generic/endpoints.parameter';
import { isArray, isObject } from '@helpers/objects-equal.helper';
import { GenericService } from '../generic/generic.service';
import { Observable, of } from 'rxjs';
import { EChannel } from '@models/channel/channel.model';
import { EDeliveryServiceType } from '@models/service-type/delivery-service-type.model';
import { ILocalGroup, ILocalParams, IServiceType, IStore, IStoreDetail } from '@interfaces/stores/stores.interface';


@Injectable()
export class StoresClientService {

    private readonly STORE_LIST = EndpointsParameter.GET_DRUGSTORE;
    private readonly STORE_BY_SERVICE_TYPE = EndpointsParameter.GET_DRUGSTORE_BY_SERVICE_TYPE;
    private readonly TYPE_SERVICE_ENDPOINT = EndpointsParameter.GET_CALENDAR_SERVICE_TYPE;

    constructor(
        private genericService: GenericService,
    ) {
    }

    public getStoreList(): Observable<IStore[]> {
        // return this.genericService.genericGet<IStore[]>(this.STORE_LIST)
        return of(STORE_LIST as any[])
            .pipe(
                take(1),
                map((response: IStore[]) => {
                    return isArray(response) ? response : [];
                }));
    }

    public getStoreDetail(storeCode: string): Observable<IStoreDetail> {
        return of(STORE_LIST as IStoreDetail[])
            .pipe(
                take(1),
                filter((iStoreList: IStoreDetail[]) => {
                    return !!iStoreList.find((store) => store.localCode === storeCode);
                }),
                map((iStoreList: IStoreDetail[]) => {
                    return iStoreList.length ? iStoreList[0] : null;
                }),
                map((response: IStoreDetail) => {
                    return isObject(response) ? response : null;
                }));
    }

    public getLocalByServiceTypeClient$(serviceType: EDeliveryServiceType): Observable<IStore[]> {
        const endpoint = `${this.STORE_BY_SERVICE_TYPE}${serviceType}`;
        return this.genericService.genericGet<IStore[]>(endpoint)
            .pipe(
                take(1),
                map((response) => {
                    return isArray(response) ? response : [];
                }));
    }

    public getLocalGroupByServiceTypeClient$(serviceType: EDeliveryServiceType): Observable<ILocalGroup[]> {
        const httpParams = new HttpParams()
            .set('filter', String('GROUP'));

        const endpoint = `${this.STORE_BY_SERVICE_TYPE}${serviceType}`;
        return this.genericService.genericGet<ILocalGroup[]>(endpoint, httpParams)
            .pipe(
                take(1),
                map((response) => {
                    return isArray(response) ? response : [];
                }));
    }

    public getTypeOperationClient$(iLocalParams: ILocalParams): Observable<IServiceType> {
        const httpParams = new HttpParams()
            .set('fulfillmentCenterCode', String(iLocalParams.fulfillmentCenter))
            .set('serviceTypeCode', String(iLocalParams.serviceType))
            .set('detailType', String(iLocalParams.detailType))
            .set('channel', String(EChannel.digital));

        const endpoint = `${this.TYPE_SERVICE_ENDPOINT}`;
        return this.genericService.genericGet<IServiceType>(endpoint, httpParams)
            .pipe(
                take(1),
                map(response => {
                    return isObject(response) ? response : response;
                }));
    }

    public getTypeOperationGroupClient$(iLocalParams: ILocalParams): Observable<IServiceType> {
        const httpParams = new HttpParams()
            .set('fulfillmentCenterCode', String(iLocalParams.fulfillmentCenter))
            .set('serviceTypeCode', String(iLocalParams.serviceType))
            .set('detailType', String(iLocalParams.detailType))
            .set('channel', String(EChannel.digital))
            .set('filter', String('GROUP'));

        const endpoint = `${this.TYPE_SERVICE_ENDPOINT}`;
        return this.genericService.genericGet<IServiceType>(endpoint, httpParams)
            .pipe(
                take(1),
                map(response => {
                    return isObject(response) ? response : response;
                }));
    }
}

export const STORE_LIST = [
    {
        legacyId: 36,
        localCode: 'FJ7',
        name: 'CD SURQILLO',
        description: 'Delivery Center Surquillo - Zonas asignadas a Delcorp',
        address: 'AVENIDA REPUBLICA DE PANAMA 4670',
        latitude: -12.11159000,
        longitude: -77.01859900,
        localType: 'DELIVERY_CENTER',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 0,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '21:30:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: true
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: true
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 4,
        localCode: 'AB6',
        name: 'CALLAO',
        description: 'CALLAO',
        address: 'AV. SAENZ PEÑA 476 CALLAO',
        latitude: -12.06078820,
        longitude: -77.14173950,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: true
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 7,
        localCode: 'OFF4',
        name: 'ASTETE',
        description: 'ASTETE',
        address: 'AV. ALFREDO BENAVIDES 4801 URB. LAS GARDENIAS SANTIAGO DE SURCO',
        latitude: -12.12773840,
        longitude: -76.98737030,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'RETIRO EN TIDA',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 9,
        localCode: '046',
        name: 'AVIACION',
        description: 'AVIACION',
        address: 'AV. AVIACIÓN 3008 SAN BORJA',
        latitude: -12.09982260,
        longitude: -77.00208580,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10,
        localCode: 'AF8',
        name: 'LOS OLIVOS',
        description: 'LOS OLIVOS',
        address: 'AV. CARLOS A. IZAGUIRRE 880 URB. LAS PALMERAS I ETAPA MZA B LTE 27 LOS OLIVOS',
        latitude: -11.99087280,
        longitude: -77.07146500,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 13,
        localCode: '070',
        name: 'SIMON SALGUERO',
        description: 'SIMON SALGUERO',
        address: 'CALLE SIMÓN SALGUERO 501-505 SURCO',
        latitude: -12.13026020,
        longitude: -77.00868000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 14,
        localCode: '073',
        name: 'SALAMANCA',
        description: 'SALAMANCA',
        address: 'CALLE INCA GARCILASO DE LA VEGA 219 ATE',
        latitude: -12.07532230,
        longitude: -76.98718700,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 15,
        localCode: 'AK2',
        name: 'RAUL FERRERO',
        description: 'RAUL FERRERO',
        address: 'La Molina - Av. Raúl Ferrero Rebagliati 1125 (A una cuadra del C. C. Molina Plaza)',
        latitude: -12.08991730,
        longitude: -76.94894190,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: true
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: true
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: true
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 17,
        localCode: 'AO8',
        name: 'LAS TIENDAS',
        description: 'LAS TIENDAS',
        address: 'CALLE LAS TIENDAS 297 SURQUILLO',
        latitude: -12.10310520,
        longitude: -77.02120720,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: true
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 25,
        localCode: '704',
        name: 'JACARANDA',
        description: 'JACARANDA',
        address: 'JR. JACARANDA NRO. 801 URB. RESIDENCIAL ING. VALLE H (MZA. N LOTE 5) SANTIAGO DE SURCO',
        latitude: -12.12640910,
        longitude: -76.97484750,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 27,
        localCode: '553',
        name: 'REBAGLIATI',
        description: 'REBAGLIATI',
        address: 'JR. DOMINGO CUETO NRO. 325  LINCE',
        latitude: -12.08032100,
        longitude: -77.03913100,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 31,
        localCode: 'DG8',
        name: 'SANTA ANITA 7',
        description: 'SANTA ANITA 7',
        address: 'AV. FRANCISCO BOLOGNESI NRO. 665 URB. LOS FICUS  SANTA ANITA',
        latitude: -12.04963480,
        longitude: -76.97228950,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: true
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 37,
        localCode: 'AY2',
        name: 'COMAS - ESPAÑA',
        description: 'COMAS - ESPAÑA',
        address: 'Av. Túpac Amaru 4964 - Comas',
        latitude: -11.95668720,
        longitude: -77.05249820,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: true
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 38,
        localCode: '297',
        name: 'SAN JUAN DE MIRAFLORES',
        description: 'SAN JUAN CT',
        address: 'Av Ramón Vargas Machuca 352 - Lima',
        latitude: -12.16580690,
        longitude: -76.97389900,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 39,
        localCode: 'CK3',
        name: 'SAN JUAN DE LURIGANCHO',
        description: 'SJL LOS JARDINES ESTE',
        address: 'Av. Los Jardines Este',
        latitude: -12.00386030,
        longitude: -77.00253140,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: true
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 40,
        localCode: 'AJ2',
        name: 'AREQUIPA 3',
        description: 'AREQUIPA 3',
        address: 'AV. MARISCAL CASTILLA 528',
        latitude: -16.40204000,
        longitude: -71.51793000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 41,
        localCode: 'ES1',
        name: 'AREQUIPA 46',
        description: 'AREQUIPA 46',
        address: 'Mz. G Lt. 19 Urb. Leon XIII',
        latitude: -16.38992000,
        longitude: -71.54744000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 42,
        localCode: 'BC5',
        name: 'AREQUIPA 7',
        description: 'AREQUIPA 7',
        address: 'AV. ESTADOS UNIDOS NRO 202',
        latitude: -16.43006000,
        longitude: -71.52836000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 43,
        localCode: 'BG5',
        name: 'AREQUIPA 9',
        description: 'AREQUIPA 9',
        address: 'AV. VICTOR ANDRES BELAUNDE 305',
        latitude: -16.39968000,
        longitude: -71.54987000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 44,
        localCode: '685',
        name: 'AREQUIPA 23',
        description: 'AREQUIPA 23',
        address: 'AV. VIÑA DEL MAR 504',
        latitude: -16.44271000,
        longitude: -71.55618000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 45,
        localCode: 'AG5',
        name: 'TRUJILLO 03',
        description: 'TRUJILLO 03',
        address: 'Av Los Angeles 599',
        latitude: -8.12957000,
        longitude: -79.03716000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 46,
        localCode: 'AX4',
        name: 'TRUJILLO 13',
        description: 'TRUJILLO 13',
        address: 'Av. América Nte. 2312,',
        latitude: -8.10271000,
        longitude: -79.03299000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 47,
        localCode: 'BD1',
        name: 'TRUJILLO 17',
        description: 'TRUJILLO 17',
        address: 'Av. Larco 724',
        latitude: -8.12106000,
        longitude: -79.03591000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: true
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: true
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 48,
        localCode: 'BK4',
        name: 'TRUJILLO 19',
        description: 'TRUJILLO 19',
        address: 'Av. César Vallejo 694',
        latitude: -8.10747000,
        longitude: -79.01492000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 49,
        localCode: 'CA3',
        name: 'TRUJILLO 24',
        description: 'TRUJILLO 24',
        address: 'Jirón Ayacucho 565',
        latitude: -8.11251000,
        longitude: -79.02554000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 50,
        localCode: 'AX2',
        name: 'CHICLAYO 09',
        description: 'CHICLAYO 09',
        address: 'Av Sáenz Peña 299',
        latitude: -6.77566000,
        longitude: -79.83574000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 51,
        localCode: 'BF5',
        name: 'CHICLAYO 13',
        description: 'CHICLAYO 13',
        address: 'AV. SESQUICENTENARIO 255',
        latitude: -6.78072000,
        longitude: -79.84257000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 52,
        localCode: 'BP3',
        name: 'CHICLAYO 14',
        description: 'CHICLAYO 14',
        address: 'Av. Luis Gonzáles 638',
        latitude: -6.77260000,
        longitude: -79.84233000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 53,
        localCode: 'CE6',
        name: 'CHICLAYO 19',
        description: 'CHICLAYO 19',
        address: 'Av Salaverry 770',
        latitude: -6.77043000,
        longitude: -79.85259000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 54,
        localCode: 'DA1',
        name: 'CHICLAYO 25',
        description: 'CHICLAYO 25',
        address: 'Av Sáenz Peña 1069',
        latitude: -6.76919000,
        longitude: -79.83586000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 55,
        localCode: 'CB7',
        name: 'TRUJILLO 25',
        description: 'TRUJILLO 25',
        address: 'Av José Gabriel Condorcanqui 2189',
        latitude: -8.06926000,
        longitude: -79.05037000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 56,
        localCode: '462',
        name: 'ALCAZAR 02',
        description: 'RIMAC 01',
        address: 'Av. Samuel Alcazar 834',
        latitude: -12.02691630,
        longitude: -77.03316660,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 57,
        localCode: 'DZ5',
        name: 'VILLA EL SALVADOR 09',
        description: 'V.E.S. 09',
        address: 'SECTOR 3, GRUPO 7, mZ p, lOTE 24, SEGUNDO PISO',
        latitude: -12.21331130,
        longitude: -76.93614150,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: true
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 58,
        localCode: '102',
        name: 'CARABAYLLO 01',
        description: 'CARABAYLLO 1',
        address: '18 47, CARABAYLLO',
        latitude: -11.87549280,
        longitude: -77.01641560,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 59,
        localCode: '925',
        name: 'VILLA MARIA 04',
        description: 'VILLA MARIA 04',
        address: 'Av Jose Carlos Mariategui 924',
        latitude: -12.15395120,
        longitude: -76.95216390,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 60,
        localCode: 'BZ0',
        name: 'PIURA 08',
        description: 'PIURA 08',
        address: 'Av. Grau 1704',
        latitude: -5.19124840,
        longitude: -80.64396030,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 61,
        localCode: 'FH9',
        name: 'PIURA 27',
        description: 'PIURA 27',
        address: 'Av. Country N° 266 Mz. D Lte. 8 Urb. Santa Isabel',
        latitude: -5.18402070,
        longitude: -80.63140210,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 62,
        localCode: '126',
        name: 'CHIMBOTE 07',
        description: 'CHIMBOTE 07',
        address: 'Mz I-12 Lt. 47 URB. LOS HEROES',
        latitude: -9.12842700,
        longitude: -78.51647570,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 63,
        localCode: 'AZ9',
        name: 'CHIMBOTE 08',
        description: 'CHIMBOTE 08',
        address: 'Mz. L-2 Lt. 13 URB. PACIFICO',
        latitude: -9.12347720,
        longitude: -78.53007090,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 64,
        localCode: 'AZ6',
        name: 'ICA 04',
        description: 'ICA 04',
        address: 'Av San Martin 1439',
        latitude: -14.07727470,
        longitude: -75.72634010,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 66,
        localCode: '977',
        name: 'SALAMANCA 2',
        description: 'SALAMANCA 2',
        address: 'Av. Los Paracas 230 Urb. Los Recaudadores - Ate',
        latitude: -12.07631790,
        longitude: -76.98760550,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 68,
        localCode: 'OFF5',
        name: 'ASIA 2',
        description: 'ASIA 2',
        address: 'Panamericana sur km 97.5',
        latitude: -13.04654680,
        longitude: -76.43217290,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 69,
        localCode: 'AS1',
        name: 'HUANCAYO 4',
        description: 'HUANCAYO 4',
        address: 'Jirón Santa Isabel 989 el Tambo - Huancayo',
        latitude: -12.05754330,
        longitude: -75.21473150,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 70,
        localCode: 'AH2',
        name: 'CAJAMARCA 1',
        description: 'CAJAMARCA 1',
        address: 'Jr Amazonas 576 - 580',
        latitude: -7.15562180,
        longitude: -78.51735440,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 71,
        localCode: 'BX2',
        name: 'CAJAMARCA 6',
        description: 'CAJAMARCA 6',
        address: 'Av Vía Evitamiento 980 - Barrio San Martín',
        latitude: -7.16540490,
        longitude: -78.50279440,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 72,
        localCode: 'BT2',
        name: 'HUANUCO 6',
        description: 'HUANUCO 6',
        address: 'Jr 2 de Mayo 1040 - Huánuco',
        latitude: -9.93009200,
        longitude: -76.24056700,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 73,
        localCode: 'AB5',
        name: 'TACNA 1',
        description: 'TACNA 1',
        address: 'Av. San Martín 537 - 545 - Tacna',
        latitude: -18.01270210,
        longitude: -70.24947600,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 74,
        localCode: '183',
        name: 'PUCALLPA 2',
        description: 'PUCALLPA 2',
        address: 'Jr Raymondi 453 Calleria - Coronel Portillo',
        latitude: -8.38469380,
        longitude: -74.53005800,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 75,
        localCode: '041',
        name: 'TARAPOTO 1',
        description: 'TARAPOTO 1',
        address: 'Jr Martinez de campagñon 101 Tarapoto - San Martín',
        latitude: -6.48799300,
        longitude: -76.36076900,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 76,
        localCode: 'E05',
        name: 'CIRCUNVALACION',
        description: 'CIRCUNVALACION',
        address: 'AV CIRCUNVALACION',
        latitude: -6.48799300,
        longitude: -76.36076900,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 77,
        localCode: 'Z99',
        name: 'COPIA DC',
        description: 'COPIA DC',
        address: 'Av. Copia 123',
        latitude: -12.11159000,
        longitude: -77.01859900,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 78,
        localCode: 'DQ9',
        name: 'SAN FELIPE 4',
        description: 'SAN FELIPE 4',
        address: 'Av. Universitaria 212 - 214 - Urbanización Santa Isabel',
        latitude: -11.89844840,
        longitude: -77.04040390,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 79,
        localCode: 'CX2',
        name: 'SAN JUAN 5',
        description: 'SAN JUAN 5',
        address: 'MZA. D Lote. 2A El Universo Pampas de San Juan',
        latitude: -12.18879000,
        longitude: -76.95784000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 80,
        localCode: 'EE1',
        name: 'CHORRILLOS 7',
        description: 'CHORRILLOS 7',
        address: 'Av. Defensores del Morro NRO. 601 URB. - Chorrillos',
        latitude: -12.16964000,
        longitude: -77.02343000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 81,
        localCode: 'DJ9',
        name: 'ZAPALLAL',
        description: 'ZAPALLAL',
        address: 'AV. Buenos Aires 2317',
        latitude: -11.84325910,
        longitude: -77.10189290,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 82,
        localCode: 'AO6',
        name: 'HABICH 1',
        description: 'HABICH 1',
        address: 'Av. Habich 471 - Urb. Ingeniería',
        latitude: -12.02709000,
        longitude: -77.05568000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 83,
        localCode: 'FR0',
        name: 'PUENTE PIEDRA 7',
        description: 'PUENTE PIEDRA 7',
        address: 'Av. Milagrosa Cruz de Motupe Mz. B LOTE 3',
        latitude: -11.89051020,
        longitude: -77.06804080,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 84,
        localCode: 'FQ1',
        name: 'HORACIO ZEVALLOS',
        description: 'HORACIO ZEVALLOS',
        address: 'Carretera Central 1295 con Av. Horacio Zevallos',
        latitude: -12.00515990,
        longitude: -76.84501990,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 85,
        localCode: 'BR7',
        name: 'SANTA ANITA 3',
        description: 'SANTA ANITA 3',
        address: 'Av. Tupac Amaru 495 - Nro. 497 Urb. Universal 1,2,3 Era Etapa Lima - Santa Anita',
        latitude: -12.04384820,
        longitude: -76.97934510,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: true
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: true
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 86,
        localCode: 'EY5',
        name: 'MANCHAY 3',
        description: 'MANCHAY 3',
        address: 'Av. Victor Malasquez mza. B Lote. 35 A.H. Portada de Manchay I',
        latitude: -12.08971540,
        longitude: -76.88224840,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 87,
        localCode: 'FC8',
        name: 'CHACLACAYO 3',
        description: 'CHACLACAYO 3',
        address: 'CAL. Las Palmeras Nro. 310 Lima - Chaclacayo',
        latitude: -11.97587290,
        longitude: -76.77254030,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 88,
        localCode: 'EY1',
        name: 'CHOSICA 4',
        description: 'CHOSICA 4',
        address: 'Av. Lima Sur Nro. 639 Lima - Lurigancho',
        latitude: -11.93844000,
        longitude: -76.69740000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 89,
        localCode: 'CI4',
        name: 'GERARDO UNGER 2',
        description: 'GERARDO UNGER 2',
        address: 'Av. Gerardo Unger 4315 -Independencia',
        latitude: -11.98288933,
        longitude: -77.05899060,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'EXP',
            service: 'Type express',
            shortName: 'EXP',
            startHour: '08:00:00',
            endHour: '18:00:00',
            enabled: false
        }, {
            code: 'AM_PM',
            service: 'am y pm',
            shortName: 'AM_PM',
            startHour: '08:00:00',
            endHour: '20:30:00',
            enabled: false
        }, {
            code: 'PROG',
            service: 'Delivery scheduled',
            shortName: 'PROG',
            startHour: '08:00:00',
            endHour: '22:00:00',
            enabled: false
        }, {
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 90,
        localCode: 'CK8',
        name: '28 DE JULIO',
        description: '28 DE JULIO',
        address: 'AV. 28 DE JULIO NRO. 518 LIMA LIMA MIRAFLORES',
        latitude: -12.12702640,
        longitude: -77.02938440,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 91,
        localCode: 'AD1',
        name: 'ASTETE 1',
        description: 'ASTETE 1',
        address: 'AV. ALFREDO BENAVIDES 4801 URB. LAS GARDENIAS SANTIAGO DE SURCO LIMA LIMA',
        latitude: -12.12770830,
        longitude: -76.98735950,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 92,
        localCode: 'AB9',
        name: 'AV. PERU 1',
        description: 'AV. PERU 1',
        address: 'AV. PERU 1799 URB. PERU LIMA LIMA SAN MARTIN PORRES',
        latitude: -12.03237420,
        longitude: -77.06474660,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 93,
        localCode: 'AE6',
        name: 'AVIACION 1',
        description: 'AVIACION 1',
        address: 'AV. AVIACION 3008',
        latitude: -12.09972635,
        longitude: -77.00204194,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 94,
        localCode: 'BP8',
        name: 'AVIACION 3',
        description: 'AVIACION 3',
        address: 'AV. AVIACION NRO 3764 URB. LA CALERA DE LA MERCED (3762) LIMA LIMA SURQUILLO',
        latitude: -12.11262410,
        longitude: -77.00022880,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 95,
        localCode: 'DI0',
        name: 'CAMINOS DEL INCA 2',
        description: 'CAMINOS DEL INCA 2',
        address: 'AV. CAMINOS DEL INCA 483- NRO. 491 LIMA LIMA SANTIAGO DE SURCO',
        latitude: -12.11515220,
        longitude: -76.99103950,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 96,
        localCode: 'AC7',
        name: 'CAVENECIA',
        description: 'CAVENECIA',
        address: 'CALLE JOSE LLANO ZAPATA 195 - 199 LIMA LIMA SAN ISIDRO',
        latitude: -12.10894730,
        longitude: -77.03812840,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 97,
        localCode: 'CH1',
        name: 'CHORRILLOS 3',
        description: 'CHORRILLOS 3',
        address: 'AV. DEFENSORES DEL MORRO NRO. 933 URB. SAN JUAN LIMA LIMA CHORRILLOS',
        latitude: -12.17212186,
        longitude: -77.02108562,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 98,
        localCode: 'CN8',
        name: 'CHORRILLOS 4',
        description: 'CHORRILLOS 4',
        address: 'AV. ALAMEDA LOS CEDROS NRO. 261 URB. LOS CEDROS DE VILLA (MZ.N-06, LT.08 SECTOR 5) LIMA LIMA CHORRILLOS',
        latitude: -12.20374020,
        longitude: -77.01418698,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 99,
        localCode: 'AG1',
        name: 'DOS DE MAYO',
        description: 'DOS DE MAYO',
        address: 'AV. DOS DE MAYO 1105',
        latitude: -12.09190030,
        longitude: -77.04223750,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 100,
        localCode: 'AC9',
        name: 'EJERCITO',
        description: 'EJERCITO',
        address: 'AV. DEL EJERCITO 1370 LIMA LIMA MAGDALENA DEL MAR',
        latitude: -12.10289970,
        longitude: -77.05852930,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 101,
        localCode: 'CB9',
        name: 'LA ENCALADA 2',
        description: 'LA ENCALADA 2',
        address: 'AV. LA ENCALADA NRO. 817 INT. TDA1 LOTE. 6 URB. CENTRO COMERCIAL (MZ-L1 SECTOR 8) LIMA LIMA SANTIAGO DE SURCO',
        latitude: -12.10758360,
        longitude: -76.97200120,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 102,
        localCode: 'BJ6',
        name: 'FAUCETT',
        description: 'FAUCETT',
        address: 'AV. FAUCETT NRO. 399 (397) LIMA LIMA SAN MIGUEL',
        latitude: -12.06624390,
        longitude: -77.09752860,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 103,
        localCode: 'AR5',
        name: 'FLORA TRISTAN',
        description: 'FLORA TRISTAN',
        address: 'AV. FLORA TRISTAN 691 MZ. O LT. 3 ESQ. CALLE PIURA Nº 106-108 TDA. 1,2,3 URB. SANTA PATRICIA 3 ETAPA LA MOLINA LIMA LIMA',
        latitude: -12.06731400,
        longitude: -76.94386480,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 104,
        localCode: 'AE4',
        name: 'JAVIER PRADO',
        description: 'JAVIER PRADO',
        address: 'CALLE PERRICHOLI 195',
        latitude: -12.09228850,
        longitude: -77.03227040,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 105,
        localCode: 'DZ6',
        name: 'LA PLANICIE',
        description: 'LA PLANICIE',
        address: 'AV. RICARDO ELIAS APARICIO NRO. 695 LIMA - LIMA - LA MOLINA',
        latitude: -12.07771000,
        longitude: -76.91828000,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 106,
        localCode: 'DO7',
        name: 'NARANJAL 2',
        description: 'NARANJAL 2',
        address: 'AV. NARANJAL Nº 1488 URB. EL PARQUE DEL NARANJAL II ETAPA LIMA/LIMA/LOS OLIVOS',
        latitude: -11.97646100,
        longitude: -77.08277110,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 107,
        localCode: 'BA5',
        name: 'PALERMO',
        description: 'PALERMO',
        address: 'AV. PALERMO 478 LA VICTORIA LIMA LIMA',
        latitude: -12.08015830,
        longitude: -77.02303830,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 108,
        localCode: 'AF9',
        name: 'REPUBLICA DE PANAMA 1',
        description: 'REPUBLICA DE PANAMA 1',
        address: 'AV. REP. DE PANAMA 6687 -TDA. 1-2-3',
        latitude: -12.13359670,
        longitude: -77.01785890,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 109,
        localCode: 'CF6',
        name: 'SALAVERRY 1',
        description: 'SALAVERRY 1',
        address: 'AV. SALAVERRY NRO. 2594 LIMA LIMA JESUS MARIA',
        latitude: -12.09271861,
        longitude: -77.05327749,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 110,
        localCode: 'AH0',
        name: 'SALGUERO',
        description: 'SALGUERO',
        address: 'CALLE SIMON SALGUERO 501-505',
        latitude: -12.13023620,
        longitude: -77.00866700,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 111,
        localCode: 'CL3',
        name: 'SAN BORJA SUR',
        description: 'SAN BORJA SUR',
        address: 'AV. SAN BORJA SUR NRO. 894 CONJUNTO URB. SAN BORJA (Y NRO:894-A, MZ-D14, LT-13) LIMA LIMA SAN BORJA',
        latitude: -12.10067049,
        longitude: -76.99499309,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 112,
        localCode: 'AA7',
        name: 'SAN JUAN 1',
        description: 'SAN JUAN 1',
        address: 'AV. MIGUEL IGLESIAS 999 ZONA D/ESQUINA CON AV LOS HOREOS',
        latitude: -12.15964650,
        longitude: -76.95886380,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 113,
        localCode: 'BE8',
        name: 'SAN LUIS 2',
        description: 'SAN LUIS 2',
        address: 'AV. SAN LUIS 1629 M4 LT. 1 JACARANDA II SAN BORJA LIMA LIMA',
        latitude: -12.08287810,
        longitude: -76.99706376,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 114,
        localCode: 'AZ1',
        name: 'SAN ROQUE',
        description: 'SAN ROQUE',
        address: 'JR. EL SOL 164 MZ. Q1 LT. 39 URB. SAN ROQUE CIVIL SANTIAGO DE SURCO LIMA LIMA',
        latitude: -12.14722300,
        longitude: -76.99055140,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 115,
        localCode: 'AW8',
        name: 'SUCRE',
        description: 'SUCRE',
        address: 'AV. SUCRE 675 - 685 PUEBLO LIBRE LIMA LIMA',
        latitude: -12.07797340,
        longitude: -77.06475200,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 116,
        localCode: 'AK8',
        name: 'VENEZUELA',
        description: 'VENEZUELA',
        address: 'AV. VENEZUELA 1094 - 1096 BREÑA - LIMA',
        latitude: -12.05491248,
        longitude: -77.04868555,
        localType: 'DRUGSTORE',
        startHour: '08:00:00',
        endHour: '22:00:00',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10000,
        localCode: '495',
        name: 'ENRIQUE PALACIOS',
        description: 'ENRIQUE PALACIOS',
        address: 'CAL.ENRIQUE PALACIOS NRO. 1294 LIMA - LIMA - MIRAFLORES',
        latitude: -12.11705640,
        longitude: -77.04183750,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10001,
        localCode: '130',
        name: 'ENCALADA 2',
        description: 'ENCALADA 2',
        address: 'AV. LA ENCALADA NRO. 727 LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.10841400,
        longitude: -76.97231900,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10002,
        localCode: '143',
        name: 'FLORA TRISTAN',
        description: 'FLORA TRISTAN',
        address: 'AV. FLORA TRISTAN NRO. 401 URB. SANTA PATRICIA II ETAPA (LOTE 63 MZ. X) LIMA - LIMA - LA MOLINA',
        latitude: -76.94161650,
        longitude: -12.07135990,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10003,
        localCode: '603',
        name: 'AVIACION 3516 Y 3520',
        description: 'AVIACION 3516 Y 3520',
        address: 'AV. AVIACION NRO. 3516 (AV. AVIACION 3516 Y 3520) LIMA - LIMA - SAN BORJA',
        latitude: -77.00130500,
        longitude: -12.10749000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10004,
        localCode: '606',
        name: 'CHACARILLA 3',
        description: 'CHACARILLA 3',
        address: 'AV. PRIMAVERA NRO. 288 INT. 102 LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -76.99082390,
        longitude: -12.11133580,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10005,
        localCode: '607',
        name: 'LARCO 1B',
        description: 'LARCO 1B',
        address: 'AV. LARCO NRO. 401 LIMA - LIMA - MIRAFLORES',
        latitude: -77.02894620,
        longitude: -12.12141950,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10006,
        localCode: '615',
        name: 'LA MARINA 2',
        description: 'LA MARINA 2',
        address: 'AV. LA MARINA NRO. 2097 URB. PANDO LIMA - LIMA - SAN MIGUEL',
        latitude: -77.08282470,
        longitude: -12.07834690,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10007,
        localCode: '622',
        name: 'SALAVERRY 1B',
        description: 'SALAVERRY 1B',
        address: 'AV. FAUSTINO SANCHEZ CARRION NRO. 1093 RES. SALAVERRY LIMA - LIMA - JESUS MARIA',
        latitude: -77.05334890,
        longitude: -12.09281530,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10008,
        localCode: '633',
        name: 'LA MOLINA 2',
        description: 'LA MOLINA 2',
        address: 'AV. RAUL FERRERO NRO. 1003 LIMA - LIMA - LA MOLINA',
        latitude: -76.94800880,
        longitude: -12.08949500,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10009,
        localCode: '634',
        name: 'MARANGA',
        description: 'MARANGA',
        address: 'AV. ELMER FAUCETT NRO. 573 INT. 1BE LIMA - LIMA - SAN MIGUEL',
        latitude: -77.09743740,
        longitude: -12.06366880,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10010,
        localCode: '641',
        name: 'LA PLANICIE 1',
        description: 'LA PLANICIE 1',
        address: 'AV. ELIAS APARICIO NRO. 791 URB. LA PLANICIE LIMA - LIMA - LA MOLINA',
        latitude: -76.91714160,
        longitude: -12.07719410,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10011,
        localCode: '644',
        name: 'PUEBLO LIBRE 2',
        description: 'PUEBLO LIBRE 2',
        address: 'CAL.JOSE LEGUIA Y MENENDEZ NRO. 1016 LIMA - LIMA - PUEBLO LIBRE (MAGDALENA VIEJA)',
        latitude: -77.06445000,
        longitude: -12.07553000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10012,
        localCode: '646',
        name: 'LAS FLORES',
        description: 'LAS FLORES',
        address: 'AV. PROCERES DE LA INDEPENDEN NRO. 1665 LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -77.00573200,
        longitude: -12.00716170,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10013,
        localCode: '647',
        name: 'LOS OLIVOS II',
        description: 'LOS OLIVOS II',
        address: 'AV. CARLOS YZAGUIRRE NRO. 914 URB. LAS PALMERAS LIMA - LIMA - LOS OLIVOS',
        latitude: -77.07205660,
        longitude: -11.99097730,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10014,
        localCode: '656',
        name: 'CONSTRUCTORES 4',
        description: 'CONSTRUCTORES 4',
        address: 'AV. CONSTRUCTORES NRO. 1196 LIMA - LIMA - LA MOLINA',
        latitude: -76.94563980,
        longitude: -12.06257600,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10015,
        localCode: '678',
        name: 'CANADA 2',
        description: 'CANADA 2',
        address: 'AV. CANADA NRO. 3510 LIMA - LIMA - SAN LUIS',
        latitude: -76.99340290,
        longitude: -12.08108610,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10016,
        localCode: '698',
        name: 'LINCE',
        description: 'LINCE',
        address: 'AV. IGNACIO MERINO NRO. 2201 LIMA - LIMA - LINCE',
        latitude: -77.03221480,
        longitude: -12.08611130,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10017,
        localCode: '701',
        name: 'SURQUILLO',
        description: 'SURQUILLO',
        address: 'AV. ANGAMOS ESTE NRO. 600 LIMA - LIMA - SURQUILLO',
        latitude: -77.02530840,
        longitude: -12.11365440,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10018,
        localCode: '711',
        name: 'SANTA LUZMILA 1',
        description: 'SANTA LUZMILA 1',
        address: 'AV. GUILLERMO DE LA FUENTE NRO. 299 URB. SANTA LUZMILA LIMA - LIMA - COMAS',
        latitude: -77.06230480,
        longitude: -11.94156880,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10019,
        localCode: '752',
        name: 'MORELLI',
        description: 'MORELLI',
        address: 'CAL.MORELLI NRO. 229 LIMA - LIMA - SAN BORJA',
        latitude: -77.00396910,
        longitude: -12.09029030,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10020,
        localCode: '776',
        name: 'LOS OLIVOS III',
        description: 'LOS OLIVOS III',
        address: 'MZA. L1 LOTE. 7 A.H. DANIEL ALCIDES CARRION LIMA - LIMA - LOS OLIVOS',
        latitude: -77.07970930,
        longitude: -12.01216990,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10021,
        localCode: '787',
        name: 'CHORRILLOS 2',
        description: 'CHORRILLOS 2',
        address: 'AV. ALAMEDA SUR ESQ S MARCOS MZA. II INT. 102 (CENTRO COMERCIAL STRIP CENTER) LIMA - LIMA - CHORRILLOS',
        latitude: -77.01130190,
        longitude: -12.19655760,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10022,
        localCode: '802',
        name: 'SURCO',
        description: 'SURCO',
        address: 'AV. BENAVIDES NRO. 4190 LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.12837730,
        longitude: -76.99242990,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10023,
        localCode: '886',
        name: 'MATELLINI 1',
        description: 'MATELLINI 1',
        address: 'AV. ARIOSTO MATELLINI NRO. 267 URB. SANTA LEONOR 2DA ETAPA (LC4 PRIMER PISO C.C.STRIP CENTER MATELLI) LIMA - LIMA - CHORRILLOS',
        latitude: -77.01112220,
        longitude: -12.18039650,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10024,
        localCode: '961',
        name: 'SAN JUAN 3',
        description: 'SAN JUAN 3',
        address: 'AV. SAN JUAN NRO. 1184 LIMA - LIMA - SAN JUAN DE MIRAFLORES',
        latitude: -76.97195360,
        longitude: -12.15480030,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10025,
        localCode: 'E70',
        name: 'ANGAMOS/ATAHUALPA',
        description: 'ANGAMOS/ATAHUALPA',
        address: 'AV. ANGAMOS OESTE NRO. 201 (ESQ. CON CALLE ATAHUALPA) LIMA - LIMA - MIRAFLORES',
        latitude: -77.03096600,
        longitude: -12.11386800,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10026,
        localCode: 'C86',
        name: 'JACARANDA 1',
        description: 'JACARANDA 1',
        address: 'JR. JACARANDA 806- NRO. 814 URB. RESIDENCIAL INGENIERIA (MZA. L LOTE 7-8) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.12650000,
        longitude: -76.97500000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10027,
        localCode: '465',
        name: 'ROCCA DE VERGALLO',
        description: 'ROCCA DE VERGALLO',
        address: 'AV. JAVIER PRADO OESTE NRO. 994 LIMA - LIMA - MAGDALENA DEL MAR',
        latitude: -12.09380000,
        longitude: -77.05800000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10028,
        localCode: '389',
        name: 'LAS ARTES',
        description: 'LAS ARTES',
        address: 'AV. AVIACION NRO. 2499 URB. SAN BORJA (MZ. H3 LOT-03) LIMA - LIMA - SAN BORJA',
        latitude: -12.09090000,
        longitude: -77.00300000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10029,
        localCode: '036',
        name: 'CAMINOS DEL INCA 01',
        description: 'CAMINOS DEL INCA 01',
        address: 'AV. CAMINOS DEL INCA NRO. 2198 URB. LAS GARDENIAS LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.13300000,
        longitude: -76.98320000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10030,
        localCode: '014',
        name: 'DANTE',
        description: 'DANTE',
        address: 'JR. DANTE NRO. 900 LIMA - LIMA - SURQUILLO',
        latitude: -12.11220000,
        longitude: -77.02340000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10031,
        localCode: '017',
        name: 'HABICH',
        description: 'HABICH',
        address: 'AV. EDUARDO DE HABICH NRO. 487 URB. INGENIERIA (NO CONSIGNA) LIMA - LIMA - SAN MARTIN DE PORRES',
        latitude: -12.02740000,
        longitude: -77.05600000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10032,
        localCode: '477',
        name: 'ATOCONGO',
        description: 'ATOCONGO',
        address: 'AV. CIRCUNVALACION NRO. 1803 (LOCAL 33) CC OPEN PLAZA ATOCOMGO LIMA - LIMA - SAN JUAN DE MIRAFLORES',
        latitude: -12.14730000,
        longitude: -76.98180000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10033,
        localCode: '001',
        name: 'SAN LUIS',
        description: 'SAN LUIS',
        address: 'AV. SAN LUIS NRO. 1957 LIMA - LIMA - SAN BORJA',
        latitude: -12.08850000,
        longitude: -76.99620000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10034,
        localCode: '691',
        name: 'AV. TACNA',
        description: 'AV. TACNA',
        address: 'AV. TACNA NRO. 487 (N 489,491,493) LIMA - LIMA - LIMA',
        latitude: -12.04610000,
        longitude: -77.03720000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10035,
        localCode: 'E77',
        name: 'SAN MIGUEL LA MARINA  3',
        description: 'SAN MIGUEL LA MARINA  3',
        address: 'AV. LA MARINA 2281 INT AÂ Â  -Â  SAN MIGUEL - LIMA',
        latitude: -12.07840000,
        longitude: -77.08660000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10036,
        localCode: '660',
        name: 'CANADA/STA CATALINA',
        description: 'CANADA/STA CATALINA',
        address: 'AV. CANADA NRO. 903 LIMA - LIMA - LA VICTORIA',
        latitude: -12.08220000,
        longitude: -77.01710000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10037,
        localCode: '621',
        name: 'JR. DE LA UNION 1',
        description: 'JR. DE LA UNION 1',
        address: 'JR. DE LA UNION NRO. 568 ESPADEROS LIMA - LIMA - LIMA',
        latitude: -12.04780000,
        longitude: -77.03260000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10038,
        localCode: 'E86',
        name: 'LOS OLIVOS IZAGUIRRE 3',
        description: 'LOS OLIVOS IZAGUIRRE 3',
        address: 'URB. LAS PALMERAS AV. CARLOS ALBERTO IZAGUIRRE 878 1ERA ETAPA  -  LOS OLIVOS',
        latitude: -11.99130000,
        longitude: -77.07130000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10039,
        localCode: '559',
        name: 'SAN JUAN II',
        description: 'SAN JUAN II',
        address: 'AV. SAN JUAN NRO. 1154 LIMA - LIMA - SAN JUAN DE MIRAFLORES',
        latitude: -12.15530000,
        longitude: -76.97220000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10040,
        localCode: '134',
        name: 'LA PLANICIE',
        description: 'LA PLANICIE',
        address: 'CAL.TAHITI NRO. 131 URB. PORTADA DE LA PLANICIE LIMA - LIMA - LA MOLINA',
        latitude: -12.07720000,
        longitude: -76.91800000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10041,
        localCode: '969',
        name: 'SODIMAC JOCKEY',
        description: 'SODIMAC JOCKEY',
        address: 'AV. JAVIER PRADO ESTE NRO. 4010 (INT. TIENDA SODIMAC C.C. JOCKEY PLAZA) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.08670000,
        longitude: -76.97870000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10042,
        localCode: '051',
        name: 'CANTO GRANDE',
        description: 'CANTO GRANDE',
        address: 'AV. CANTO GRANDE 3690A NRO. 3690 URB. LOS JAZMINES LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -11.96860000,
        longitude: -77.00420000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10043,
        localCode: '761',
        name: 'CANTA CALLAO',
        description: 'CANTA CALLAO',
        address: 'Av. Elmer Faucett y Bertello nro.SN int.8-9 c. Comercial canta callao',
        latitude: -11.99800000,
        longitude: -77.11280000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10044,
        localCode: '616',
        name: 'CALLAO SAENZ PEÑA 1',
        description: 'CALLAO SAENZ PEÑA 1',
        address: 'AV. SAENZ PEÑA NRO. 699 PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - CALLAO',
        latitude: -12.06030000,
        longitude: -77.13850000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10045,
        localCode: '461',
        name: 'SALAVERRY',
        description: 'SALAVERRY',
        address: 'AV. 6 DE AGOSTO NRO. 599 (TDA NÂ°3 ESQ CON AV.SALAVERRY) LIMA - LIMA - JESUS MARIA',
        latitude: -12.07390000,
        longitude: -77.04170000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10046,
        localCode: '921',
        name: 'AV. LAS PALMERAS  1',
        description: 'AV. LAS PALMERAS  1',
        address: 'AV. LAS PALMERAS NRO. 3809 URB. LAS PALMERAS I ETAPA (N. 3811 MZ. K LT. 39) LIMA - LIMA - LOS OLIVOS',
        latitude: -11.99080000,
        longitude: -77.07190000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10047,
        localCode: '919',
        name: 'C.C.PARQUE AGUSTINO',
        description: 'C.C.PARQUE AGUSTINO',
        address: 'JR. ANCASH NRO. 2151 (LC. 112B C.C. BOULEVARD PARQUE AGUSTINO) LIMA - LIMA - EL AGUSTINO',
        latitude: -12.04070000,
        longitude: -77.00240000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10048,
        localCode: 'Q01',
        name: 'BOLIVAR 3',
        description: 'BOLIVAR 3',
        address: 'AV. SIMON BOLIVAR NRO. 1157 (Y AV. SIMON BOLIVAR 1157-A) LIMA - LIMA - PUEBLO LIBRE (MAGDALENA VIEJA)',
        latitude: -12.07250000,
        longitude: -77.06570000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10049,
        localCode: '765',
        name: 'BELLAVISTA MALL AVENTURA',
        description: 'BELLAVISTA MALL AVENTURA',
        address: 'Av. Oscar R . Benavides #3866  - Mall Aventura Plaza',
        latitude: -12.05620000,
        longitude: -77.10150000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10050,
        localCode: '131',
        name: 'PARDO 1',
        description: 'PARDO 1',
        address: 'AV. JOSE PARDO NRO. 135 LIMA - LIMA - MIRAFLORES',
        latitude: -12.11940000,
        longitude: -77.02990000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10051,
        localCode: 'E92',
        name: 'SURQUILLO ORUE',
        description: 'SURQUILLO ORUE',
        address: 'AV. DOMINGO ORUE 457 TDA 101  -  SURQUILLO',
        latitude: -12.10710000,
        longitude: -77.02310000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10052,
        localCode: '610',
        name: 'SANTA ANITA',
        description: 'SANTA ANITA',
        address: 'JR. LAS ALONDRAS NRO. 155 INT. A LIMA - LIMA - SANTA ANITA',
        latitude: -12.05420000,
        longitude: -76.96400000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10053,
        localCode: '163',
        name: 'CAMINOS DEL INCA 3',
        description: 'CAMINOS DEL INCA 3',
        address: 'JR. LOMA UMBROSA NRO. 696 URB. PROLONGACION BENAVIDES (AV. CAMINOS DEL INCA NRO: 2904) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.14030000,
        longitude: -76.98480000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10054,
        localCode: '626',
        name: 'ABANCAY/CUSCO',
        description: 'ABANCAY/CUSCO',
        address: 'AV. ABANCAY NRO. 602 LIMA - LIMA - LIMA',
        latitude: -12.05190000,
        longitude: -77.02900000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10055,
        localCode: 'B83',
        name: 'SAN LUIS 3',
        description: 'SAN LUIS 3',
        address: 'AV. SAN LUIS NRO. 1993 URB. SAN BORJA LIMA - LIMA - SAN BORJA',
        latitude: -12.08960000,
        longitude: -76.99610000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10056,
        localCode: '910',
        name: 'SHELL/ALCANFORES',
        description: 'SHELL/ALCANFORES',
        address: 'CAL.SCHELL NRO. 378 (TDA. NRO 8 ESQ. CALLE ALCANFORES CDRA. 4) LIMA - LIMA - MIRAFLORES',
        latitude: -12.12320000,
        longitude: -77.02790000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10057,
        localCode: 'C30',
        name: 'EL POLO 2',
        description: 'EL POLO 2',
        address: 'AV. EL POLO NRO. 388 URB. CENT.COMERCIAL MONTERRICO (TAMBIEN NRO : 390) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.10530000,
        longitude: -76.97320000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10058,
        localCode: '104',
        name: 'CHACARILLA 2',
        description: 'CHACARILLA 2',
        address: 'AV. HIGUERETA NRO. 620 URB. LAS GARDENIAS (OTRO 632 TDA-7) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.12100000,
        longitude: -76.98820000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10059,
        localCode: '411',
        name: 'MONTERREY',
        description: 'MONTERREY',
        address: 'JR. MONTERREY NRO. 176 URB. CHACARILLA DEL ESTANQUE (TDA-16) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.11310000,
        longitude: -76.99150000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10060,
        localCode: 'E59',
        name: 'RIMAC  PROLONG TACNA',
        description: 'RIMAC  PROLONG TACNA',
        address: 'PROLONGACION TACNA 115,117,119  -  RIMAC',
        latitude: -12.03960000,
        longitude: -77.03260000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10061,
        localCode: 'B59',
        name: 'TUPAC AMARU 3',
        description: 'TUPAC AMARU 3',
        address: 'AV. TUPAC AMARU NRO. 3036 (TAMBIEN 3040) LIMA - LIMA - COMAS',
        latitude: -11.94110000,
        longitude: -77.05020000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10062,
        localCode: 'E01',
        name: 'GUARDIA PERUANA CHORILLOS',
        description: 'GUARDIA PERUANA CHORILLOS',
        address: 'AV. GUARDIA CIVIL 501 -Â  CHORRILLOS LIMA',
        latitude: -12.18220000,
        longitude: -76.99980000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10063,
        localCode: 'E60',
        name: 'STA ANITA LOS CHANCAS 2',
        description: 'STA ANITA LOS CHANCAS 2',
        address: 'AV LA CULTURA 1303 -  COOP VIÃ‘A SAN FRANCISCO LIMA SANTA ANITA',
        latitude: -12.03340000,
        longitude: -76.94960000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10064,
        localCode: '386',
        name: 'GRAN CHIMU',
        description: 'GRAN CHIMU',
        address: 'AV. GRAN CHIMU NRO. 400 LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -12.02750000,
        longitude: -77.00720000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10065,
        localCode: '235',
        name: 'JPRADO PTHOUARS',
        description: 'JPRADO PTHOUARS',
        address: 'AV. JAVIER PRADO ESTE NRO. 209 (AV. PETIT THOUARS 2865) LIMA - LIMA - SAN ISIDRO',
        latitude: -12.09200000,
        longitude: -77.03220000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10066,
        localCode: '931',
        name: 'AV.MANCO CAPAC/28 JULIO',
        description: 'AV.MANCO CAPAC/28 JULIO',
        address: 'AV. MANCO CAPAC 396-394- NRO. 398 (ESQ. AV. 28 DE JULIO 1395 LC-3) LIMA - LIMA - LA VICTORIA',
        latitude: -12.06310000,
        longitude: -77.02960000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10067,
        localCode: '172',
        name: 'LOS ALISOS',
        description: 'LOS ALISOS',
        address: 'AV. LOS ALISOS NRO. 130 URB. EL NARANJAL (Y NRO:120 AV.TUPAC AMARU NRO: 4301) LIMA - LIMA - SAN MARTIN DE PORRES',
        latitude: -11.98310000,
        longitude: -77.05890000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10068,
        localCode: '059',
        name: 'SAN ROQUE',
        description: 'SAN ROQUE',
        address: 'AV. EL SOL NRO. 122 URB. SAN ROQUE LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.14760000,
        longitude: -76.99110000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10069,
        localCode: '007',
        name: 'LAS TIENDAS',
        description: 'LAS TIENDAS',
        address: 'CAL.LAS TIENDAS NRO. 233 DPTO. 101 LIMA - LIMA - SURQUILLO',
        latitude: -12.10380000,
        longitude: -77.02100000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10070,
        localCode: '150',
        name: 'SANTA CRUZ - Miraflores',
        description: 'SANTA CRUZ - Miraflores',
        address: 'CAL.HIPOLITO UNANUE NRO. 389 (TAMBIEN 393) LIMA - LIMA - MIRAFLORES',
        latitude: -12.10930000,
        longitude: -77.04850000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10071,
        localCode: '604',
        name: 'LOS OLIVOS 1B',
        description: 'LOS OLIVOS 1B',
        address: 'AV. CARLOS IZAGUIRRE NRO. 411 DPTO. 411A LIMA - LIMA - LOS OLIVOS',
        latitude: -11.99060000,
        longitude: -77.06480000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10072,
        localCode: 'B28',
        name: 'MINKA 3',
        description: 'MINKA 3',
        address: 'AV. ARGENTINA NRO. 3093 (LOCAL 394 AV.3 PABELLON 5) PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - CALLAO',
        latitude: -12.04720000,
        longitude: -77.11180000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10073,
        localCode: '690',
        name: 'ATE 2',
        description: 'ATE 2',
        address: 'CAR.CENTRAL KM. 6.5 CC.LAS BRISAS DE ATE (1ER PISO LOCAL N. B02) LIMA - LIMA - ATE',
        latitude: -12.03270000,
        longitude: -76.92750000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10074,
        localCode: 'B87',
        name: 'HUAYLAS  LOS LAURELES',
        description: 'HUAYLAS  LOS LAURELES',
        address: 'AV. DEFENSORES DEL MORRO NRO. 796A URB. LOS LAURELES (TAMBIEN NRO-798) LIMA - LIMA - CHORRILLOS',
        latitude: -12.17180000,
        longitude: -77.02180000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10075,
        localCode: '865',
        name: 'JULIO C. TELLO',
        description: 'JULIO C. TELLO',
        address: 'JR. JULIO C. TELLO NRO. 965 LIMA - LIMA - LINCE',
        latitude: -12.08690000,
        longitude: -77.04260000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10076,
        localCode: '083',
        name: 'SAN JUAN DE MIRAFLORES',
        description: 'SAN JUAN DE MIRAFLORES',
        address: 'AV. SAN JUAN NRO. 1183 URB. SAN JUAN LIMA - LIMA - SAN JUAN DE MIRAFLORES',
        latitude: -12.15440000,
        longitude: -76.97210000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10077,
        localCode: '946',
        name: 'SAN HILARION TOTTUS',
        description: 'SAN HILARION TOTTUS',
        address: 'AV. SAN HILARION ESTE N. 150 NRO. 180 URB. SAN HILARION (HIPERMERCADOS TOTTUS) LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -11.99330000,
        longitude: -77.01030000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10078,
        localCode: '952',
        name: 'CANTO REY SJL',
        description: 'CANTO REY SJL',
        address: 'AV. PROCERES DE LA INDEPENDEN NRO. 3305 URB. LOS PINOS LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -11.97540000,
        longitude: -77.00140000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10079,
        localCode: '649',
        name: 'VARGAS MACHUCA',
        description: 'VARGAS MACHUCA',
        address: 'AV. VARGAS MACHUCA NRO. 330 URB. SAN JUAN UNIDAD B LIMA - LIMA - SAN JUAN DE MIRAFLORES',
        latitude: -12.16580000,
        longitude: -76.97400000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10080,
        localCode: 'E91',
        name: 'SJ MIRAFLORES  LAVALLE',
        description: 'SJ MIRAFLORES  LAVALLE',
        address: 'AV. HERNANDO LAVALLE 216 URB CIUDAD DE DIOS  -  LIMA',
        latitude: -12.15120000,
        longitude: -76.97010000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10081,
        localCode: 'E14',
        name: 'STA ANITA RUISEÑORES 2',
        description: 'STA ANITA RUISEÑORES 2',
        address: 'AV. LOS RUISEÑORES 999   -  SANTA ANITA',
        latitude: -12.04390000,
        longitude: -76.97000000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10082,
        localCode: '930',
        name: 'AV.NARANJAL LOS OLIVOS',
        description: 'AV.NARANJAL LOS OLIVOS',
        address: 'AV. EL NARANJAL NRO. 1405 URB. PARQUE DEL NARANJAL ET. DOS (MZA. I-2 LOTE 17) LIMA - LIMA - LOS OLIVOS',
        latitude: -11.97720000,
        longitude: -77.08150000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10083,
        localCode: '028',
        name: 'LA MOLINA',
        description: 'LA MOLINA',
        address: 'AV.LA MOLINA NRO.3096 URB.RINCONADA DEL LAGO I ETAPA (ESQ.CON AV.RINCONADA DEL LAGO SECCION 2) LIMA - LIMA - LA MOLINA',
        latitude: -12.08520000,
        longitude: -76.92410000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10084,
        localCode: '836',
        name: 'SUCRE STA ROSA',
        description: 'SUCRE STA ROSA',
        address: 'AV. ANTONIO JOSE DE SUCRE NRO. 108 LIMA - LIMA - PUEBLO LIBRE (MAGDALENA VIEJA)',
        latitude: -12.07200000,
        longitude: -77.06180000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10085,
        localCode: 'E58',
        name: 'AV. AVIACION  5',
        description: 'AV. AVIACION  5',
        address: 'AV. AVIACION  2317 2317A 2315  -  SAN BORJA',
        latitude: -12.08440000,
        longitude: -77.00390000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10086,
        localCode: 'E72',
        name: 'TUPAC AMARU 4',
        description: 'TUPAC AMARU 4',
        address: 'AV. TUPAC AMARU NRO. 5731 URB. HUAQUILLAY (Y NRO 5733, MZ P1 LT 29, 1ERA ETAPA) LIMA - LIMA - COMAS',
        latitude: -11.92120000,
        longitude: -77.04230000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10087,
        localCode: 'T52',
        name: 'VENEZUELA 4',
        description: 'VENEZUELA 4',
        address: 'AV. VENEZUELA 1101 - NRO. 1103 (ESQ. CON CALLE LORETO) LIMA - LIMA - BREÑA',
        latitude: -12.05520000,
        longitude: -77.04930000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10088,
        localCode: '788',
        name: 'BRASIL 3',
        description: 'BRASIL 3',
        address: 'AV. BRASIL NRO. 1000 LIMA - LIMA - BREÑA',
        latitude: -12.06910000,
        longitude: -77.04910000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10089,
        localCode: 'E32',
        name: 'AV GRAU/MANCO CAPAC',
        description: 'AV GRAU/MANCO CAPAC',
        address: 'AV GRAU 396Â  LIMA LIMA LA VICTORIA',
        latitude: -12.05930000,
        longitude: -77.03000000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10090,
        localCode: '923',
        name: 'PURUCHUCO ATE',
        description: 'PURUCHUCO ATE',
        address: 'AV. NICOLAS AYLLON NRO. 4328 URB. LOS PORTALES DE JAVIER PRADO LIMA - LIMA - ATE',
        latitude: -12.04300000,
        longitude: -76.93580000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10091,
        localCode: '968',
        name: 'LOS OLIVOS TOTTUS',
        description: 'LOS OLIVOS TOTTUS',
        address: 'AV. ALFREDO MENDIOLA NRO. 5810 (HIPERMERCADOS TOTTUS) LIMA - LIMA - LOS OLIVOS',
        latitude: -11.96580000,
        longitude: -77.06740000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10092,
        localCode: 'T44',
        name: 'M. CASTILLA/LA MERCED',
        description: 'M. CASTILLA/LA MERCED',
        address: 'AV. MARISCAL CASTILLA NRO. 796 LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.13470000,
        longitude: -77.00990000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10093,
        localCode: '917',
        name: 'CARABAYLLO CONDORCANQUI',
        description: 'CARABAYLLO CONDORCANQUI',
        address: 'AV. CONDORCANQUI NRO. 905A URB. RESIDENCIAL LUCYANA DE CARABAYLLO (907 Y 907A) LIMA - LIMA - CARABAYLLO',
        latitude: -11.88790000,
        longitude: -77.03620000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10094,
        localCode: '883',
        name: 'ARNALDO MARQUEZ',
        description: 'ARNALDO MARQUEZ',
        address: 'AV. ARNALDO MARQUEZ NRO. 1349 (ESQUINA PASAJE PUNTA PACOCHA) LIMA - LIMA - JESUS MARIA',
        latitude: -12.07410000,
        longitude: -77.04980000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10095,
        localCode: '811',
        name: 'LOS FLAMENGOS',
        description: 'LOS FLAMENGOS',
        address: 'JR. LOS FLAMENCOS NRO. 200 URB. DE SANTA ANITA (Y 202 TIENDAS 1 Y 2) LIMA - LIMA - SANTA ANITA',
        latitude: -12.05310000,
        longitude: -76.96390000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10096,
        localCode: 'D52',
        name: 'HUAYLAS  4',
        description: 'HUAYLAS  4',
        address: 'AV. HUAYLAS NRO. 497 (TAMBIEN N.499) LIMA - LIMA - CHORRILLOS',
        latitude: -12.16850000,
        longitude: -77.02450000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10097,
        localCode: '907',
        name: 'LAS FLORES SJL 2',
        description: 'LAS FLORES SJL 2',
        address: 'AV. FLORES DE PRIMAVERA NRO. 1550 URB. SAN HILARION (MZA. L LOTE 13) LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -12.00360000,
        longitude: -77.01200000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10098,
        localCode: '277',
        name: 'CAVENECIA 2',
        description: 'CAVENECIA 2',
        address: 'AV. EMILIO CAVENECIA NRO. 209 LIMA - LIMA - SAN ISIDRO',
        latitude: -12.10880000,
        longitude: -77.03850000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10099,
        localCode: '973',
        name: 'BREÑA FERNANDINI',
        description: 'BREÑA FERNANDINI',
        address: 'JR. JUAN PABLO FERNANDINI NRO. 800 (ESQ. JR. CENTENARIO TIENDA 22) LIMA - LIMA - BREÑA',
        latitude: -12.06640000,
        longitude: -77.04850000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10100,
        localCode: '481',
        name: 'EL TRIGAL 2',
        description: 'EL TRIGAL 2',
        address: 'AV. ALFREDO BENAVIDES NRO. 4670 URB. VISTA ALEGRE LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.12820000,
        longitude: -76.98830000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10101,
        localCode: '387',
        name: 'ESCOBEDO',
        description: 'ESCOBEDO',
        address: 'AV. GREGORIO ESCOBEDO 804 806 NRO. 808 LIMA - LIMA - JESUS MARIA',
        latitude: -12.08740000,
        longitude: -77.05600000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10102,
        localCode: '345',
        name: 'AURORA',
        description: 'AURORA',
        address: 'CAL.LUIS ARIAS SCHEREIBER NRO. 202 (TDA-107-110) LIMA - LIMA - MIRAFLORES',
        latitude: -12.12220000,
        longitude: -77.01150000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10103,
        localCode: '561',
        name: 'BOLIVAR 2',
        description: 'BOLIVAR 2',
        address: 'AV. SIMON BOLIVAR NRO. 1001 LIMA - LIMA - PUEBLO LIBRE (MAGDALENA VIEJA)',
        latitude: -12.07230000,
        longitude: -77.06430000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10104,
        localCode: '313',
        name: 'MONTERRICO 1',
        description: 'MONTERRICO 1',
        address: 'AV. LA ENCALADA NRO. 640 URB. C. COMERCIAL MONTERRICO (MZ. R1 LOTE 10) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.10890000,
        longitude: -76.97220000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10105,
        localCode: '008',
        name: 'BOLÍVAR',
        description: 'BOLÍVAR',
        address: 'AV. UNIVERSITARIA NRO. 1899 DPTO. 2 (ESQ. CON AV. BOLIVAR NO. 2250) LIMA - LIMA - PUEBLO LIBRE (MAGDALENA VIEJA)',
        latitude: -12.07030000,
        longitude: -77.07780000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10106,
        localCode: '414',
        name: 'BRONZINO',
        description: 'BRONZINO',
        address: 'AV. SAN LUIS NRO. 1961 URB. SAN BORJA (TIENDA 1) LIMA - LIMA - SAN BORJA',
        latitude: -12.08860000,
        longitude: -76.99620000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10107,
        localCode: '491',
        name: 'REPUBLICA DE PANAMÁ',
        description: 'REPUBLICA DE PANAMÁ',
        address: 'AV. ANGAMOS ESTE NRO. 1298 (ESQ. CON REPUBLICA DE PANAMA) LIMA - LIMA - SURQUILLO',
        latitude: -12.11320000,
        longitude: -77.01850000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10108,
        localCode: '334',
        name: 'SANTA MARIA',
        description: 'SANTA MARIA',
        address: 'AV. CAMINOS DEL INCA NRO. 331 URB. CHACARILLA DEL ESTANQUE (TIENDA 103) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.11430000,
        longitude: -76.99160000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10109,
        localCode: '382',
        name: 'MATIER',
        description: 'MATIER',
        address: 'AV. AVIACION NRO. 2994 URB. SAN BORJA (MZ.H10 LT.14) LIMA - LIMA - SAN BORJA',
        latitude: -12.09960000,
        longitude: -77.00210000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10110,
        localCode: '359',
        name: 'LARCO II',
        description: 'LARCO II',
        address: 'AV. JOSE A. LARCO NRO. 747 LIMA - LIMA - MIRAFLORES',
        latitude: -12.12500000,
        longitude: -77.02940000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10111,
        localCode: '578',
        name: 'TUPAC AMARU II',
        description: 'TUPAC AMARU II',
        address: 'AV. TUPAC AMARU 3801 - NRO. 3803 URB. CARABAYLLO (MZ U - LOTE 5) LIMA - LIMA - COMAS',
        latitude: -11.97160000,
        longitude: -77.05770000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10112,
        localCode: '449',
        name: 'BELAUNDE 2',
        description: 'BELAUNDE 2',
        address: 'AV. V.A. BELAUNDE OESTE NRO. 300 URB. HUAQUILLAY II ETAPA (---) LIMA - LIMA - COMAS',
        latitude: -11.93900000,
        longitude: -77.05180000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10113,
        localCode: '566',
        name: 'LAS CASCADAS',
        description: 'LAS CASCADAS',
        address: 'AV. LA ALAMEDA DEL CORREGIDOR NRO. 1809 URB. LA ENSENADA (MZ. U LOTE 23) LIMA - LIMA - LA MOLINA',
        latitude: -12.10160000,
        longitude: -76.94930000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10114,
        localCode: '342',
        name: 'LA ROTONDA',
        description: 'LA ROTONDA',
        address: 'AV. LA MOLINA NRO. 1167 URB. SAN CESAR II ETAPA (TDA-140 , C.C. LA ROTONDA) LIMA - LIMA - LA MOLINA',
        latitude: -12.07340000,
        longitude: -76.95530000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10115,
        localCode: '421',
        name: 'CASSASA',
        description: 'CASSASA',
        address: 'AV. DEL PARQUE SUR NRO. 199 (ESQ. CALLE RICARDO J. ANGULO RAMIREZ) LIMA - LIMA - SAN ISIDRO',
        latitude: -12.10240000,
        longitude: -77.01560000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10116,
        localCode: '517',
        name: 'HABICH 2',
        description: 'HABICH 2',
        address: 'AV. EDUARDO DE HABICH NRO. 102 URB. INGENIERIA LIMA - LIMA - SAN MARTIN DE PORRES',
        latitude: -12.02330000,
        longitude: -77.05030000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10117,
        localCode: '393',
        name: 'EL GOLF',
        description: 'EL GOLF',
        address: 'AV. PEZET GRAL. JUAN ANTONIO NRO. 1391 (---) LIMA - LIMA - SAN ISIDRO',
        latitude: -12.10200000,
        longitude: -77.05220000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10118,
        localCode: '344',
        name: 'SUAREZ',
        description: 'SUAREZ',
        address: 'AV. ANGAMOS ESTE NRO. 400 LIMA - LIMA - MIRAFLORES',
        latitude: -12.11380000,
        longitude: -77.02720000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10119,
        localCode: '005',
        name: 'COMAS 1',
        description: 'COMAS 1',
        address: 'AV. TUPAC AMARU NRO. 987 URB. HUAQUILLAY LIMA - LIMA - COMAS',
        latitude: -11.95690000,
        longitude: -77.05300000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10120,
        localCode: '433',
        name: 'COLLIQUE',
        description: 'COLLIQUE',
        address: 'AV. TUPAC AMARU NRO. 5597 URB. SAN JUAN BAUTISTA (---) LIMA - LIMA - COMAS',
        latitude: -11.91400000,
        longitude: -77.04010000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10121,
        localCode: 'C15',
        name: 'STA ANITA LOS CHANCAS',
        description: 'STA ANITA LOS CHANCAS',
        address: 'AV. CHANCAS NRO. 486 COO. CHANCAS DE ANDAHUAYLAS (MZA. T LOTE. 03) LIMA - LIMA - SANTA ANITA',
        latitude: -12.03830000,
        longitude: -76.96550000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10122,
        localCode: '283',
        name: 'PASO 28 DE JULIO',
        description: 'PASO 28 DE JULIO',
        address: 'AV. 28 DE JULIO NRO. 1005 INT. 207 URB. SAN ANTONIO (INT.208,2PISO,PROYECTO PASO 28 DE JULIO) LIMA - LIMA - MIRAFLORES',
        latitude: -12.13560000,
        longitude: -77.02940000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10123,
        localCode: '340',
        name: 'SANTA ROSA',
        description: 'SANTA ROSA',
        address: 'AV. SAN MARTIN NRO. 498 (--) LIMA - LIMA - PUEBLO LIBRE (MAGDALENA VIEJA)',
        latitude: -12.07150000,
        longitude: -77.06170000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10124,
        localCode: '466',
        name: 'AZÁNGARO',
        description: 'AZÁNGARO',
        address: 'JR. CUSCO NRO. 397 LIMA - LIMA - LIMA',
        latitude: -12.05050000,
        longitude: -77.03040000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10125,
        localCode: '343',
        name: 'CIPRESES',
        description: 'CIPRESES',
        address: 'AV. DOS DE MAYO NRO. 999 LIMA - LIMA - SAN ISIDRO',
        latitude: -12.09180000,
        longitude: -77.04130000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10126,
        localCode: '450',
        name: 'MOLINA PLAZA',
        description: 'MOLINA PLAZA',
        address: 'AV. RAUL FERRERO REBAGLIATI NRO. 1205 URB. EL REMANSO DE LA MOLINA (MZA LT01 II ETAP LOCAL COMERC 1) LIMA - LIMA - LA MOLINA',
        latitude: -12.09120000,
        longitude: -76.95050000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10127,
        localCode: '628',
        name: 'HIGUERETA',
        description: 'HIGUERETA',
        address: 'AV. AVIACION NRO. 5113 TDA.6-7 (OVALO HIGUERETA) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.12770000,
        longitude: -77.00040000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10128,
        localCode: '326',
        name: 'LARCO',
        description: 'LARCO',
        address: 'AV. JOSE A. LARCO NRO. 129 LIMA - LIMA - MIRAFLORES',
        latitude: -12.11950000,
        longitude: -77.02870000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10129,
        localCode: '049',
        name: 'VILLA EL SALVADOR 1',
        description: 'VILLA EL SALVADOR 1',
        address: 'MZA. J LOTE. 23 COMITE 9, SECTOR 2 LIMA - LIMA - VILLA EL SALVADOR',
        latitude: -12.20980000,
        longitude: -76.93880000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10130,
        localCode: '721',
        name: 'SANTA ANITA 1B',
        description: 'SANTA ANITA 1B',
        address: 'AV. LOS EUCALIPTOS NRO. 988 LIMA - LIMA - SANTA ANITA',
        latitude: -12.04510000,
        longitude: -76.97430000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10131,
        localCode: '206',
        name: 'CAMACHO 1',
        description: 'CAMACHO 1',
        address: 'AV. JAVIER PRADO ESTE NRO. 4921 LOTE. 10 (MZA. L-2 TIENDA 01) LIMA - LIMA - LA MOLINA',
        latitude: -12.08160000,
        longitude: -76.96770000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10132,
        localCode: '957',
        name: 'BARRANCO II',
        description: 'BARRANCO II',
        address: 'CAL.UNION NRO. 102 (ESQ. AV. GRAU) LIMA - LIMA - BARRANCO',
        latitude: -12.14760000,
        longitude: -77.02130000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10133,
        localCode: '453',
        name: 'CONSTRUCTORES  2',
        description: 'CONSTRUCTORES  2',
        address: 'AV. LOS CONSTRUCTORES NRO. 1178 URB. SANTA PATRICIA III ETAPA (TIENDA 1 MZA-V LOTE-01) LIMA - LIMA - LA MOLINA',
        latitude: -12.06270000,
        longitude: -76.94580000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10134,
        localCode: '985',
        name: 'PLAZA NORTE 2',
        description: 'PLAZA NORTE 2',
        address: 'AV. ALFREDO MENDIOLA NRO. 1400 (C.C. PLAZA NORTE LOCAL 282 - 284) LIMA - LIMA - INDEPENDENCIA',
        latitude: -12.00600000,
        longitude: -77.05780000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10135,
        localCode: '632',
        name: 'RISSO 1B',
        description: 'RISSO 1B',
        address: 'JR. RISSO NRO. 173 LIMA - LIMA - LINCE',
        latitude: -12.08560000,
        longitude: -77.03470000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10136,
        localCode: '353',
        name: 'CASTILLA',
        description: 'CASTILLA',
        address: 'JR. CASTILLA NRO. 795 LIMA - LIMA - MAGDALENA DEL MAR',
        latitude: -12.08940000,
        longitude: -77.07320000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10137,
        localCode: '316',
        name: 'COMANDANTE ESPINAR',
        description: 'COMANDANTE ESPINAR',
        address: 'AV. COMANDANTE ESPINAR NRO. 850 LIMA - LIMA - MIRAFLORES',
        latitude: -12.11100000,
        longitude: -77.03670000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10138,
        localCode: '138',
        name: 'MF AVIACION 2',
        description: 'MF AVIACION 2',
        address: 'AV. AVIACION NRO. 2386 LIMA - LIMA - SAN BORJA',
        latitude: -12.08680000,
        longitude: -77.00400000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10139,
        localCode: '151',
        name: 'LAS VIOLETAS INDEPENDENCIA',
        description: 'LAS VIOLETAS INDEPENDENCIA',
        address: 'AV. LAS VIOLETAS NRO. 780A LIMA - LIMA - INDEPENDENCIA',
        latitude: -11.99820000,
        longitude: -77.05490000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10140,
        localCode: 'C69',
        name: 'AV. PERU  4 SMP',
        description: 'AV. PERU  4 SMP',
        address: 'AV. PERU NRO. 1798 URB. PERU (PERU) LIMA - LIMA - SAN MARTIN DE PORRES',
        latitude: -12.03200000,
        longitude: -77.06480000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10141,
        localCode: '021',
        name: 'CANADÁ 1',
        description: 'CANADÁ 1',
        address: 'AV. CANADA NRO. 3201 LIMA - LIMA - SAN LUIS',
        latitude: -12.08230000,
        longitude: -76.99710000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10142,
        localCode: '645',
        name: 'RIMAC 2',
        description: 'RIMAC 2',
        address: 'AV. ALCAZAR NRO. 668 URB. EL MANZANO LIMA - LIMA - RIMAC',
        latitude: -12.02850000,
        longitude: -77.03140000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10143,
        localCode: '567',
        name: 'SAN FELIPE COMAS',
        description: 'SAN FELIPE COMAS',
        address: 'AV. UNIVERSITARIA NORTE 10599 MZA. X LOTE. 2 URB. SAN FELIPE (N10599 AV.SAN FELIPE 803-807 2DA. ETAPA) LIMA - LIMA - COMAS',
        latitude: -11.90090000,
        longitude: -77.04020000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10144,
        localCode: '023',
        name: 'CHACARILLA',
        description: 'CHACARILLA',
        address: 'AV. PROLG. PRIMAVERA NRO. 400 LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.11120000,
        longitude: -76.98930000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10145,
        localCode: '532',
        name: 'SANTA LUZMILA',
        description: 'SANTA LUZMILA',
        address: 'AV. G. DE LA FUENTE NRO. 309 URB. SANTA LUZMILA (TAMBIEN 311 MZ.S LT 24) LIMA - LIMA - COMAS',
        latitude: -11.94160000,
        longitude: -77.06190000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10146,
        localCode: '482',
        name: 'CANAVAL Y MOREYRA',
        description: 'CANAVAL Y MOREYRA',
        address: 'AV. CANAVAL Y MOREYRA NRO. 295 LIMA - LIMA - SAN ISIDRO',
        latitude: -12.09690000,
        longitude: -77.02330000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10147,
        localCode: '728',
        name: 'ZARATE 2',
        description: 'ZARATE 2',
        address: 'JR. PIRAMIDE DEL SOL NRO. 401 URB. ZARATE (ESQ.AV.CHIMU NÂ°709) LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -12.02570000,
        longitude: -77.00190000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10148,
        localCode: '020',
        name: 'TARAPACÁ',
        description: 'TARAPACÁ',
        address: 'AV. TNTE FELIPE ARANCIBIA NRO. 777 URB. VENTURA ROSSI LIMA - LIMA - RIMAC',
        latitude: -12.02740000,
        longitude: -77.03380000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10149,
        localCode: '713',
        name: 'VILLARAN 1',
        description: 'VILLARAN 1',
        address: 'AV. MANUEL VICENTE VILLARAN NRO. 828 URB. LOS SAUCES (830 TDA.113-115 EDIFICIO B SEGUNDA ETAPA) LIMA - LIMA - SURQUILLO',
        latitude: -12.12090000,
        longitude: -77.00320000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10150,
        localCode: 'B19',
        name: 'SAN JUAN DE MIRAFLORES 3',
        description: 'SAN JUAN DE MIRAFLORES 3',
        address: 'AV. SAN JUAN NRO. 1099 LIMA - LIMA - SAN JUAN DE MIRAFLORES',
        latitude: -12.15520000,
        longitude: -76.97240000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10151,
        localCode: 'T89',
        name: 'LA MOLINA LOS CONDORES',
        description: 'LA MOLINA LOS CONDORES',
        address: 'AV. LOS CONDORES NRO. 688 (MZA. B -LOTE 23 TAMBIEN 690) LIMA - LIMA - LA MOLINA',
        latitude: -12.10080000,
        longitude: -76.94370000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10152,
        localCode: 'B96',
        name: 'AV LA MOLINA  1',
        description: 'AV LA MOLINA  1',
        address: 'AV. LA MOLINA NRO. 844 URB. A.RESIDENCIAL MONTERRICO (TIENDA 3) LIMA - LIMA - LA MOLINA',
        latitude: -12.06900000,
        longitude: -76.95810000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10153,
        localCode: '619',
        name: 'JESUS MARIA',
        description: 'JESUS MARIA',
        address: 'AV. ARNALDO MARQUEZ NRO. 1379 LIMA - LIMA - JESUS MARIA',
        latitude: -12.07450000,
        longitude: -77.05010000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10154,
        localCode: '004',
        name: 'FAUCETT',
        description: 'FAUCETT',
        address: 'AV. ELMER FAUCETT NRO. 543 LIMA - LIMA - SAN MIGUEL',
        latitude: -12.06390000,
        longitude: -77.09740000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10155,
        localCode: '031',
        name: 'BARRANCO',
        description: 'BARRANCO',
        address: 'AV. ALMTE.MIGUEL GRAU NRO. 570 LIMA - LIMA - BARRANCO',
        latitude: -12.14610000,
        longitude: -77.02160000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10156,
        localCode: 'E11',
        name: 'INDEPENDENCIA  ROYAL PLAZA',
        description: 'INDEPENDENCIA  ROYAL PLAZA',
        address: 'AV. CARLOS IZAGUIRRE NRO. 287 INT. 1-A (N.289 CC. ROYAL PLAZA ,1ER NIVEL) LIMA - LIMA - INDEPENDENCIA',
        latitude: -11.99000000,
        longitude: -77.06260000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10157,
        localCode: '565',
        name: 'PARDO',
        description: 'PARDO',
        address: 'AV. JOSE PARDO NRO. 620 INT. 6 LIMA - LIMA - MIRAFLORES',
        latitude: -12.11890000,
        longitude: -77.03490000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10158,
        localCode: '346',
        name: 'SIMON SALGUERO',
        description: 'SIMON SALGUERO',
        address: 'JR. SALGUERO SIMON NRO. 588 URB. EL ROSAL (MZ. G1 - LOTE 10) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.13050000,
        longitude: -77.00780000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10159,
        localCode: '680',
        name: 'ANGAMOS',
        description: 'ANGAMOS',
        address: 'AV. AVIACION NRO. 3704 LIMA - LIMA - SURQUILLO',
        latitude: -12.11200000,
        longitude: -77.00050000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10160,
        localCode: '960',
        name: 'REMIGNTON SAN BORJA',
        description: 'REMIGNTON SAN BORJA',
        address: 'JR. FREDERICK REMINGTON NRO. 204 URB. CORPAC (ESQ. JR. PIETRO TORRIGIANO) LIMA - LIMA - SAN BORJA',
        latitude: -12.09890000,
        longitude: -77.01120000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10161,
        localCode: '374',
        name: 'GUARDIA CIVIL',
        description: 'GUARDIA CIVIL',
        address: 'AV. GUARDIA CIVIL NRO. 297 LIMA - LIMA - SAN BORJA',
        latitude: -12.09120000,
        longitude: -77.00830000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10162,
        localCode: '756',
        name: 'MOLICENTRO 1',
        description: 'MOLICENTRO 1',
        address: 'AV. LA MOLINA NRO. 2810 URB. EL SAUCE DE LA RINCONADA (TIENDAS 1 Y 2 MZA. D - LOTE 01) LIMA - LIMA - LA MOLINA',
        latitude: -12.08240000,
        longitude: -76.92820000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10163,
        localCode: '053',
        name: 'SALAMANCA',
        description: 'SALAMANCA',
        address: 'AV. LOS PARACAS NRO. 206C URB. LOS RECAUDADORES (MZA B LOTE 10 SALAMANCA) LIMA - LIMA - ATE',
        latitude: -12.07620000,
        longitude: -76.98800000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10164,
        localCode: 'B91',
        name: 'AV LOS PROCERES PRO',
        description: 'AV LOS PROCERES PRO',
        address: 'AV. LOS PROCERES MZA. LL4 LOTE. 21 URB. PRO (SECTOR 4, 1 RA ETAPA) LIMA - LIMA - LOS OLIVOS',
        latitude: -11.93780000,
        longitude: -77.07270000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10165,
        localCode: '740',
        name: 'CAVENECIA',
        description: 'CAVENECIA',
        address: 'AV. EMILIO CAVENECIA NRO. 302 (ESQUINA CON LORD COCHRANE) LIMA - LIMA - SAN ISIDRO',
        latitude: -12.10810000,
        longitude: -77.03900000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10166,
        localCode: '156',
        name: 'CAMINOS DEL INCA 02 - Surco',
        description: 'CAMINOS DEL INCA 02 - Surco',
        address: 'AV. CAMINOS DEL INCA NRO. 1504 (TIENDA N.19) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.12530000,
        longitude: -76.98340000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10167,
        localCode: '097',
        name: 'ROSA TORO',
        description: 'ROSA TORO',
        address: 'AV. AGUSTIN DE LA ROSA TORO NRO. 995 URB. SAN LUIS (CON AV. CANADA 3505) LIMA - LIMA - SAN LUIS',
        latitude: -12.08080000,
        longitude: -76.99350000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10168,
        localCode: '033',
        name: 'MONTERRICO',
        description: 'MONTERRICO',
        address: 'AV. ANGAMOS ESTE NRO. 2209 URB. LIMA POLO HUNT LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.10480000,
        longitude: -76.96540000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10169,
        localCode: '284',
        name: 'LA RAMBLA  BRASIL',
        description: 'LA RAMBLA  BRASIL',
        address: 'AV. JUAN PABLO FERNANDINI NRO. 767 (LC. 134-C.C. LA RAMBLA BRASIL) LIMA - LIMA - BREÃ‘A',
        latitude: -12.06630000,
        longitude: -77.04810000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10170,
        localCode: 'A06',
        name: 'CHORRILLOS METRO',
        description: 'CHORRILLOS METRO',
        address: 'AV. PRO PASEO DE LA REPUBLICA NRO. S/N URB. MATELLINI (LOC. 1104 T. METRO) LIMA - LIMA - CHORRILLOS',
        latitude: -12.17280000,
        longitude: -77.01280000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10171,
        localCode: '096',
        name: 'BENAVIDES 1',
        description: 'BENAVIDES 1',
        address: 'AV. BENAVIDES NRO. 1398 URB. SAN ANTONIO LIMA - LIMA - MIRAFLORES',
        latitude: -12.12660000,
        longitude: -77.01820000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10172,
        localCode: '153',
        name: 'ARAMBURU',
        description: 'ARAMBURU',
        address: 'AV. ANDRES ARAMBURU NRO. 211 LIMA - LIMA - SAN ISIDRO',
        latitude: -12.10320000,
        longitude: -77.03030000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10173,
        localCode: 'B93',
        name: 'URB ELIO CERCADO',
        description: 'URB ELIO CERCADO',
        address: 'AV. ROBERTO THORNDIKE NRO. 1424 URB. ELIO (NROS:1424-1428 MZ-M1, LT-2) LIMA - LIMA - LIMA',
        latitude: -12.05520000,
        longitude: -77.06930000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10174,
        localCode: '109',
        name: 'HUAYLAS 2',
        description: 'HUAYLAS 2',
        address: 'AV. DEFENSORES DEL MORRO NRO. 407 (C/. AV.ALEJANDRO IGLESIAS NRO:495) LIMA - LIMA - CHORRILLOS',
        latitude: -12.16790000,
        longitude: -77.02510000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10175,
        localCode: '409',
        name: 'MARQUEZ',
        description: 'MARQUEZ',
        address: 'AV. JOSE ARNALDO MARQUEZ NRO. 1301 (1309) LIMA - LIMA - JESUS MARIA',
        latitude: -12.07370000,
        longitude: -77.04950000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10176,
        localCode: '636',
        name: 'LA MOLINA 1',
        description: 'LA MOLINA 1',
        address: 'AV. LA MOLINA NRO. 894 URB. AMP. RESID. MONTERRICO LIMA - LIMA - LA MOLINA',
        latitude: -12.06940000,
        longitude: -76.95790000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10177,
        localCode: '121',
        name: 'AV ABANCAY/ CUSCO',
        description: 'AV ABANCAY/ CUSCO',
        address: 'AV. ABANCAY NRO. 601 LIMA - LIMA - LIMA',
        latitude: -12.05200000,
        longitude: -77.02870000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10178,
        localCode: '140',
        name: 'PEDRO VENTURO',
        description: 'PEDRO VENTURO',
        address: 'AV. PEDRO VENTURO NRO. 558 LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.12230000,
        longitude: -76.99240000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10179,
        localCode: '611',
        name: 'LA ENCALADA',
        description: 'LA ENCALADA',
        address: 'AV. LA ENCALADA NRO. 604 INT. 08 URB. CENT.COMERCIAL MONTERRICO LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.10910000,
        longitude: -76.97230000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10180,
        localCode: '531',
        name: 'MAGDALENA 1F',
        description: 'MAGDALENA 1F',
        address: 'JR. LEONCIO PRADO NRO. 700 (702 EX.CAP. DE NAVIO ULISES DEL BOY) LIMA - LIMA - MAGDALENA DEL MAR',
        latitude: -12.09160000,
        longitude: -77.07280000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10181,
        localCode: '877',
        name: 'CENTRO CIVICO REAL PLAZA',
        description: 'CENTRO CIVICO REAL PLAZA',
        address: 'AV. INCA GARCILASO DE LA VEGA NRO. 1337 (C.C REAL PLAZA CENTRO CIVICO LC-158) LIMA - LIMA - LIMA',
        latitude: -12.05700000,
        longitude: -77.03790000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10182,
        localCode: 'T18',
        name: 'SAN MIGUEL  LA MARINA',
        description: 'SAN MIGUEL  LA MARINA',
        address: 'AV. LA MARINA NRO. 2605 (INTERSECCION CON CALLE PADRE URRACA) LIMA - LIMA - SAN MIGUEL',
        latitude: -12.07810000,
        longitude: -77.09130000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10183,
        localCode: '251',
        name: 'RESID. SAN FELIPE',
        description: 'RESID. SAN FELIPE',
        address: 'NRO. SN RES. SAN FELIPE (EDIF. CENTRO COMERCIAL TIENDA 20) LIMA - LIMA - JESUS MARIA',
        latitude: -12.08770000,
        longitude: -77.05400000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10184,
        localCode: '368',
        name: 'EL POLO',
        description: 'EL POLO',
        address: 'AV. LIMA POLO NRO. 740 RES. LIMA POLO AND HUNT CLUB (TDA.131A LOTE 11) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.10080000,
        longitude: -76.97130000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10185,
        localCode: '547',
        name: 'REBAGLIATI',
        description: 'REBAGLIATI',
        address: 'AV. FRANCISCO DE ZELA NRO. 1401 (AV.EDGARDO REBAGLIATI 499 - 495) LIMA - LIMA - JESUS MARIA',
        latitude: -12.08000000,
        longitude: -77.04030000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10186,
        localCode: '018',
        name: 'REP. DOMINICANA',
        description: 'REP. DOMINICANA',
        address: 'AV. REPUBLICA DOMINICANA NRO. 291 LIMA - LIMA - JESUS MARIA',
        latitude: -12.07350000,
        longitude: -77.04960000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10187,
        localCode: '105',
        name: 'SURCO PUEBLO',
        description: 'SURCO PUEBLO',
        address: 'JR. BATALLA AYACUCHO NRO. 325 P.J. BATALLA DE AYACUCHO (Y JR. SAENZ PEÃ‘A 297) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.14520000,
        longitude: -77.00400000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10188,
        localCode: '613',
        name: 'PUEBLO LIBRE',
        description: 'PUEBLO LIBRE',
        address: 'AV. BOLIVAR NRO. 910 LIMA - LIMA - PUEBLO LIBRE (MAGDALENA VIEJA)',
        latitude: -12.07150000,
        longitude: -77.06180000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10189,
        localCode: '605',
        name: 'SAN LUIS 1',
        description: 'SAN LUIS 1',
        address: 'AV. SAN LUIS NRO. 2022 (TAMBIEN 2024 Y 2026) LIMA - LIMA - SAN BORJA',
        latitude: -12.09050000,
        longitude: -76.99630000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10190,
        localCode: '030',
        name: 'LA AURORA',
        description: 'LA AURORA',
        address: 'CAL.LUIS ARIAS SCHEREIBER NRO. 183 URB. AURORA LIMA - LIMA - MIRAFLORES',
        latitude: -12.12250000,
        longitude: -77.01170000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10191,
        localCode: 'B22',
        name: 'BRASIL 4',
        description: 'BRASIL 4',
        address: 'AV. BRASIL NRO. 2714 LIMA - LIMA - PUEBLO LIBRE (MAGDALENA VIEJA)',
        latitude: -12.08440000,
        longitude: -77.06170000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10192,
        localCode: 'B33',
        name: 'BELLAVISTA  2',
        description: 'BELLAVISTA  2',
        address: 'AV. MCAL CASTILLA R.BENAVIDES NRO. 3866 URB. EL AGUILA (MALL AVENTURA PLAZA) PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - BELLAVISTA',
        latitude: -12.05546431,
        longitude: -77.10231028,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10193,
        localCode: '060',
        name: 'VENTANILLA 1',
        description: 'VENTANILLA 1',
        address: 'CAL.DOS MZA. 1 LOTE. 8B PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - VENTANILLA',
        latitude: -11.87328931,
        longitude: -77.12603509,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10194,
        localCode: '079',
        name: 'MINKA',
        description: 'MINKA',
        address: 'AV. UNO NRO. 233 CENTRO COMERCIAL MINKA (PABELLON N.2) PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - CALLAO',
        latitude: -12.04851443,
        longitude: -77.11026438,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10195,
        localCode: '091',
        name: 'SAN JOSE',
        description: 'SAN JOSE',
        address: 'AV. ELMER FAUCETT NRO. 300 (TAMB.302 AV. PRIMERO DE MAYO N. 100-104) PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - CARMEN DE LA LEGUA REYNOSO',
        latitude: -12.04131452,
        longitude: -77.09849585,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10196,
        localCode: '188',
        name: 'DOMINICOS',
        description: 'DOMINICOS',
        address: 'AV. LOS DOMINICOS NRO. 502 URB. SESQUICENTENARIO (CON CALLE LOS NOGALES 103) PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - CALLAO',
        latitude: -12.01009000,
        longitude: -77.09700000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10197,
        localCode: '159',
        name: 'SAENZ PEÑA  2',
        description: 'SAENZ PEÑA  2',
        address: 'AV. SAENZ PEÑA NRO. 402 (N.404 CALLE MARCO POLO N.105) PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - CALLAO',
        latitude: -12.06098939,
        longitude: -77.14291491,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10198,
        localCode: '145',
        name: 'VENTANILLA 2',
        description: 'VENTANILLA 2',
        address: 'MZA. C8 LOTE. 18 URB. EX ZONA COMERCIAL PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - VENTANILLA',
        latitude: -11.87563622,
        longitude: -77.12694235,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10199,
        localCode: '137',
        name: 'SAENZ PEÑA',
        description: 'SAENZ PEÑA',
        address: 'AV. SAENZ PEÑA NRO. 701 PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - CALLAO',
        latitude: -12.06022544,
        longitude: -77.13839404,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10200,
        localCode: '112',
        name: 'BOCANEGRA',
        description: 'BOCANEGRA',
        address: 'AV. BOCANEGRA MZA. Ã‘ LOTE. 16 URB. RESIDENCIAL SANTA ROSA PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - CALLAO',
        latitude: -12.00724003,
        longitude: -77.10071672,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10201,
        localCode: 'A22',
        name: 'BAJADA BALTA WONG',
        description: 'BAJADA BALTA WONG',
        address: 'MLC.BALTA NRO. 650 INT. 201 (T. WONG LOC 2016) LIMA - LIMA - MIRAFLORES',
        latitude: -12.12304370,
        longitude: -77.03212350,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10202,
        localCode: 'A21',
        name: 'BENAVIDES CDRA 14 WONG',
        description: 'BENAVIDES CDRA 14 WONG',
        address: 'AV. ALFREDO BENAVIDES NRO. 1475 URB. SAN ANTONIO (T WONG LOC 1102) LIMA - LIMA - MIRAFLORES',
        latitude: -12.12613810,
        longitude: -77.01800210,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10203,
        localCode: 'A20',
        name: 'LA AURORA WONG',
        description: 'LA AURORA WONG',
        address: 'JR. LUIS ARIAS SCHREIBER NRO. 270 URB. LA AURORA (T WONG LOC 1124) LIMA - LIMA - MIRAFLORES',
        latitude: -12.12136510,
        longitude: -77.01130960,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10204,
        localCode: '699',
        name: 'RICARDO PALMA 1',
        description: 'RICARDO PALMA 1',
        address: 'AV. RICARDO PALMA NRO. 302 LIMA - LIMA - MIRAFLORES',
        latitude: -12.11925105,
        longitude: -77.02664953,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10205,
        localCode: 'B09',
        name: 'PUENTE PIEDRA 3',
        description: 'PUENTE PIEDRA 3',
        address: 'AV. JUAN LECAROS NRO. 161 (1ER PISO) LIMA - LIMA - PUENTE PIEDRA',
        latitude: -11.86520014,
        longitude: -77.07559548,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10206,
        localCode: '019',
        name: 'PUENTE PIEDRA',
        description: 'PUENTE PIEDRA',
        address: 'AV. J LECAROS NRO. 149 LIMA - LIMA - PUENTE PIEDRA',
        latitude: -11.86513189,
        longitude: -77.07538761,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10207,
        localCode: '494',
        name: 'PUENTE PIEDRA 1',
        description: 'PUENTE PIEDRA 1',
        address: 'AV. PUENTE PIEDRA MZA. C LOTE. 02 (ESQ. AV.SANTA LUCIA) LIMA - LIMA - PUENTE PIEDRA',
        latitude: -11.86534287,
        longitude: -77.07436703,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10208,
        localCode: '789',
        name: 'CANTO GRANDE 3',
        description: 'CANTO GRANDE 3',
        address: 'AV. CANTO GRANDE NRO. 3701 (A.A.H.H UPIS HUASCAR) LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -11.96794495,
        longitude: -77.00430069,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10209,
        localCode: '380',
        name: 'CANTO GRANDE 2',
        description: 'CANTO GRANDE 2',
        address: 'AV. SAN MARTIN DE PORRES NRO. 123 COO. CANTO (TAMBIEN 125 MZ. H-1 LT.9) LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -11.96801645,
        longitude: -77.00489413,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10210,
        localCode: '003',
        name: 'HUALLAGA',
        description: 'HUALLAGA',
        address: 'JR. HUALLAGA NRO. 630 LIMA - LIMA - LIMA',
        latitude: -12.04961844,
        longitude: -77.02600881,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10211,
        localCode: 'C07',
        name: 'JR. HUALLAGA 2',
        description: 'JR. HUALLAGA 2',
        address: 'JR. HUALLAGA NRO. 670 (CERCADO) LIMA - LIMA - LIMA',
        latitude: -12.04985419,
        longitude: -77.02574965,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10212,
        localCode: '088',
        name: 'ARENALES',
        description: 'ARENALES',
        address: 'AV. ARENALES NRO. 801 URB. LIMA (JUAN ANTONIO ALVAREZ) LIMA - LIMA - LIMA',
        latitude: -12.07268051,
        longitude: -77.03731500,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10213,
        localCode: '107',
        name: 'AV. AREQUIPA 1',
        description: 'AV. AREQUIPA 1',
        address: 'AV. AREQUIPA NRO. 1299 URB. SANTA BEATRIZ LIMA - LIMA - LIMA',
        latitude: -12.07766362,
        longitude: -77.03531574,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10214,
        localCode: '011',
        name: 'MAGDALENA',
        description: 'MAGDALENA',
        address: 'JR. JOSE GALVEZ NRO. 502 LIMA - LIMA - MAGDALENA DEL MAR',
        latitude: -12.09050930,
        longitude: -77.07261590,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10215,
        localCode: 'A34',
        name: 'LA MARINA  METRO',
        description: 'LA MARINA  METRO',
        address: 'AV. LA MARINA NRO. S/N (ESQ PQ DE LAS LEYENDAS T METRO L 1172) LIMA - LIMA - SAN MIGUEL',
        latitude: -12.07675410,
        longitude: -77.08918820,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10216,
        localCode: 'A33',
        name: 'SAN MIGUEL  WONG',
        description: 'SAN MIGUEL  WONG',
        address: 'AV. LA MARINA NRO. S/N (CDR 20 CC PLAZA SAN MIGUEL T WONG L 1104) LIMA - LIMA - SAN MIGUEL',
        latitude: -12.07693090,
        longitude: -77.08184700,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10217,
        localCode: '431',
        name: 'TOTTUS LA MARINA',
        description: 'TOTTUS LA MARINA',
        address: 'AV. LA MARINA NRO. 2355 INT. ---- (TDA 09) LIMA - LIMA - SAN MIGUEL',
        latitude: -12.07913404,
        longitude: -77.08820052,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10218,
        localCode: '212',
        name: 'AV DEL EJERCITO 1',
        description: 'AV DEL EJERCITO 1',
        address: 'AV. DEL EJERCITO NRO. 1290 URB. ORRANTIA DEL MAR (ESQ. CALLE LUIS MANNARELLI) LIMA - LIMA - MAGDALENA DEL MAR',
        latitude: -12.10240239,
        longitude: -77.05897417,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10219,
        localCode: '928',
        name: 'AV. PERU  3 SMP',
        description: 'AV. PERU  3 SMP',
        address: 'AV. PERU NRO. 3622 URB. PERU (MZA. 2 LOTE 9) LIMA - LIMA - SAN MARTIN DE PORRES',
        latitude: -12.03062873,
        longitude: -77.08678063,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10220,
        localCode: '790',
        name: 'HUANDOY',
        description: 'HUANDOY',
        address: 'AV. HUANDOY MZA. 71 LOTE. 1 LIMA - LIMA - LOS OLIVOS',
        latitude: -11.95924524,
        longitude: -77.07585566,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10221,
        localCode: '367',
        name: 'CAYETANO HEREDIA',
        description: 'CAYETANO HEREDIA',
        address: 'AV. DELGADO HONORIO NRO. 345 URB. INGENIERIA (TAMBIEN 343) LIMA - LIMA - SAN MARTIN DE PORRES',
        latitude: -12.02340970,
        longitude: -77.05535310,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10222,
        localCode: '166',
        name: 'AV.NARANJAL',
        description: 'AV.NARANJAL',
        address: 'AV. NARANJAL MZA. F3 LOTE. 26 URB. EL PARQUE DE NARANJAL LIMA - LIMA - LOS OLIVOS',
        latitude: -11.97641905,
        longitude: -77.08323777,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10223,
        localCode: '100',
        name: 'LOS OLIVOS 1',
        description: 'LOS OLIVOS 1',
        address: 'AV. ANTUNEZ DE MAYOLO NRO. 1198 (TIENDA 12) LIMA - LIMA - LOS OLIVOS',
        latitude: -11.99484686,
        longitude: -77.07686383,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10224,
        localCode: '110',
        name: 'PRO',
        description: 'PRO',
        address: 'AV. PROCERES NRO. 7885 LIMA - LIMA - LOS OLIVOS',
        latitude: -11.93760923,
        longitude: -77.07281370,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10225,
        localCode: '778',
        name: 'GAMARRA II',
        description: 'GAMARRA II',
        address: 'AV. ANTONIO BAZO NRO. 706 LIMA - LIMA - LA VICTORIA',
        latitude: -12.06547173,
        longitude: -77.01435160,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10226,
        localCode: '672',
        name: 'GAMARRA',
        description: 'GAMARRA',
        address: 'AV. GAMARRA NRO. 686 LIMA - LIMA - LA VICTORIA',
        latitude: -12.06511862,
        longitude: -77.01351274,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10227,
        localCode: '122',
        name: 'PALERMO',
        description: 'PALERMO',
        address: 'AV. PALERMO NRO. 546 URB. BALCONCILLO LIMA - LIMA - LA VICTORIA',
        latitude: -12.08104116,
        longitude: -77.02330716,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10228,
        localCode: 'A28',
        name: '2 DE MAYO WONG',
        description: '2 DE MAYO WONG',
        address: 'AV. DOS DE MAYO NRO. 1099 (T. WONG LOC. 1130) LIMA - LIMA - SAN ISIDRO',
        latitude: -12.09196655,
        longitude: -77.04199076,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10229,
        localCode: 'A27',
        name: 'LIMATAMBO METRO',
        description: 'LIMATAMBO METRO',
        address: 'CAL.JOSE ALVAREZ CALDERON MZA. 1 LOTE. B-2 (CDRA. 2 T DE LIMATAMBO T. METRO LOC 1108) LIMA - LIMA - SAN BORJA',
        latitude: -12.11039726,
        longitude: -77.00244159,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10230,
        localCode: '037',
        name: 'PEZET',
        description: 'PEZET',
        address: 'AV. GENERAL PEZET NRO. 1499 LIMA - LIMA - SAN ISIDRO',
        latitude: -12.10266137,
        longitude: -77.05392994,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10231,
        localCode: '770',
        name: 'LAS BEGONIAS 1B',
        description: 'LAS BEGONIAS 1B',
        address: 'CAL.LAS BEGONIAS NRO. S/N INT. 01 (ESQ.RIVERA NAVARRETE INT. TOTTUS) LIMA - LIMA - SAN ISIDRO',
        latitude: -12.09532260,
        longitude: -77.02529870,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10232,
        localCode: '624',
        name: 'DASSO',
        description: 'DASSO',
        address: 'AV. MIGUEL DASSO NRO. 193 URB. CHACARILLA SANTA CRUZ (195) LIMA - LIMA - SAN ISIDRO',
        latitude: -12.10698770,
        longitude: -77.04006340,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10233,
        localCode: '602',
        name: 'AVIACION 3468',
        description: 'AVIACION 3468',
        address: 'AV. AVIACION NRO. 3468 C.H. TORRES DE LIMATAMBO LIMA - LIMA - SAN BORJA',
        latitude: -12.10657400,
        longitude: -77.00126600,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10234,
        localCode: '402',
        name: 'SAN BORJA SUR',
        description: 'SAN BORJA SUR',
        address: 'AV. SAN BORJA SUR NRO. 898 URB. SAN BORJA (MZ. D14 - LT. 13) LIMA - LIMA - SAN BORJA',
        latitude: -12.10069114,
        longitude: -76.99485462,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10235,
        localCode: '089',
        name: 'RICARDO PALMA',
        description: 'RICARDO PALMA',
        address: 'AV. JAVIER PRADO NRO. 1110 URB. CORPAC LIMA - LIMA - SAN ISIDRO',
        latitude: -12.09031228,
        longitude: -77.01721754,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10236,
        localCode: 'E24',
        name: 'ÑAÑA AV. HUASCAR',
        description: 'ÑAÑA AV. HUASCAR',
        address: 'AV HUASCAR 100  -  CHACLACAYO',
        latitude: -11.98901148,
        longitude: -76.81879207,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10237,
        localCode: '043',
        name: 'HUAYCAN 1',
        description: 'HUAYCAN 1',
        address: 'AV. 15 DE JULIO LOTE. 22 ZONA B LIMA - LIMA - ATE',
        latitude: -12.01157963,
        longitude: -76.82357680,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10238,
        localCode: '710',
        name: 'CHOSICA 3',
        description: 'CHOSICA 3',
        address: 'AV. 28 DE JULIO LOTE. 16 (ESQ. CON MOYOBAMBA) LIMA - LIMA - LURIGANCHO',
        latitude: -11.93549000,
        longitude: -76.69375000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10239,
        localCode: '564',
        name: 'HUAYCAN',
        description: 'HUAYCAN',
        address: 'AV. 15 DE JULIO NRO. 592 (ZONA A 1ER PISO) LIMA - LIMA - ATE',
        latitude: -12.07228670,
        longitude: -76.82505570,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10240,
        localCode: '529',
        name: 'CHOSICA 2',
        description: 'CHOSICA 2',
        address: 'AV. 28 DE JULIO NRO. 170 (LURIGANCHO - CHOSICA) LIMA - LIMA - LURIGANCHO',
        latitude: -11.93538000,
        longitude: -76.69372000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10241,
        localCode: '233',
        name: 'CHOSICA HOSPITAL',
        description: 'CHOSICA HOSPITAL',
        address: 'JR. AREQUIPA NRO. 243 (LURIGANCHO CHOSICA) LIMA - LIMA - LURIGANCHO',
        latitude: -11.93461697,
        longitude: -76.69351447,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10242,
        localCode: '190',
        name: 'CERES 2',
        description: 'CERES 2',
        address: 'AV. PROLONGACION JAVIER PRADO MZA. A LOTE. 01 (ASOCIACION DE VIVIENDA BELLO HORIZONTE) LIMA - LIMA - ATE',
        latitude: -12.03193546,
        longitude: -76.92631982,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10243,
        localCode: '174',
        name: 'CHACLACAYO',
        description: 'CHACLACAYO',
        address: 'AV. NICOLAS AYLLON NRO. 459 LIMA - LIMA - CHACLACAYO',
        latitude: -11.97648596,
        longitude: -76.77299537,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10244,
        localCode: '101',
        name: 'CERES',
        description: 'CERES',
        address: 'AV. JAVIER PRADO MZA. A LOTE. 1 (ASOCIACION BELLO HORIZONTE) LIMA - LIMA - ATE',
        latitude: -12.03204662,
        longitude: -76.92640029,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10245,
        localCode: '103',
        name: 'HUAYCAN 2',
        description: 'HUAYCAN 2',
        address: 'AV. JOSE CARLOS MARIATEGUI NRO. 1 A.H. PROYECTO ESPECIAL HUAYCAN (POR LA IZQUIERDA AVENIDA 15 DE JULIO) LIMA - LIMA - ATE',
        latitude: -12.01344750,
        longitude: -76.82492190,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10246,
        localCode: '127',
        name: 'ATE',
        description: 'ATE',
        address: 'AV. NICOLAS AYLLON NRO. 5522 (ASOC VIVIENDA VILLA VITARTE MZ A LT 16) LIMA - LIMA - ATE',
        latitude: -12.02871896,
        longitude: -76.92356654,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10247,
        localCode: 'C14',
        name: 'SAN JUAN DE MIRAFLORES 4',
        description: 'SAN JUAN DE MIRAFLORES 4',
        address: 'AV. MIGUEL IGLESIAS NRO. 965 LIMA - LIMA - SAN JUAN DE MIRAFLORES',
        latitude: -12.16024042,
        longitude: -76.95912894,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10248,
        localCode: '276',
        name: 'VILLA EL SALVADOR 2',
        description: 'VILLA EL SALVADOR 2',
        address: 'MZA. P LOTE. 1 P.J. VILLA EL SALVADOR SECTOR3 (GRUPO 7) LIMA - LIMA - VILLA EL SALVADOR',
        latitude: -12.21283732,
        longitude: -76.93532266,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10249,
        localCode: '218',
        name: 'PACHACUTEC 2',
        description: 'PACHACUTEC 2',
        address: 'AV. PACHACUTEC 2890 MZA. 24C LOTE. 3 (SECTOR MICAELA BASTIDAS) LIMA - LIMA - VILLA MARIA DEL TRIUNFO',
        latitude: -12.17303461,
        longitude: -76.94852684,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10250,
        localCode: '099',
        name: 'SAN JUAN DE MIRAFLORES 2',
        description: 'SAN JUAN DE MIRAFLORES 2',
        address: 'AV. MIGUEL IGLESIAS NRO. 971B (MIGUEL IGLESIAS 973) LIMA - LIMA - SAN JUAN DE MIRAFLORES',
        latitude: -12.16010669,
        longitude: -76.95902266,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10251,
        localCode: 'A14',
        name: 'CAMACHO WONG',
        description: 'CAMACHO WONG',
        address: 'AV. JAVIER PRADO ESTE NRO. 5055 URB. CAMACHO (T. WONG LOC 1112) LIMA - LIMA - LA MOLINA',
        latitude: -12.08067000,
        longitude: -76.96701000,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10252,
        localCode: '034',
        name: 'CONSTRUCTORES 1',
        description: 'CONSTRUCTORES 1',
        address: 'AV. LOS CONSTRUCTORES NRO. 1198 INT. TD5 URB. COVIMA (TIENDA 5) LIMA - LIMA - LA MOLINA',
        latitude: -12.06251110,
        longitude: -76.94550200,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10253,
        localCode: 'A00',
        name: 'RAUL FERRERO WONG',
        description: 'RAUL FERRERO WONG',
        address: 'CAL.LAS RETAMAS NRO. 190 URB. LOS SIRIUS II ETAPA (T. WONG LOC 1102) LIMA - LIMA - LA MOLINA',
        latitude: -12.09189980,
        longitude: -76.95090290,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10254,
        localCode: '074',
        name: 'LOS FRESNOS',
        description: 'LOS FRESNOS',
        address: 'AV. LOS FRESNOS NRO. 994 URB. LA ENSENADA LIMA - LIMA - LA MOLINA',
        latitude: -12.10038266,
        longitude: -76.94399457,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10255,
        localCode: '148',
        name: 'RAUL FERRERO',
        description: 'RAUL FERRERO',
        address: 'ALM.LAS RETAMAS NRO. 130 URB. SIRIUS II ETAPA (MZ-D LOTE 01 LOCAL 01) LIMA - LIMA - LA MOLINA',
        latitude: -12.09143480,
        longitude: -76.95104180,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10256,
        localCode: 'A03',
        name: 'BARRANCO METRO',
        description: 'BARRANCO METRO',
        address: 'AV. MIGUEL GRAU NRO. 513 (T METRO LOC 1112) LIMA - LIMA - BARRANCO',
        latitude: -12.14651539,
        longitude: -77.02170487,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10257,
        localCode: 'A11',
        name: 'PLAZA NORTE  METRO',
        description: 'PLAZA NORTE  METRO',
        address: 'AV. ALFREDO MENDIOLA NRO. 1400 (INT. 1108 CC PLAZA NORTE T. METRO L 1140) LIMA - LIMA - INDEPENDENCIA',
        latitude: -12.00737383,
        longitude: -77.06039540,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10258,
        localCode: '769',
        name: 'TOTTUS MEGAPLAZA',
        description: 'TOTTUS MEGAPLAZA',
        address: 'AV. ALFREDO MENDIOLA NRO. 3698 INT. 04 (C.C.MEGA PLAZA INT. DE TOTTUS) LIMA - LIMA - INDEPENDENCIA',
        latitude: -11.99411388,
        longitude: -77.06280302,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10259,
        localCode: '729',
        name: 'COMAS 4',
        description: 'COMAS 4',
        address: 'AV. MICAELA BASTIDAS NRO. 115 LIMA - LIMA - COMAS',
        latitude: -11.93348100,
        longitude: -77.04731695,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10260,
        localCode: 'A12',
        name: 'PERSHING METRO',
        description: 'PERSHING METRO',
        address: 'AV. GREGORIO ESCOBEDO 1040- NRO. 1050 (T. METRO LOC 1142) LIMA - LIMA - JESUS MARIA',
        latitude: -12.08918484,
        longitude: -77.05782752,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10261,
        localCode: 'C29',
        name: 'HIGUERETA 3',
        description: 'HIGUERETA 3',
        address: 'AV. AVIACION NRO. 5181 (OVALO DE HIGUERETA) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.12842420,
        longitude: -77.00051370,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10262,
        localCode: 'A38',
        name: 'CHACARILLA WONG',
        description: 'CHACARILLA WONG',
        address: 'CAL.MONTE BELLO NRO. 150 URB. CHACARILLA DEL ESTANQUE (T. WONG LOC 1192) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.11187830,
        longitude: -76.99188410,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10263,
        localCode: '609',
        name: 'EL TRIGAL 1',
        description: 'EL TRIGAL 1',
        address: 'AV. BENAVIDES NRO. 4684 INT. 9-17 LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.12773087,
        longitude: -76.98786747,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10264,
        localCode: '078',
        name: 'PROCERES',
        description: 'PROCERES',
        address: 'AV. LOS PROCERES NRO. 412 URB. SAN ROQUE LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.15067116,
        longitude: -76.98835596,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10265,
        localCode: '201',
        name: 'PRIMAVERA-POLO',
        description: 'PRIMAVERA-POLO',
        address: 'AV. PRIMAVERA NRO. 1298 URB. C.C.MONTERRICO LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.11009173,
        longitude: -76.97501097,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10266,
        localCode: '158',
        name: 'VELASCO ASTETE',
        description: 'VELASCO ASTETE',
        address: 'AV. VELASCO ASTETE NRO. 2695 LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.13407721,
        longitude: -76.98979363,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10267,
        localCode: '128',
        name: 'JACARANDA',
        description: 'JACARANDA',
        address: 'CAL.LOS LAURELES NRO. 196 URB. VALLE HERMOSO RESIDENCIAL (TIENDA N.6 CALLE JACARANDA Y LOS LAURELE) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.12635840,
        longitude: -76.97504953,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10268,
        localCode: 'A41',
        name: 'VENTANILLA METRO',
        description: 'VENTANILLA METRO',
        address: 'AV. NESTOR GAMBETTA MZA. C URB. PEDRO CUEVA (LOTE 30 AL 34 T. METRO LOC 1102) PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - VENTANILLA',
        latitude: -11.87665595,
        longitude: -77.12632176,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10269,
        localCode: 'A59',
        name: 'MEXICO  METRO',
        description: 'MEXICO  METRO',
        address: 'JR. FRANCISCO LUNA PIZARRO NRO. 1550(T. METRO LOC 1102)LIMA - LIMA - LA VICTORIA',
        latitude: -12.07532961,
        longitude: -77.02587236,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10270,
        localCode: 'A07',
        name: 'HUAYLAS METRO',
        description: 'HUAYLAS METRO',
        address: 'AV. DEFENSORES DEL MORRO NRO. 2070 (T METRO LOC 1024) LIMA - LIMA - CHORRILLOS',
        latitude: -12.1805,
        longitude: -77.01359,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10271,
        localCode: 'A05',
        name: 'CHACLACAYO  METRO',
        description: 'CHACLACAYO  METRO',
        address: 'AV. NICOLAS AYLLON NRO. 965 (T METRO LOC 904) LIMA - LIMA - CHACLACAYO',
        latitude: -11.97462173,
        longitude: -76.76774595,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10272,
        localCode: 'A32',
        name: 'ATOCONGO METRO',
        description: 'ATOCONGO METRO',
        address: 'AV. DE LOS HEROES NRO. S/N (ESQ. CAL. JESUS PODEROSO T.METRO LOC1102) LIMA - LIMA - SAN JUAN DE MIRAFLORES',
        latitude: -12.15011,
        longitude: -76.98051,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10273,
        localCode: 'A08',
        name: 'LA PASCANA METRO',
        description: 'LA PASCANA METRO',
        address: 'AV. TUPAC AMARU NRO. 3900 URB. LA PASCANA (T. METRO LOC. 1102) LIMA - LIMA - COMAS',
        latitude: -11.93195172,
        longitude: -77.04492409,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10274,
        localCode: 'A18',
        name: 'COLONIAL METRO',
        description: 'COLONIAL METRO',
        address: 'AV. COLONIAL NRO. 3002 (T. METRO LOC 1140) LIMA - LIMA - LIMA',
        latitude: -12.04976271,
        longitude: -77.07935762,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10275,
        localCode: 'A15',
        name: 'LA PLANICIE WONG',
        description: 'LA PLANICIE WONG',
        address: 'AV. ELIAS APARICIO NRO. 751 (T. WONG LOC 1102)LIMA - LIMA - LA MOLINA',
        latitude: -12.0761869,
        longitude: -76.9158817,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10276,
        localCode: 'A58',
        name: 'TOMAS VALLE  METRO',
        description: 'TOMAS VALLE  METRO',
        address: 'AV. TOMAS VALLE MZA. R-1 LOTE. 1 URB. ALBINO HERRERA (ESQ. ANGELICA GAMARRA T METRO LOC 1102)PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO- CALLAO',
        latitude: -12.01127695,
        longitude: -77.08994262,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10277,
        localCode: 'A39',
        name: 'SURQUILLO METRO',
        description: 'SURQUILLO METRO',
        address: 'CAL.LAS TIENDAS NRO. 290 (T. METRO LOC 1108) LIMA - LIMA - SURQUILLO',
        latitude: -12.10350159,
        longitude: -77.02083483,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10278,
        localCode: 'A37',
        name: 'T. MARSANO WONG',
        description: 'T. MARSANO WONG',
        address: 'AV. SANTIAGO DE SURCO NRO. 4647 URB. PROLONG. BENAVIDES (ESQ. AV. TINOCO T. WONG LOC 1108) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.142,
        longitude: -76.99027,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10279,
        localCode: 'A56',
        name: 'OVALO  BALTA METRO',
        description: 'OVALO  BALTA METRO',
        address: 'OVL.BALTA NRO. 1102 (T METRO LOC 1102) LIMA - LIMA - BARRANCO',
        latitude: -12.14123529,
        longitude: -77.01745458,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10280,
        localCode: 'A09',
        name: 'EL RETABLO METRO',
        description: 'EL RETABLO METRO',
        address: 'AV. BELAUNDE OESTE NRO. 980 URB. EL RETABLO III ETAPA (MZA. E LOTE 01 T. METRO LOC 1102) LIMA - LIMA - COMAS',
        latitude: -11.93433126,
        longitude: -77.05636438,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10281,
        localCode: 'A26',
        name: 'INGENIERIA  METRO',
        description: 'INGENIERIA  METRO',
        address: 'AV. TUPAC AMARU NRO. S/N (ESQ. CALLE 18 DE ENERO T. METRO LOC 1128) LIMA - LIMA - RIMAC',
        latitude: -12.01175869,
        longitude: -77.0523129,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10282,
        localCode: 'A04',
        name: 'ALFONSO UGARTE  METRO',
        description: 'ALFONSO UGARTE  METRO',
        address: 'AV. VENEZUELA NRO. S/N (ESQ. ALFONSO UGARTE T. METRO LOC. 1128) LIMA - LIMA - BREÃ‘A',
        latitude: -12.05434459,
        longitude: -77.0429768,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10283,
        localCode: 'A31',
        name: 'CANTO REY  METRO',
        description: 'CANTO REY  METRO',
        address: 'MZA. N-1 LOTE. 5 U.V. APV LOS PINOS (T. METRO LOC. 1156) LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -11.97556204,
        longitude: -77.00162318,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10284,
        localCode: 'T32',
        name: 'CC LA CRUCETA',
        description: 'CC LA CRUCETA',
        address: 'AV. LOS PROCERES NRO. 1030 (TIENDAS 3 Y 4) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.15913785,
        longitude: -76.98895108,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10285,
        localCode: 'C26',
        name: 'SAN MIGUEL AV LIBERTAD',
        description: 'SAN MIGUEL AV LIBERTAD',
        address: 'AV. LIBERTAD NRO. 1521 URB. MIRAMAR LIMA - LIMA - SAN MIGUEL',
        latitude: -12.0828686,
        longitude: -77.0962482,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10286,
        localCode: 'B97',
        name: 'VENTANILLA MI PERU',
        description: 'VENTANILLA MI PERU',
        address: 'AV. AYACUCHO MZA. G1 LOTE. 1 (TAMBIE AGRUPAMIENTO MI PERU) PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - VENTANILLA',
        latitude: -11.85469869,
        longitude: -77.12504569,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10287,
        localCode: 'A35',
        name: 'FAUCETT  METRO',
        description: 'FAUCETT  METRO',
        address: 'AV. VENEZUELA NRO. 5415 (T METRO LOC 1150) LIMA - LIMA - SAN MIGUEL',
        latitude: -12.06270253,
        longitude: -77.09688451,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10288,
        localCode: 'B68',
        name: 'MAGDALENA  CASTILLA 2',
        description: 'MAGDALENA  CASTILLA 2',
        address: 'JR. MARISCAL CASTILLA NRO. 679 LIMA - LIMA - MAGDALENA DEL MAR',
        latitude: -12.09050145,
        longitude: -77.07358316,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10289,
        localCode: 'D02',
        name: 'TRUJILLO GAMARRA 2',
        description: 'TRUJILLO GAMARRA 2',
        address: 'CAL.GAMARRA NRO. 691 (AYACUCHO NRO-601) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.112083,
        longitude: -79.025146,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10290,
        localCode: 'E64',
        name: 'LA FONTANA TOTTUS',
        description: 'LA FONTANA TOTTUS',
        address: 'AV. LA FONTANA 790  (C,C TOTTUS LA FONTANA  LC. 4-5)',
        latitude: -12.072835,
        longitude: -76.950848,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10291,
        localCode: 'T23',
        name: 'TRUJILLO LA ESPERANZA 2',
        description: 'TRUJILLO LA ESPERANZA 2',
        address: 'JR. JOSE G.CONDORCANQUI NRO. 2201 (ESQUINA CON JR. JORADAN -PJ LA ESPERANZA) LA LIBERTAD - TRUJILLO - LA ESPERANZA',
        latitude: -8.06902,
        longitude: -79.05025,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10292,
        localCode: 'A01',
        name: 'AV.LA MOLINA WONG',
        description: 'AV.LA MOLINA WONG',
        address: 'AV. LA MOLINA NRO. 378 (T. WONG LOC 1144) LIMA - LIMA - ATE',
        latitude: -12.06027,
        longitude: -76.96299,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10293,
        localCode: 'C08',
        name: 'TRUJILLO PALERMO  1',
        description: 'TRUJILLO PALERMO  1',
        address: 'AV. CESAR VALLEJO NRO. 100 (Y NRO-104,106 BARRIO CJHICAGO) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.11288,
        longitude: -79.01979,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10294,
        localCode: 'T59',
        name: 'TRUJILLO LAREDO',
        description: 'TRUJILLO LAREDO',
        address: 'JR. LA MERCED NRO. 497 (MZ-G , LOTE-40) LA LIBERTAD - TRUJILLO - LAREDO',
        latitude: -8.091587267,
        longitude: -78.96041058,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10295,
        localCode: 'A02',
        name: 'PURUCHUCO METRO',
        description: 'PURUCHUCO METRO',
        address: 'AV. NICOLAS AYLLON NRO. 4297 URB. VISTA ALEGRE (T METRO LOC 1102) LIMA - LIMA - ATE',
        latitude: -12.04192999,
        longitude: -76.93551779,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10296,
        localCode: 'C75',
        name: 'AREQUIPA STO DOMINGO 2',
        description: 'AREQUIPA STO DOMINGO 2',
        address: 'CAL.SANTO DOMINGO NRO. 115 INT. 02 (TAMBIEN GALERIAS GAMEZA 1ER PISO) AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.40002,
        longitude: -71.53504,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10297,
        localCode: 'D04',
        name: 'TRUJILLO BOLOGNESI 2',
        description: 'TRUJILLO BOLOGNESI 2',
        address: 'JR. FRANCISCO BOLOGNESI NRO. 652 INT. 1 (CERCADO) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.11497,
        longitude: -79.02819,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10298,
        localCode: 'B04',
        name: 'AREQUIPA SIGLO XX',
        description: 'AREQUIPA SIGLO XX',
        address: 'AV. SIGLO XX NRO. 235 (AV. GOYENECHE NRO-201) AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.40137,
        longitude: -71.52854,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10299,
        localCode: 'C96',
        name: 'TRUJILLO  LA ESPERANZA 1',
        description: 'TRUJILLO  LA ESPERANZA 1',
        address: 'CAL.GUADALUPE VICTORIA NRO. 165 (TAMBIEN NRO 167) LA LIBERTAD - TRUJILLO - LA ESPERANZA',
        latitude: -8.08086,
        longitude: -79.04597,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10300,
        localCode: 'A30',
        name: 'PROCERES 1  METRO',
        description: 'PROCERES 1  METRO',
        address: 'AV. PROC. DE LA INDEPENDENCIA NRO. 1632 URB. LAS FLORES 81 (MZA. PAR LOTE A-2 T. METRO LOC 1144) LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -12.0064815,
        longitude: -77.00483378,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10301,
        localCode: 'A16',
        name: 'CANADA METRO',
        description: 'CANADA METRO',
        address: 'AV. CANADA NRO. 1110 URB. SANTA CATALINA (T. METRO LOC 1009) LIMA - LIMA - LA VICTORIA',
        latitude: -12.08411507,
        longitude: -77.01371357,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10302,
        localCode: 'T51',
        name: 'AREQUIPA  HUNTER',
        description: 'AREQUIPA  HUNTER',
        address: 'AV. LAS AMERICAS MZA. I LOTE. 01 (URB LA COLINA 1) AREQUIPA - AREQUIPA - JACOBO HUNTER',
        latitude: -16.43844,
        longitude: -71.56072,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [{
            code: 'RET',
            service: 'Retirament',
            shortName: 'RET',
            startHour: '08:00:00',
            endHour: '20:00:00',
            enabled: false
        }],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10303,
        localCode: 'C97',
        name: 'TRUJILLO CARRION 2',
        description: 'TRUJILLO CARRION 2',
        address: 'AV. SANCHEZ CARRION NRO. 501 P.J. EL PORVENIR LA LIBERTAD - TRUJILLO - EL PORVENIR',
        latitude: -8.08559,
        longitude: -79.00185,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10304,
        localCode: 'Q14',
        name: 'AREQUIPA SOCABAYA',
        description: 'AREQUIPA SOCABAYA',
        address: 'AV. SOCABAYA 405 MZA. CH LOTE. 3 URB. SAN MARTIN DE SOCABAYA ZONA A AREQUIPA - AREQUIPA - SOCABAYA',
        latitude: -16.44037687,
        longitude: -71.5294598,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10305,
        localCode: 'A51',
        name: 'TRUJILLO OVALO PAPAL METRO',
        description: 'TRUJILLO OVALO PAPAL METRO',
        address: 'AV. JUAN PABLO II MZA. J LOTE. 1 URB. VISTA HERMOSA (ESQ. AV. AMERICA OESTE T METRO LOC 1168) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.11942,
        longitude: -79.04076,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10306,
        localCode: 'T88',
        name: 'TRUJILLO  URB LA NORIA',
        description: 'TRUJILLO  URB LA NORIA',
        address: 'AV. BLAS PASCAL NRO. 255 URB. LA NORIA (MZ-P,LT-1 ESQ.CON CALLE LUCIO SENECA 304) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.104,
        longitude: -79.00904,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10307,
        localCode: 'C42',
        name: 'AREQUIPA TRINIDAD MORAN 3',
        description: 'AREQUIPA TRINIDAD MORAN 3',
        address: 'AV. TRINIDAD MORAN NRO. 108 URB. LOS SAUCES AREQUIPA - AREQUIPA - CAYMA',
        latitude: -16.39038233,
        longitude: -71.54800393,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10308,
        localCode: 'C46',
        name: 'AREQUIPA CASTILLA 2',
        description: 'AREQUIPA CASTILLA 2',
        address: 'AV. MARISCAL CASTILLA NRO. 528 DPTO. D1 AREQUIPA - AREQUIPA - MIRAFLORES',
        latitude: -16.40221905,
        longitude: -71.51769429,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10309,
        localCode: 'D96',
        name: 'AREQUIPA GOYENECHE 2',
        description: 'AREQUIPA GOYENECHE 2',
        address: 'AV. GOYENECHE NRO. 115 (TAMBIEN 117, SIGLO XX N.230) AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.40169,
        longitude: -71.5285,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10310,
        localCode: 'C37',
        name: 'AREQUIPA  ZAMACOLA',
        description: 'AREQUIPA  ZAMACOLA',
        address: 'CAL.MARAÃ‘ON NRO. 100 URB. ZAMACOLA (CERRO COLORADO) AREQUIPA - AREQUIPA - CERRO COLORADO',
        latitude: -16.355117,
        longitude: -71.566602,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10311,
        localCode: 'C84',
        name: 'TRUJILLO  ESPAÑA 4',
        description: 'TRUJILLO  ESPAÑA 4',
        address: 'AV. ESPAÑA NRO. 2109 (CERCADO) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.11368,
        longitude: -79.02364,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10312,
        localCode: 'C45',
        name: 'AREQUIPA EJERCITO 5',
        description: 'AREQUIPA EJERCITO 5',
        address: 'AV. EJERCITO NRO. 901 (CAYMA) AREQUIPA - AREQUIPA - CAYMA',
        latitude: -16.38973163,
        longitude: -71.54774845,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10313,
        localCode: 'D65',
        name: 'TRUJILLO  MANSICHE',
        description: 'TRUJILLO  MANSICHE',
        address: 'AV. MANSICHE NRO. 798 (ESQUINA CON CALLE LOS ZAFIROS) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.10404,
        longitude: -79.03666,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10314,
        localCode: '022',
        name: 'LA MERCED',
        description: 'LA MERCED',
        address: 'AV. DE LA MERCED NRO. 781 URB. GRAL.MONTAGNE LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.13441417,
        longitude: -77.00946596,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10315,
        localCode: '026',
        name: 'AREQUIPA 2',
        description: 'AREQUIPA 2',
        address: 'CAL.TENIENTE FERRE NRO. 114 CERCADO (NO CONSIGNA REFERNCIAS) AREQUIPA - AREQUIPA - MIRAFLORES',
        latitude: -16.40127,
        longitude: -71.51665,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10316,
        localCode: '044',
        name: 'AREQUIPA  STO DOMINGO',
        description: 'AREQUIPA  STO DOMINGO',
        address: 'CAL.SANTO DOMINGO NRO. 135 AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.40022,
        longitude: -71.53448,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10317,
        localCode: '056',
        name: 'TRUJILLO 3',
        description: 'TRUJILLO 3',
        address: 'AV. FATIMA NRO. 652 URB. CALIFORNIA LA LIBERTAD - TRUJILLO - VICTOR LARCO HERRERA',
        latitude: -8.12953,
        longitude: -79.03727,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10318,
        localCode: '061',
        name: 'AREQUIPA 4',
        description: 'AREQUIPA 4',
        address: 'AV. ALCIDES CARRION NRO. 1A (NUMERACION 1A Y 1B Y CALLE JOSE GOMEZ 1) AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.41659,
        longitude: -71.53349,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10319,
        localCode: '071',
        name: 'EL AGUSTINO 1',
        description: 'EL AGUSTINO 1',
        address: 'AV. CESAR VALLEJO NRO. 1387 LIMA - LIMA - EL AGUSTINO',
        latitude: -12.03981208,
        longitude: -76.99376833,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10320,
        localCode: '149',
        name: 'MF AREQUIPA 7-M AVENTURA PLAZA',
        description: 'MF AREQUIPA 7-M AVENTURA PLAZA',
        address: 'AV.PORONGOCHE 500(TIENDAS 8,9,10 Y 11 MALL AVENTURA AREQUIPA',
        latitude: -16.41600497,
        longitude: -71.51534468,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10321,
        localCode: '165',
        name: 'CONSTRUCTORES 3',
        description: 'CONSTRUCTORES 3',
        address: 'AV. HUAROCHIRI NRO. 399 URB. COVIMA LIMA - LIMA - LA MOLINA',
        latitude: -12.0609366,
        longitude: -76.94244996,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10322,
        localCode: '168',
        name: 'TRUJILLO GAMARRA',
        description: 'TRUJILLO GAMARRA',
        address: 'CAL.GAMARRA NRO. 700 DPTO. 123 LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.11222,
        longitude: -79.02513,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10323,
        localCode: '169',
        name: 'GOYENECHE- AREQUIPA',
        description: 'GOYENECHE- AREQUIPA',
        address: 'AV. GOYENECHE 111 - NRO. 113 AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.40177,
        longitude: -71.52863,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10324,
        localCode: '177',
        name: 'AREQUIPA  MERCADERES',
        description: 'AREQUIPA  MERCADERES',
        address: 'CAL.MERCADERES NRO. 344 (CON CALLE PERU NRO-101) AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.399657,
        longitude: -71.533045,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10325,
        localCode: '192',
        name: 'TRUJILLO AMERICA',
        description: 'TRUJILLO AMERICA',
        address: 'AV. AMERICA NORTE NRO. 0177 (BARRIO EL MOLINO) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.09961,
        longitude: -79.01409,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10326,
        localCode: '195',
        name: 'LOS ROSALES SURCO',
        description: 'LOS ROSALES SURCO',
        address: 'AV. AYACUCHO NRO. 404 INT. 3 URB. LOS ROSALES (CON CALLE DOÃ‘A VIRGINIA - 404) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.14015035,
        longitude: -76.99975334,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10327,
        localCode: '200',
        name: 'AREQUIPA VFLORIDA',
        description: 'AREQUIPA VFLORIDA',
        address: 'AV. PUMACAHUA NRO. 600 URB. VILLA FLORIDA AREQUIPA - AREQUIPA - CERRO COLORADO',
        latitude: -16.37564,
        longitude: -71.55779,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10328,
        localCode: '216',
        name: 'AREQUIPA CASTILLA',
        description: 'AREQUIPA CASTILLA',
        address: 'AV. MARISCAL CASTILLA NRO. 600 INT. T-8 (ESQ. CON AV VENEZUELA NRO. 101, TIENDA 8) AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.40235,
        longitude: -71.51742,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10329,
        localCode: '252',
        name: 'TRUJILLO LAS QUINTANAS',
        description: 'TRUJILLO LAS QUINTANAS',
        address: 'AV. AMERICA NORTE NRO. 2319 URB. LAS QUINTANAS LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.102944,
        longitude: -79.032875,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10330,
        localCode: '256',
        name: 'TRUJILLO CARRION',
        description: 'TRUJILLO CARRION',
        address: 'AV. SANCHEZ CARRION NRO. 511 LA LIBERTAD - TRUJILLO - EL PORVENIR',
        latitude: -8.08541,
        longitude: -79.00192,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10331,
        localCode: '258',
        name: 'TRUJILLO ESPAÑA 3',
        description: 'TRUJILLO ESPAÑA 3',
        address: 'AV. ESPAÑA NRO. 100 (ESQUINA PIZARRO 106) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.11564,
        longitude: -79.03118,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10332,
        localCode: '259',
        name: 'TRUJILLO BOLIVAR 1',
        description: 'TRUJILLO BOLIVAR 1',
        address: 'CAL.BOLIVAR NRO. 600 LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.11141,
        longitude: -79.02585,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10333,
        localCode: '260',
        name: 'TRUJILLO HERRERA',
        description: 'TRUJILLO HERRERA',
        address: 'AV. VICTOR LARCO NRO. 1289 URB. LA MERCED (NRO 1289-1295 III ETAPA) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.12633,
        longitude: -79.04015,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10334,
        localCode: '265',
        name: 'TRUJILLO PIZARRO',
        description: 'TRUJILLO PIZARRO',
        address: 'JR. PIZARRO NRO. 512 URB. CERCADO LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.11165,
        longitude: -79.02764,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10335,
        localCode: '266',
        name: 'TRUJILLO EL SOL',
        description: 'TRUJILLO EL SOL',
        address: 'MZA. M LOTE. 1 URB. EL SOL DE CHACARERO LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.09108,
        longitude: -79.00697,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10336,
        localCode: '268',
        name: 'TRUJILLO FATIMA',
        description: 'TRUJILLO FATIMA',
        address: 'AV. LOS ANGELES NRO. 596 URB. CALIFORNIA (ESQ. AV. FATIMA 714) LA LIBERTAD - TRUJILLO - VICTOR LARCO HERRERA',
        latitude: -8.12972,
        longitude: -79.03699,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10337,
        localCode: '269',
        name: 'TRUJILLO BOLIVAR 2',
        description: 'TRUJILLO BOLIVAR 2',
        address: 'JR. BOLIVAR NRO. 393 URB. CERCADO (393-395) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.11362,
        longitude: -79.02787,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10338,
        localCode: '270',
        name: 'TRUJILLO ESPAÑA/GAMARRA',
        description: 'TRUJILLO ESPAÑA/GAMARRA',
        address: 'AV. ESPAÑA NRO. 2108 (CENTRO HISTORICO DE TRUJILLO. PISO 1) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.11357,
        longitude: -79.02385,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10339,
        localCode: '274',
        name: 'TRUJILLO TUPAC AMARU',
        description: 'TRUJILLO TUPAC AMARU',
        address: 'AV. TUPAC AMARU NRO. 400 URB. LOS GERANIOS LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.1005,
        longitude: -79.02641,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10340,
        localCode: '281',
        name: 'TRUJILLO MALL PLAZA',
        description: 'TRUJILLO MALL PLAZA',
        address: 'AV. AMERICA OESTE Y MANSICHE NRO. S/N (TIENDA S-102, S-104 C.C. MALL PLAZA) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.10197,
        longitude: -79.04776,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10341,
        localCode: '384',
        name: 'AREQUIPA PERU',
        description: 'AREQUIPA PERU',
        address: 'CAL.DEAN VALDIVIA NRO. 301 AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.40165459,
        longitude: -71.53377414,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10342,
        localCode: '525',
        name: 'TOTTUS CALLAO',
        description: 'TOTTUS CALLAO',
        address: 'NRO. S/N FND. BOCANEGRA (PARCELA - B) PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - CALLAO',
        latitude: -12.02942529,
        longitude: -77.09427305,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10343,
        localCode: '548',
        name: 'AREQUIPA UMACOLLO',
        description: 'AREQUIPA UMACOLLO',
        address: 'AV. VICTOR ANDRES BELAUNDE NRO. 321 URB. PRIMAVERA UMACOLLO AREQUIPA - AREQUIPA - YANAHUARA',
        latitude: -16.39997,
        longitude: -71.55001,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10344,
        localCode: '842',
        name: 'ESTACION GAMARRA',
        description: 'ESTACION GAMARRA',
        address: 'AV. AVIACION C/JR. H. UNANUE NRO. S/N INT. 6Y 8 (ESTACION GAMARRA LINEA1-METRO DE LIMA) LIMA - LIMA - LA VICTORIA',
        latitude: -12.06527272,
        longitude: -77.01238789,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10345,
        localCode: '843',
        name: 'ESTACION LA CULTURA',
        description: 'ESTACION LA CULTURA',
        address: 'AV. AVIACION C/.AV. J. PRADO NRO. S/N INT. 9,11 (Y INT13 EST LA CULTURA LINEA1 METRO LIMA) LIMA - LIMA - SAN BORJA',
        latitude: -12.08730434,
        longitude: -77.00341657,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10346,
        localCode: '860',
        name: 'AREQUIPA MERCADERES 3',
        description: 'AREQUIPA MERCADERES 3',
        address: 'CAL.MERCADERES NRO. 145 (ESQ. CON CALLE JERUSALEN N 101) AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.39877,
        longitude: -71.53516,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10347,
        localCode: '862',
        name: 'AREQUIPA ALTIPLANO 1',
        description: 'AREQUIPA ALTIPLANO 1',
        address: 'CAL.ELIAS AGUIRRE NRO. 301 (ESQ. CON AV. TENIENTE FERRE -202) AREQUIPA - AREQUIPA - MIRAFLORES',
        latitude: -16.40125,
        longitude: -71.51662,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10348,
        localCode: '866',
        name: 'AREQUIPA EJERCITO 2',
        description: 'AREQUIPA EJERCITO 2',
        address: 'AV. EJERCITO NRO. 700 AREQUIPA - AREQUIPA - YANAHUARA',
        latitude: -16.39025,
        longitude: -71.54556,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10349,
        localCode: '868',
        name: 'AREQUIPA SAN JUAN DE DIOS1',
        description: 'AREQUIPA SAN JUAN DE DIOS1',
        address: 'CAL.SAN JUAN DE DIOS NRO. 400 (ESQ CALLE SAN CAMILO 100) AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.40199,
        longitude: -71.53636,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10350,
        localCode: '870',
        name: 'AREQUIPA SALAVERRY 1',
        description: 'AREQUIPA SALAVERRY 1',
        address: 'AV. SALAVERRY NRO. 101 (ESQ CON CALLE SAN JUAN DE DIOS 661 Y 663) AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.407515,
        longitude: -71.538671,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10351,
        localCode: '872',
        name: 'AREQUIPA TRINIDAD MORAN 2',
        description: 'AREQUIPA TRINIDAD MORAN 2',
        address: 'AV. TRINIDAD MORAN 103 MZA. B LOTE. 7-8 URB. LOS SAUCES AREQUIPA - AREQUIPA - CAYMA',
        latitude: -16.39012,
        longitude: -71.54772,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10352,
        localCode: '876',
        name: 'AREQUIPA HOSP. GENERAL',
        description: 'AREQUIPA HOSP. GENERAL',
        address: 'CAL.CLORINDA MATTO DE TURNER NRO. B-62 URB. PABLO VI AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.415676,
        longitude: -71.533549,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10353,
        localCode: '918',
        name: 'AREQUIPA S.J.DE DIOS/MORAN',
        description: 'AREQUIPA S.J.DE DIOS/MORAN',
        address: 'CAL.SAN JUAN DE DIOS NRO. 201 (NRO : 203 ESQUINA GENERAL MORAN 100) AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.39982,
        longitude: -71.535458,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10354,
        localCode: '935',
        name: 'TRUJILLO RICARDO PALMA',
        description: 'TRUJILLO RICARDO PALMA',
        address: 'AV. RICARDO PALMA N. 888 NRO. 890 LOTE. 1B URB. SANTO DOMINGUITO (MZ. Y) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.1127,
        longitude: -79.00715,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10355,
        localCode: '943',
        name: 'AREQUIPA AV. PROGRESO',
        description: 'AREQUIPA AV. PROGRESO',
        address: 'AV. EL PROGRESO NRO. 671 (ESQ. CALLE PROHOGAR) AREQUIPA - AREQUIPA - MIRAFLORES',
        latitude: -16.39423,
        longitude: -71.52149,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10356,
        localCode: '966',
        name: 'AREQUIPA EJERCITO 4',
        description: 'AREQUIPA EJERCITO 4',
        address: 'AV. EL EJERCITO NRO. 807 URB. LOS SAUCES (SECCION 2 Y 3) AREQUIPA - AREQUIPA - CAYMA',
        latitude: -16.38977055,
        longitude: -71.54754326,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10357,
        localCode: '982',
        name: 'AREQUIPA MERCADERES 5',
        description: 'AREQUIPA MERCADERES 5',
        address: 'CAL.MERCADERES NRO. 212 (Y CALLE SANTO DOMINGO TDA. 18 1ER PISO) AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.39900432,
        longitude: -71.53475448,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10358,
        localCode: '983',
        name: 'AREQUIPA LA MERCED',
        description: 'AREQUIPA LA MERCED',
        address: 'CAL.LA MERCED NRO. 101 (AL 111 ESQ.CALLE PTE.BOLOGNESI Z.CERCADO) AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.399179,
        longitude: -71.537688,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10359,
        localCode: '989',
        name: 'TRUJILLO OVALO GRAU',
        description: 'TRUJILLO OVALO GRAU',
        address: 'AV. MANCO INCA NRO. 109 URB. SANTA MARIA (MZA. V LOTE 24 OVALO GRAU 1RA ETAPA) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.1237,
        longitude: -79.0224,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10360,
        localCode: 'A57',
        name: 'BELLAVISTA METRO',
        description: 'BELLAVISTA METRO',
        address: 'AV. OSCAR R BENAVIDES NRO. 1608 (T. METRO LOC 1116) PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - BELLAVISTA',
        latitude: -12.05896508,
        longitude: -77.12616418,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10361,
        localCode: 'A10',
        name: 'INDEPENDENCIA  METRO',
        description: 'INDEPENDENCIA  METRO',
        address: 'AV. ALFREDO MENDIOLA NRO. 3900 URB. IND. PANAMERICANA NORTE (MZA. A LOTE 5-6 T. METRO LOC. 1144) LIMA - LIMA - INDEPENDENCIA',
        latitude: -11.98867466,
        longitude: -77.0629207,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10362,
        localCode: 'E21',
        name: 'ESTACION  ANGAMOS',
        description: 'ESTACION  ANGAMOS',
        address: 'AV AVIACION NRO. S/N LOC 104  -  SAN BORJA',
        latitude: -12.11108468,
        longitude: -77.0002747,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10363,
        localCode: 'Q02',
        name: 'LOS OLIVOS IZAGUIRRE 2',
        description: 'LOS OLIVOS IZAGUIRRE 2',
        address: 'AV. CARLOS ALBERTO IZAGUIRRE NRO. 404 URB. PANAMERICANA NORTE (---) LIMA - LIMA - LOS OLIVOS',
        latitude: -11.98976678,
        longitude: -77.06488676,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10364,
        localCode: 'E78',
        name: 'RIMAC ALCAZAR 3',
        description: 'RIMAC ALCAZAR 3',
        address: 'AV. SAMUEL ALCAZAR 898Â Â  -Â  RIMAC - LIMA',
        latitude: -12.026282,
        longitude: -77.033957,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10365,
        localCode: 'B51',
        name: 'CHOSICA 4',
        description: 'CHOSICA 4',
        address: 'AV. 28 DE JULIO NRO. 149 (TAMBIEN JR. ILO 144) LIMA - LIMA - LURIGANCHO',
        latitude: -11.9353,
        longitude: -76.69358,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10366,
        localCode: 'E90',
        name: 'VENEZUELA BREÑA',
        description: 'VENEZUELA BREÑA',
        address: 'AV.VENEZUELA NÂ° 1798 BREÑA LIMA',
        latitude: -12.055861,
        longitude: -77.057351,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10367,
        localCode: 'E05',
        name: 'ESTACION MIGUEL GRAU',
        description: 'ESTACION MIGUEL GRAU',
        address: 'AV. MIGUEL GRAU NRO. 1704 INT. 202 (ESTACION MIGUEL GRAU LINEA 1 METRO LIMA) LIMA - LIMA - LIMA',
        latitude: -12.05474985,
        longitude: -77.01324955,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10368,
        localCode: 'B55',
        name: 'OVALO HIGUERETA 2',
        description: 'OVALO HIGUERETA 2',
        address: 'AV. BENAVIDES NRO. 3313 (C.C HIGUERETA) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.1287051,
        longitude: -77.0004001,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10369,
        localCode: 'T65',
        name: 'AV. ANGELICA GAMARRA',
        description: 'AV. ANGELICA GAMARRA',
        address: 'AV. ANGELICA GAMARRA DE LEON VELARDE MZA. B LOTE. 17 URB. EL TREBOL III ETAPA (ANGELICA GAMARRA DE LEON VELARDE N. Q) LIMA - LIMA - LOS OLIVOS',
        latitude: -12.00620898,
        longitude: -77.07186822,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10370,
        localCode: 'T92',
        name: 'SURQUILLO ANGAMOS 2',
        description: 'SURQUILLO ANGAMOS 2',
        address: 'AV. ANGAMOS ESTE NRO. 2202 A.H. REDUCTO 3 (MZA-B , LOTE-1) LIMA - LIMA - SURQUILLO',
        latitude: -12.11231431,
        longitude: -77.00702615,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10371,
        localCode: 'T41',
        name: 'SANTA ROSA -SJL',
        description: 'SANTA ROSA -SJL',
        address: 'AV. SANTA ROSA LIMA SUR NRO. 405A (Y 405 -B MZA. C13 LOTE 02) LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -11.96955865,
        longitude: -76.99314337,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10372,
        localCode: 'C70',
        name: 'CAYETANO HEREDIA 2',
        description: 'CAYETANO HEREDIA 2',
        address: 'AV. HONORIO DELGADO NRO. 333 URB. INGENIERIA (INGENIERIA) LIMA - LIMA - SAN MARTIN DE PORRES',
        latitude: -12.0231657,
        longitude: -77.0551892,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10373,
        localCode: 'D77',
        name: 'LURIN CL. TARAPACA',
        description: 'LURIN CL. TARAPACA',
        address: 'CAL.TARAPACA NRO. 108 (PUEBLO TRADICIONAL LURIN CERCADO) LIMA - LIMA - LURIN',
        latitude: -12.27671276,
        longitude: -76.86917268,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10374,
        localCode: 'E53',
        name: 'LA LEGUA SAN JOSE 2',
        description: 'LA LEGUA SAN JOSE 2',
        address: 'AV. JOSE SANTOS CHOCANO 106 -Â PROV. CONST. DEL CALLAO-CARMEN DE LA LEGUA',
        latitude: -12.04298,
        longitude: -77.098127,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10375,
        localCode: 'T19',
        name: 'IGNACIO MERINO 2',
        description: 'IGNACIO MERINO 2',
        address: 'AV. IGNACIO MERINO NRO. 1859 LIMA - LIMA - LINCE',
        latitude: -12.08288105,
        longitude: -77.03262649,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10376,
        localCode: 'D03',
        name: 'HUARAZ LUZURIAGA 2',
        description: 'HUARAZ LUZURIAGA 2',
        address: 'AV. MCAL. TORIBIO LUZURRIAGA NRO. 432 ANCASH - HUARAZ - HUARAZ',
        latitude: -9.52661,
        longitude: -77.52878,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10377,
        localCode: 'D43',
        name: 'CAMPOY',
        description: 'CAMPOY',
        address: 'CAL.CALLE 8 ESQUINA CALLE 17 MZA. T-1 LOTE. 1 (URB. CAMPOY) LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -12.01903449,
        longitude: -76.96166061,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10378,
        localCode: 'B24',
        name: 'JR ANDAHUAYLAS',
        description: 'JR ANDAHUAYLAS',
        address: 'JR. ANDAHUAYLAS NRO. 1275 (TAMBIEN NRO: 1279) LIMA - LIMA - LIMA',
        latitude: -12.056437,
        longitude: -77.026793,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10379,
        localCode: 'T42',
        name: 'ICA PARCONA  2',
        description: 'ICA PARCONA  2',
        address: 'AV. JOSE GALVEZ NRO. 100 (ESQUINA CON AV. YUPANQUI) ICA - ICA - PARCONA',
        latitude: -14.04896,
        longitude: -75.70442,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10380,
        localCode: 'D93',
        name: 'CUSCO SAN SEBASTIAN',
        description: 'CUSCO SAN SEBASTIAN',
        address: 'AV. DE LA CULTURA NRO. 2840 URB. TUPAC AMARU (INTERIOR DEL CENTRO COMERCIAL INKA PLAZA) CUSCO - CUSCO - SAN SEBASTIAN',
        latitude: -13.53657,
        longitude: -71.90728,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10381,
        localCode: 'D22',
        name: 'CHICLAYO BALTA 5',
        description: 'CHICLAYO BALTA 5',
        address: 'AV. JOSE BALTA NRO. 1055 (BALTA 1055) LAMBAYEQUE - CHICLAYO - CHICLAYO',
        latitude: -6.76,
        longitude: -79.83831,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10382,
        localCode: 'E65',
        name: 'ICA EL QUINDE',
        description: 'ICA EL QUINDE',
        address: 'AV. LOS MAESTROS 206  LC 154 ICA',
        latitude: -14.074655,
        longitude: -75.739609,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10383,
        localCode: 'C53',
        name: 'CUSCO PORTAL MANTAS',
        description: 'CUSCO PORTAL MANTAS',
        address: 'CAL.MANTAS NRO. 132 URB. CENTRO HISTORICO (CENTRO HISTORICO) CUSCO - CUSCO - CUSCO',
        latitude: -13.51782822,
        longitude: -71.97914522,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10384,
        localCode: 'D48',
        name: 'ICA SAN MARTIN  2',
        description: 'ICA SAN MARTIN  2',
        address: 'AV. SAN MARTIN NRO. 798 URB. SAN ISIDRO (ESQUINA CON CALLE CUTERVO) ICA - ICA - ICA',
        latitude: -14.07237,
        longitude: -75.72807,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10385,
        localCode: 'D28',
        name: 'ICA MUNICIPALIDAD 4',
        description: 'ICA MUNICIPALIDAD 4',
        address: 'AV. MUNICIPALIDAD NRO. 276 ICA - ICA - ICA',
        latitude: -14.06388,
        longitude: -75.73057,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10386,
        localCode: 'B15',
        name: 'CHICLAYO SAENZ PEÑA 1',
        description: 'CHICLAYO SAENZ PEÑA 1',
        address: 'AV. SAENZ PEÃ±A NRO. 101 LAMBAYEQUE - CHICLAYO - CHICLAYO',
        latitude: -6.77661,
        longitude: -79.83562,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10387,
        localCode: 'D17',
        name: 'PIURA  EX COUNTRY',
        description: 'PIURA  EX COUNTRY',
        address: 'AV. COUNTRY MZA. A LOTE. 5-B1 (ZONA COMERCIAL MERCADO MODELO) PIURA - PIURA - PIURA',
        latitude: -5.18894,
        longitude: -80.63297,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10388,
        localCode: 'B61',
        name: 'CHICLAYO  A. UGARTE',
        description: 'CHICLAYO  A. UGARTE',
        address: 'CAL.ALFONSO UGARTE NRO. 1394 URB. SAN LUIS LAMBAYEQUE - CHICLAYO - CHICLAYO',
        latitude: -6.7665,
        longitude: -79.84103,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10389,
        localCode: 'C60',
        name: 'CHICLAYO CUGLIEVAN 2',
        description: 'CHICLAYO CUGLIEVAN 2',
        address: 'CAL.JUAN CUGLIEVAN NRO. 1300 LAMBAYEQUE - CHICLAYO - CHICLAYO',
        latitude: -6.76781,
        longitude: -79.84037,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10390,
        localCode: 'C65',
        name: 'CHICLAYO BALTA /AGUIRRE',
        description: 'CHICLAYO BALTA /AGUIRRE',
        address: 'CAL.ELIAS AGUIRRE NRO. 798 URB. CERCADO DE CHICLAYO (CERCADO) LAMBAYEQUE - CHICLAYO - CHICLAYO',
        latitude: -6.771941022,
        longitude: -79.83854569,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10391,
        localCode: 'B07',
        name: 'CHICLAYO GONZALEZ 1',
        description: 'CHICLAYO GONZALEZ 1',
        address: 'AV. LUIS GONZALES NRO. 682 (CERCADO) LAMBAYEQUE - CHICLAYO - CHICLAYO',
        latitude: -6.77176,
        longitude: -79.84226,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10392,
        localCode: '405',
        name: 'CHIMBOTE 1',
        description: 'CHIMBOTE 1',
        address: 'JR. MANUEL RUIZ NRO. 405 (OTRO NRO 409) ANCASH - SANTA - CHIMBOTE',
        latitude: -9.07477,
        longitude: -78.59091,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10393,
        localCode: '069',
        name: 'PIURA 1',
        description: 'PIURA 1',
        address: 'AV. GRAU NRO. 394 PIURA - PIURA - PIURA',
        latitude: -5.19581,
        longitude: -80.62904,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10394,
        localCode: '082',
        name: 'MERINO 1',
        description: 'MERINO 1',
        address: 'AV. IGNACIO MERINO NRO. 2278 LIMA - LIMA - LINCE',
        latitude: -12.0865083,
        longitude: -77.0322798,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10395,
        localCode: '093',
        name: 'HUARAZ',
        description: 'HUARAZ',
        address: 'AV. LUZURIAGA NRO. 678 (NUMERACION 678 Y 680) ANCASH - HUARAZ - HUARAZ',
        latitude: -9.52895,
        longitude: -77.52916,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10396,
        localCode: '095',
        name: 'ICA 1',
        description: 'ICA 1',
        address: 'CAL.GRAU NRO. 103 (URB: ICA) ICA - ICA - ICA',
        latitude: -14.06356,
        longitude: -75.72868,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10397,
        localCode: '114',
        name: 'AYACUCHO/ T MARSANO',
        description: 'AYACUCHO/ T MARSANO',
        address: 'AV. AYACUCHO MZA. A LOTE. 01 URB. LA CAPULLANA (ESQUINA PSJE MOLIERE) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.13469475,
        longitude: -76.99728236,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10398,
        localCode: '118',
        name: 'LINCE 2',
        description: 'LINCE 2',
        address: 'AV. AREQUIPA 2687 - NRO. 2689 (CON JR. SOLEDAD 201) LIMA - LIMA - LINCE',
        latitude: -12.09052308,
        longitude: -77.03344356,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10399,
        localCode: '119',
        name: 'SANTA ANITA 1',
        description: 'SANTA ANITA 1',
        address: 'CAL.LUIS DE LA PUENTE MZA. B-1 LOTE. 02 (COOPERATIVA UNIVERSAL) LIMA - LIMA - SANTA ANITA',
        latitude: -12.0431419,
        longitude: -76.9798661,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10400,
        localCode: '141',
        name: 'CUZCO 3',
        description: 'CUZCO 3',
        address: 'CAL.BELEN NRO. 592 CUSCO - CUSCO - CUSCO',
        latitude: -13.5234,
        longitude: -71.97988,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10401,
        localCode: '146',
        name: 'CUZCO 4',
        description: 'CUZCO 4',
        address: 'CAL.SAN ANDRES NRO. 300 (ESQ. CALLE AYACUCHO S/N) CUSCO - CUSCO - CUSCO',
        latitude: -13.51996,
        longitude: -71.97825,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10402,
        localCode: '147',
        name: 'MAGDALENA 2',
        description: 'MAGDALENA 2',
        address: 'JR. BOLOGNESI NRO. 301 LIMA - LIMA - MAGDALENA DEL MAR',
        latitude: -12.09240618,
        longitude: -77.07084429,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10403,
        localCode: '154',
        name: 'LAS MAGNOLIAS-LINCE',
        description: 'LAS MAGNOLIAS-LINCE',
        address: 'AV. LAS MAGNOLIAS NRO. 2655 LIMA - LIMA - LINCE',
        latitude: -12.08937564,
        longitude: -77.02722687,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10404,
        localCode: '155',
        name: 'GRAN CHIMU - SJL',
        description: 'GRAN CHIMU - SJL',
        address: 'AV. GRAN CHIMU NRO. 898 URB. GRAN CHIMU LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -12.02496989,
        longitude: -76.9985031,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10405,
        localCode: '164',
        name: 'CARABAYLLO 1',
        description: 'CARABAYLLO 1',
        address: 'CAL.MADRE SELVA NRO. 600 LIMA - LIMA - CARABAYLLO',
        latitude: -11.8987827,
        longitude: -77.03799695,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10406,
        localCode: '179',
        name: 'CHIMBOTE  GALVEZ',
        description: 'CHIMBOTE  GALVEZ',
        address: 'AV. JOSE GALVEZ NRO. 509 (CENTRO CERCADO) ANCASH - SANTA - CHIMBOTE',
        latitude: -9.07402,
        longitude: -78.5896,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10407,
        localCode: '180',
        name: 'ICA  3',
        description: 'ICA  3',
        address: 'AV. MUNICIPALIDAD NRO. 290 (NRO:290-296 , CON CALLE LORETO NRO:100) ICA - ICA - ICA',
        latitude: -14.06396,
        longitude: -75.73075,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10408,
        localCode: '202',
        name: 'N CHIMBOTE PACIFICO',
        description: 'N CHIMBOTE PACIFICO',
        address: 'MZA. L2 LOTE. 11 URB. PACIFICO ANCASH - SANTA - NUEVO CHIMBOTE',
        latitude: -9.12369,
        longitude: -78.52993,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10409,
        localCode: '232',
        name: 'CUSCO TTIO 2',
        description: 'CUSCO TTIO 2',
        address: 'JR. UNION MZA. B2 LOTE. 4 CUSCO - CUSCO - WANCHAQ',
        latitude: -13.5341626,
        longitude: -71.96074795,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10410,
        localCode: '237',
        name: 'HIGUERETA  2',
        description: 'HIGUERETA  2',
        address: 'AV. AVIACION NRO. 5098 (TIENDA 05) LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.1267816,
        longitude: -77.000496,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10411,
        localCode: '238',
        name: 'CHIMBOTE  CASCO URB',
        description: 'CHIMBOTE  CASCO URB',
        address: 'JR. MANUEL VILLAVICENCIO NRO. 407 (ZONA CASCO URBANO) ANCASH - SANTA - CHIMBOTE',
        latitude: -9.07404,
        longitude: -78.59294,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10412,
        localCode: '239',
        name: 'CHICLAYO VEGA',
        description: 'CHICLAYO VEGA',
        address: 'CAL.VICENTE DE LA VEGA NRO. 500 LAMBAYEQUE - CHICLAYO - CHICLAYO',
        latitude: -6.77031,
        longitude: -79.84209,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10413,
        localCode: '240',
        name: 'CHICLAYO ELIAS 3',
        description: 'CHICLAYO ELIAS 3',
        address: 'CAL.ELIAS AGUIRRE NRO. 157 LAMBAYEQUE - CHICLAYO - CHICLAYO',
        latitude: -6.77133,
        longitude: -79.84402,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10414,
        localCode: '262',
        name: 'ICA SOL DE ICA',
        description: 'ICA SOL DE ICA',
        address: 'AV. SAN MARTIN 1509 MZA. E LOTE. 13 URB. SOL DE ICA ICA - ICA - ICA',
        latitude: -14.07719,
        longitude: -75.72633,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10415,
        localCode: '264',
        name: 'CAQUETA',
        description: 'CAQUETA',
        address: 'AV. CAQUETA NRO. 463 (TDA.COMERCIAL NRO 001 C.C.PLAZA UNICACHI) LIMA - LIMA - SAN MARTIN DE PORRES',
        latitude: -12.03300707,
        longitude: -77.0441905,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10416,
        localCode: '273',
        name: 'PIURA 4',
        description: 'PIURA 4',
        address: 'AV. GRAU NRO. 194 (ESQUINA CON AV. AREQUIPA NRO 745) PIURA - PIURA - PIURA',
        latitude: -5.19613,
        longitude: -80.62763,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10417,
        localCode: '279',
        name: 'ICA PLAZA EL SOL  1',
        description: 'ICA PLAZA EL SOL  1',
        address: 'AV. SAN MARTIN NRO. 727 INT. 121 (INTERIOR 121) ICA - ICA - ICA',
        latitude: -14.07162,
        longitude: -75.72824,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10418,
        localCode: '282',
        name: 'ICA GRAU 3',
        description: 'ICA GRAU 3',
        address: 'AV. GRAU NRO. 259 SEC. 15 ICA - ICA - ICA',
        latitude: -14.06291,
        longitude: -75.7272,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10419,
        localCode: '287',
        name: 'CHICLAYO  BALTA /CABRERA',
        description: 'CHICLAYO  BALTA /CABRERA',
        address: 'AV. JOSE BALTA NRO. 390 LAMBAYEQUE - CHICLAYO - CHICLAYO',
        latitude: -6.77425,
        longitude: -79.83864,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10420,
        localCode: '292',
        name: 'CHICLAYO  LA VICTORIA',
        description: 'CHICLAYO  LA VICTORIA',
        address: 'AV. SESQUICENTENARIO NRO. 496 URB. SANTA VICTORIA LAMBAYEQUE - CHICLAYO - CHICLAYO',
        latitude: -6.7816,
        longitude: -79.84292,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10421,
        localCode: '293',
        name: 'CHICLAYO BALTA /8 OCTUBRE',
        description: 'CHICLAYO BALTA /8 OCTUBRE',
        address: 'AV. JOSE BALTA 1200 NRO. 1208 (CERCADO) LAMBAYEQUE - CHICLAYO - CHICLAYO',
        latitude: -6.76849,
        longitude: -79.83806,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10422,
        localCode: '335',
        name: 'CASIMIRO',
        description: 'CASIMIRO',
        address: 'AV. REPUBLICA DE PANAMA NRO. 6304 LIMA - LIMA - MIRAFLORES',
        latitude: -12.1277991,
        longitude: -77.01821,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10423,
        localCode: '369',
        name: 'PIURA GRAU',
        description: 'PIURA GRAU',
        address: 'AV. GRAU NRO. 304 PIURA - PIURA - PIURA',
        latitude: -5.19597,
        longitude: -80.62829,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10424,
        localCode: '395',
        name: 'LIMATAMBO 2',
        description: 'LIMATAMBO 2',
        address: 'AV. AVIACION NRO. 3588 C.H. LIMATAMBO (MZ. 10 LT. 45) LIMA - LIMA - SAN BORJA',
        latitude: -12.108479,
        longitude: -77.000949,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10425,
        localCode: '415',
        name: 'HUARAZ 1F',
        description: 'HUARAZ 1F',
        address: 'AV. TORIBIO DE LUZURIAGA NRO. 591 (AV. T DE LUZURIAGA 591-599 DIST. RESTAUR) ANCASH - HUARAZ - HUARAZ',
        latitude: -9.52819,
        longitude: -77.52892,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10426,
        localCode: '416',
        name: 'CHIMBOTE L.PRADO',
        description: 'CHIMBOTE L.PRADO',
        address: 'JR. LEONCIO PRADO NRO. 569 (CASCO URBANO) ANCASH - SANTA - CHIMBOTE',
        latitude: -9.07439,
        longitude: -78.59226,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10427,
        localCode: '437',
        name: 'CUZCO MERCEDARIAS',
        description: 'CUZCO MERCEDARIAS',
        address: 'AV. EL SOL NRO. 130 CUSCO - CUSCO - CUSCO',
        latitude: -13.51804,
        longitude: -71.97863,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10428,
        localCode: '439',
        name: 'CUZCO LA CULTURA',
        description: 'CUZCO LA CULTURA',
        address: 'AV. DE LA CULTURA NRO. 1214 CUSCO - CUSCO - WANCHAQ',
        latitude: -13.52421,
        longitude: -71.95696,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10429,
        localCode: '455',
        name: 'CUZCO',
        description: 'CUZCO',
        address: 'CAL.AYACUCHO NRO. 220 (CALLE AYACUCHO NÂ° 220-222) CUSCO - CUSCO - CUSCO',
        latitude: -13.52004884,
        longitude: -71.97840862,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10430,
        localCode: '506',
        name: 'ORMEÑO',
        description: 'ORMEÑO',
        address: 'AV. JAVIER PRADO ESTE NRO. 1059 LIMA - LIMA - LA VICTORIA',
        latitude: -12.09002051,
        longitude: -77.021036,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10431,
        localCode: '580',
        name: 'HUARAZ LUZURIAGA',
        description: 'HUARAZ LUZURIAGA',
        address: 'AV. LUZURIAGA NRO. 502 (MZ C-18 LOTE - 01) ANCASH - HUARAZ - HUARAZ',
        latitude: -9.527346,
        longitude: -77.528963,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10432,
        localCode: '598',
        name: 'CUSCO MATARA',
        description: 'CUSCO MATARA',
        address: 'CAL.MATARA NRO. S N INT. 300 (CRUCE CON CALLE BELEN 305 TIENDA 300-302) CUSCO - CUSCO - CUSCO',
        latitude: -13.5213857,
        longitude: -71.97889511,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10433,
        localCode: '651',
        name: 'AV. PERU',
        description: 'AV. PERU',
        address: 'AV. PERU NRO. 1801 URB. PERU (.) LIMA - LIMA - SAN MARTIN DE PORRES',
        latitude: -12.0320458,
        longitude: -77.0648208,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10434,
        localCode: '664',
        name: 'HUARAZ 1B',
        description: 'HUARAZ 1B',
        address: 'AV. MCAL TORIBIO DE LUZURIAGA NRO. 596 (JR JULIAN MORALES) ANCASH - HUARAZ - HUARAZ',
        latitude: -9.52804,
        longitude: -77.52903,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10435,
        localCode: '693',
        name: 'CUSCO 2B',
        description: 'CUSCO 2B',
        address: 'AV. DE LA CULTURA NRO. 1302 CUSCO - CUSCO - WANCHAQ',
        latitude: -13.52426,
        longitude: -71.95677,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10436,
        localCode: '730',
        name: 'SALAMANCA 1',
        description: 'SALAMANCA 1',
        address: 'CAL.GARCILAZO DE LA VEGA NRO. 123 URB. SALAMANCA DE MONTERRICO LIMA - LIMA - ATE',
        latitude: -12.0750345,
        longitude: -76.9878442,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10437,
        localCode: '731',
        name: 'CHIMBOTE 3',
        description: 'CHIMBOTE 3',
        address: 'AV. LOS HEROES MZA. I2 LOTE. 45 ANCASH - SANTA - CHIMBOTE',
        latitude: -9.128,
        longitude: -78.51657,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10438,
        localCode: '733',
        name: 'CHIMBOTE 2',
        description: 'CHIMBOTE 2',
        address: 'JR. LADISLAO ESPINAR NRO. 501 (JR.MANUEL VILLAVICENCIO MZ.43 TDA.1) ANCASH - SANTA - CHIMBOTE',
        latitude: -9.07318,
        longitude: -78.59246,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10439,
        localCode: '763',
        name: 'LA POLVORA',
        description: 'LA POLVORA',
        address: 'AV. ANCASH LOTE. F1 INT. 2 (HIPER.TOTTUS CRUCE MARIATEGUI Y PALACIO) LIMA - LIMA - EL AGUSTINO',
        latitude: -12.04069807,
        longitude: -77.00000647,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10440,
        localCode: '781',
        name: 'CUSCO 7',
        description: 'CUSCO 7',
        address: 'AV. LA CULTURA NRO. 760 CUSCO - CUSCO - WANCHAQ',
        latitude: -13.52228052,
        longitude: -71.96346335,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10441,
        localCode: '782',
        name: 'PIURA 1B',
        description: 'PIURA 1B',
        address: 'CAL.AREQUIPA NRO. 796 (ESQUINA CALLES HUANCAVELICA Y AREQUIPA) PIURA - PIURA - PIURA',
        latitude: -5.19646,
        longitude: -80.62775,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10442,
        localCode: '892',
        name: 'JR. DE LA UNION 3',
        description: 'JR. DE LA UNION 3',
        address: 'JR. DE LA UNION NRO. 827 LIMA - LIMA - LIMA',
        latitude: -12.05026766,
        longitude: -77.03424856,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10443,
        localCode: '895',
        name: 'CUSCO MANUEL PRADO',
        description: 'CUSCO MANUEL PRADO',
        address: 'MZA. N URB. MANUEL PRADO (LC N 4) CUSCO - CUSCO - CUSCO',
        latitude: -13.52533137,
        longitude: -71.95245925,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10444,
        localCode: '916',
        name: 'CHIMBOTE MANUEL RUIZ',
        description: 'CHIMBOTE MANUEL RUIZ',
        address: 'JR. MANUEL RUIZ NRO. 304 URB. CASCO URBANO (ESQ. AV. VICTOR RAUL HAYA DE LA TORRE) ANCASH - SANTA - CHIMBOTE',
        latitude: -9.07574,
        longitude: -78.59111,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10445,
        localCode: '934',
        name: 'CHIMBOTE JOSE  BALTA',
        description: 'CHIMBOTE JOSE  BALTA',
        address: 'AV. JOSE BALTA NRO. 1115 LOTE. 1A P.J. EL PROGRESO (MZ. H ESQ. JR. VICTORIA 434) ANCASH - SANTA - CHIMBOTE',
        latitude: -9.06805,
        longitude: -78.58426,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10446,
        localCode: '939',
        name: 'CARABAYLLO TUPAC AMARU',
        description: 'CARABAYLLO TUPAC AMARU',
        address: 'AV. TUPAC AMARU NRO. 3062 P.J. EL PROGRESO LIMA - LIMA - CARABAYLLO',
        latitude: -11.87727442,
        longitude: -77.01726247,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10447,
        localCode: '948',
        name: 'PUENTE PIEDRA HIPER',
        description: 'PUENTE PIEDRA HIPER',
        address: 'AV. LEONCIO PRADO NRO. 1916 ZAPALLAL (HIPERBODEGA PRECIO UNO - PUENTE PIEDRA) LIMA - LIMA - PUENTE PIEDRA',
        latitude: -11.83204,
        longitude: -77.11475,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10448,
        localCode: '954',
        name: 'CUSCO PLAZOLETA STGO',
        description: 'CUSCO PLAZOLETA STGO',
        address: 'CAL.PLAZOLETA SANTIAGO NRO. 1068 CUSCO - CUSCO - SANTIAGO',
        latitude: -13.52518,
        longitude: -71.98356,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10449,
        localCode: '962',
        name: 'CHIMBOTE LEONCIO PRADO',
        description: 'CHIMBOTE LEONCIO PRADO',
        address: 'JR. LEONCIO PRADO NRO. 600 (ESQ. ELIAS AGUIRRE) ANCASH - SANTA - CHIMBOTE',
        latitude: -9.074569837,
        longitude: -78.59189149,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10450,
        localCode: '970',
        name: 'CAMPOY TOTTUS',
        description: 'CAMPOY TOTTUS',
        address: 'AV. MALECON CHECA NRO. 2611 LOTE. 1-1A URB. CAMPOY (MZA. L HIPERMERCADOS TOTTUS) LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -12.02428683,
        longitude: -76.97297852,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10451,
        localCode: '976',
        name: 'FERNANDO WIESSE',
        description: 'FERNANDO WIESSE',
        address: 'AV. FERNANDO WIESSE MZA. D LOTE. 1 A.H. SOMOS LIBRES (ESQ. AV. DEL MURO OESTE) LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -11.947391,
        longitude: -76.985141,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10452,
        localCode: '990',
        name: 'CHIMBOTE AV.PARDO',
        description: 'CHIMBOTE AV.PARDO',
        address: 'AV. PARDO NRO. 800 INT. 01 (ESQ.J.GALVEZ-EDIF.LOS REYES CCF.CHIMBOTE) ANCASH - SANTA - CHIMBOTE',
        latitude: -9.07671,
        longitude: -78.59003,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10453,
        localCode: 'E96',
        name: 'MINKA 4',
        description: 'MINKA 4',
        address: 'AV. ARGENTINA 3093 CC MINKA PJE EL SOL S/N  CALLAO',
        latitude: -12.046898,
        longitude: -77.080401,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10454,
        localCode: 'A46',
        name: 'CAJAMARCA AMAZONAS METRO',
        description: 'CAJAMARCA AMAZONAS METRO',
        address: 'JR. ANGAMOS NRO. 930B CHONTAPACCHA (T. METRO LOC 1108) CAJAMARCA - CAJAMARCA - CAJAMARCA',
        latitude: -7.14857,
        longitude: -78.52421,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10455,
        localCode: 'A29',
        name: 'MIOTTA  METRO',
        description: 'MIOTTA  METRO',
        address: 'AV. PEDRO MIOTTA NRO. S/N (ESQ.AV. ALIPIO PONCE T.METRO LOC.1008) LIMA - LIMA - SAN JUAN DE MIRAFLORES',
        latitude: -12.16762,
        longitude: -76.97829,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10456,
        localCode: 'A17',
        name: 'EMANCIPACION  METRO',
        description: 'EMANCIPACION  METRO',
        address: 'JR. CUSCO NRO. 245 (T. METRO LOC. 1102) LIMA - LIMA - LIMA',
        latitude: -12.04955089,
        longitude: -77.03189962,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10457,
        localCode: 'E89',
        name: 'AV SAN LUIS 4',
        description: 'AV SAN LUIS 4',
        address: 'AV. SAN LUIS  3096  -  LIMA  LIMA SAN BORJA',
        latitude: -12.1093,
        longitude: -76.993312,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10458,
        localCode: 'T97',
        name: 'HUANCAYO HUAYUCACHI',
        description: 'HUANCAYO HUAYUCACHI',
        address: 'CAL.REAL NRO. 306 (ESQ. CON JR. 10 DE NOVIEMBRE) JUNIN - HUANCAYO - HUAYUCACHI',
        latitude: -12.13806,
        longitude: -75.22338,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10459,
        localCode: 'A48',
        name: 'HUANCAYO  METRO',
        description: 'HUANCAYO  METRO',
        address: 'AV. 9 DE DICIEMBRE NRO. 517 (T. METRO LOC 1019) JUNIN - HUANCAYO - CHILCA',
        latitude: -12.0845,
        longitude: -75.2051,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10460,
        localCode: 'A45',
        name: 'CAJAMARCA EL QUINDE METRO',
        description: 'CAJAMARCA EL QUINDE METRO',
        address: 'JR. SOR MANUELA GIL NRO. 151 (CC. EL QUINDE T. METRO LOC 1016) CAJAMARCA - CAJAMARCA - CAJAMARCA',
        latitude: -7.14777,
        longitude: -78.51007,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10461,
        localCode: 'T35',
        name: 'HUANCAYO HUANCAVELICA',
        description: 'HUANCAYO HUANCAVELICA',
        address: 'AV. HUANCAVELICA NRO. 1301 (TAMBIEN NRO.1310A-CRUCE CON JR.BOLOGNESI) JUNIN - HUANCAYO - EL TAMBO',
        latitude: -12.05894,
        longitude: -75.22177,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10462,
        localCode: 'S29',
        name: 'IQUITOS PROSPERO VI',
        description: 'IQUITOS PROSPERO VI',
        address: 'CAL PROSPERO 600 LORETO',
        latitude: -3.7539,
        longitude: -73.24666,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10463,
        localCode: 'E44',
        name: 'VILLA EL SALVADOR  TOTTUS',
        description: 'VILLA EL SALVADOR  TOTTUS',
        address: 'AV PRIMERO DE MAYO MZ D LT 3 VEL LIMA VILLA EL SALVADOR',
        latitude: -12.197797,
        longitude: -76.964197,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10464,
        localCode: 'A19',
        name: 'PLAZA CASTILLA METRO',
        description: 'PLAZA CASTILLA METRO',
        address: 'AV. ALFONSO UGARTE NRO. 289 (ESQ. P. CASTILLA T METRO LOC 1008) LIMA - LIMA - LIMA',
        latitude: -12.04293073,
        longitude: -77.04247925,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10465,
        localCode: 'B74',
        name: 'PUCALLPA RAYMONDI',
        description: 'PUCALLPA RAYMONDI',
        address: 'AV. RAYMONDI NRO. 546 UCAYALI - CORONEL PORTILLO - CALLERIA',
        latitude: -8.38567,
        longitude: -74.53085,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10466,
        localCode: 'S03',
        name: 'IQUITOS PROSPERO 3',
        description: 'IQUITOS PROSPERO 3',
        address: 'JR. PROSPERO NRO. 361 (ENTRE MORONA Y SGTO LORES) LORETO - MAYNAS - IQUITOS',
        latitude: -3.7515,
        longitude: -73.24533,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10467,
        localCode: 'S19',
        name: 'IQUITOS NAPO',
        description: 'IQUITOS NAPO',
        address: 'CAL.NAPO NRO. 274 LORETO - MAYNAS - IQUITOS',
        latitude: -3.74871,
        longitude: -73.24451,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10468,
        localCode: 'C03',
        name: 'TACNA ALBARRACIN 2',
        description: 'TACNA ALBARRACIN 2',
        address: 'MZA. 96 LOTE. 22 A.H. ASOC.VIV.SAN FRANCISCO (------------) TACNA - TACNA - TACNA',
        latitude: -18.04511,
        longitude: -70.25619,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10469,
        localCode: 'C17',
        name: 'RIMAC  SAN GERMAN',
        description: 'RIMAC  SAN GERMAN',
        address: 'AV. SAN GERMAN NRO. 271 LIMA - LIMA - RIMAC',
        latitude: -12.03503,
        longitude: -77.03409,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10470,
        localCode: 'E63',
        name: 'ZORRITOS TOTTUS',
        description: 'ZORRITOS TOTTUS',
        address: 'AV. COLONIAL NRO. 1291 (C.C. TOTTUS ZORRITOS LC. 4-5) LIMA - LIMA',
        latitude: -12.04842,
        longitude: -77.0592,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10471,
        localCode: 'D47',
        name: 'VILLA MARIA  AV LIMA',
        description: 'VILLA MARIA  AV LIMA',
        address: 'AV. LIMA NRO. 1011 P.J. VILLA POETA JOSE GALVEZ (--) LIMA - LIMA - VILLA MARIA DEL TRIUNFO',
        latitude: -12.21283306,
        longitude: -76.90621063,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10472,
        localCode: 'T24',
        name: 'ANGAMOS /P.THOUARS',
        description: 'ANGAMOS /P.THOUARS',
        address: 'AV. ANGAMOS ESTE NRO. 199 (CRUCE CON AV. PETIT THOUARS) LIMA - LIMA - MIRAFLORES',
        latitude: -12.1135846,
        longitude: -77.0288613,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10473,
        localCode: 'E28',
        name: 'SAN DIEGO-VIPOL',
        description: 'SAN DIEGO-VIPOL',
        address: 'JR SANTA MARIA DE LOS ANGELES 610 URB SAN DIEGO VIPOLÂ  LIMA LIMA SAN MARTIN DE PORRES',
        latitude: -11.9454,
        longitude: -77.08754,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10474,
        localCode: 'C12',
        name: 'GRAN CHIMU - SJL 2',
        description: 'GRAN CHIMU - SJL 2',
        address: 'AV. GRAN CHIMU NRO. 438 URB. ZARATE LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -12.02740599,
        longitude: -77.00663723,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10475,
        localCode: 'S12',
        name: 'IQUITOS DEL EJERCITO',
        description: 'IQUITOS DEL EJERCITO',
        address: 'AV. ALFONSO UGARTE NRO. 1307 LORETO - MAYNAS - IQUITOS',
        latitude: -3.754424659,
        longitude: -73.25933542,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10476,
        localCode: 'E25',
        name: 'LA MARINA 2',
        description: 'LA MARINA 2',
        address: 'AV LA MARINA 2287 INT A SAN MIGUEL  -  SAN MIGUEL',
        latitude: -12.07824851,
        longitude: -77.08667535,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10477,
        localCode: 'E16',
        name: 'VILLA MARIA  REAL PLAZA',
        description: 'VILLA MARIA  REAL PLAZA',
        address: 'AV. PACHACUTEC NRO. 3721 INT. 202B P.J. CESAR VALLEJO - NUEVA ESPERANZA (N. 3781, CC. REAL PLAZA VILLA MARIA) LIMA - LIMA - VILLA MARIA DEL TRIUNFO',
        latitude: -12.18054953,
        longitude: -76.9431242,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10478,
        localCode: 'C82',
        name: 'TARAPOTO PLZ. MAYOR',
        description: 'TARAPOTO PLZ. MAYOR',
        address: 'CAL.PLAZA MAYOR NRO. 190 SAN MARTIN - SAN MARTIN - TARAPOTO',
        latitude: -6.48787,
        longitude: -76.35934,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10479,
        localCode: 'E49',
        name: 'LA PUNTA  BOLOGNESI',
        description: 'LA PUNTA  BOLOGNESI',
        address: 'AV, BOLOGNESI 601Â  Â -Â  LA PUNTA',
        latitude: -12.069757,
        longitude: -77.161472,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10480,
        localCode: 'S26',
        name: 'IQUITOS PROSPERO III',
        description: 'IQUITOS PROSPERO III',
        address: 'JR. PROSPERO NRO. 800 (ESQUINA CON UCAYALI203-207-211-215-223)',
        latitude: -3.75588,
        longitude: -73.24764,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10481,
        localCode: 'B25',
        name: 'SAENZ PEÑA  3',
        description: 'SAENZ PEÑA  3',
        address: 'AV. SAENZ PEÑA NRO. 663 PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - CALLAO',
        latitude: -12.06033692,
        longitude: -77.13885974,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10482,
        localCode: 'Q09',
        name: 'HUANCAYO  CASTILLA',
        description: 'HUANCAYO  CASTILLA',
        address: 'AV. MARISCAL CASTILLA NRO. 4315 JUNIN - HUANCAYO - EL TAMBO',
        latitude: -12.02905,
        longitude: -75.23553,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10483,
        localCode: 'B98',
        name: 'HUAYCAN 3',
        description: 'HUAYCAN 3',
        address: '----JOSE CARLOS MARIATEGUI LOTE. 1 P.J. PROYECTO ESPECIAL HUAYCAN (ZONA COMERCIO ZONA E) LIMA - LIMA - ATE',
        latitude: -12.01349706,
        longitude: -76.82494171,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10484,
        localCode: 'C79',
        name: 'INDEPENDENCIA  IZAGUIRRE 3',
        description: 'INDEPENDENCIA  IZAGUIRRE 3',
        address: 'AV. CARLOS IZAGUIRRE NRO. 138 (PRIMER PISO) LIMA - LIMA - INDEPENDENCIA',
        latitude: -11.98905871,
        longitude: -77.0585363,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10485,
        localCode: 'T50',
        name: 'HUANCAYO URB LOS JARDINES',
        description: 'HUANCAYO URB LOS JARDINES',
        address: 'AV. MARTIRES DEL PERIODISMO NRO. 1201 URB. LOS JARDINES (ESQ. CON JR. SANTA BEATRIZ NRO : 103) JUNIN - HUANCAYO - HUANCAYO',
        latitude: -12.0492,
        longitude: -75.19555,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10486,
        localCode: 'S01',
        name: 'IQUITOS  ARICA',
        description: 'IQUITOS  ARICA',
        address: 'CAL.ARICA NRO. 794 (ESQ. ARICA CON UCAYALI) LORETO - MAYNAS - IQUITOS',
        latitude: -3.75539,
        longitude: -73.24839,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10487,
        localCode: 'T75',
        name: 'CAJAMARCA HOYOS RUBIO',
        description: 'CAJAMARCA HOYOS RUBIO',
        address: 'AV. HOYOS RUBIO NRO. 714 CAJAMARCA - CAJAMARCA - CAJAMARCA',
        latitude: -7.14977,
        longitude: -78.50867,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10488,
        localCode: 'E09',
        name: 'HUANCAYO REAL 7',
        description: 'HUANCAYO REAL 7',
        address: 'CAL REAL 398 JUNIN HUANCAYO',
        latitude: -12.06775,
        longitude: -75.21069,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10489,
        localCode: 'D34',
        name: 'HUANCAYO-CHILCA',
        description: 'HUANCAYO-CHILCA',
        address: 'AV. 9 DE DICIEMBRE NRO. 800 JUNIN - HUANCAYO - CHILCA',
        latitude: -12.08602,
        longitude: -75.20841,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10490,
        localCode: 'S30',
        name: 'IQUITOS PROSPERO IV',
        description: 'IQUITOS PROSPERO IV',
        address: 'CL PROSPERO 392 INT 101, 398 ESQ JR MORONA NÂ° 212 IQUITOS MAYNAS LORETO',
        latitude: -3.75192,
        longitude: -73.24563,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10491,
        localCode: 'E47',
        name: 'LURIN  BOLOGNESI',
        description: 'LURIN  BOLOGNESI',
        address: 'CAL. BOLOGNESI 230  LIMA - LIMA -Â LURIN',
        latitude: -12.274523,
        longitude: -76.869531,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10492,
        localCode: 'B95',
        name: 'CARABAYLLO  MADRE SELVA',
        description: 'CARABAYLLO  MADRE SELVA',
        address: 'CAL.MADRE SELVA NRO. 594 URB. SANTA ISABEL (TAMBIEN 598) LIMA - LIMA - CARABAYLLO',
        latitude: -11.89882075,
        longitude: -77.03797717,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10493,
        localCode: 'S02',
        name: 'IQUITOS PUTUMAYO',
        description: 'IQUITOS PUTUMAYO',
        address: 'JR. PUTUMAYO NRO. 196 LORETO - MAYNAS - IQUITOS',
        latitude: -3.749945269,
        longitude: -73.24416049,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10494,
        localCode: 'E74',
        name: 'BREÑA AV. BRASIL',
        description: 'BREÑA AV. BRASIL',
        address: 'AV. BRASIL 680Â Â  -Â  BREÑA',
        latitude: -12.065904,
        longitude: -77.046493,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10495,
        localCode: 'B29',
        name: 'TACNA MCO 2 DE MAYO',
        description: 'TACNA MCO 2 DE MAYO',
        address: 'NRO. S/N INT. 104 DOS DE MAYO (MERCADO DOS DE MAYO) TACNA - TACNA - TACNA',
        latitude: -18.00901,
        longitude: -70.24851,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10496,
        localCode: 'B50',
        name: 'HUANCAYO LORENTE',
        description: 'HUANCAYO LORENTE',
        address: 'JR. SEBASTIAN LORENTE NRO. 310 (EL TAMBO SECTOR 01) JUNIN - HUANCAYO - EL TAMBO',
        latitude: -12.05718,
        longitude: -75.21442,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10497,
        localCode: 'B85',
        name: 'TACNA SAN MARTIN 3',
        description: 'TACNA SAN MARTIN 3',
        address: 'AV. SAN MARTIN NRO. 304 (ESQ. CALLE HIPOLITO UNANUE) TACNA - TACNA - TACNA',
        latitude: -18.01355,
        longitude: -70.25089,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10498,
        localCode: '035',
        name: 'CHOSICA 1',
        description: 'CHOSICA 1',
        address: 'AV. LIMA SUR NRO. 122 CHOSICA LIMA - LIMA - LURIGANCHO',
        latitude: -11.93364108,
        longitude: -76.69369988,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10499,
        localCode: '040',
        name: 'HUANCAYO 1',
        description: 'HUANCAYO 1',
        address: 'CAL.REAL NRO. 745 SECTOR 17 JUNIN - HUANCAYO - HUANCAYO',
        latitude: -12.07057,
        longitude: -75.20907,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10500,
        localCode: '048',
        name: 'MEXICO',
        description: 'MEXICO',
        address: 'AV. MEJICO NRO. 499 LIMA - LIMA - LA VICTORIA',
        latitude: -12.07512273,
        longitude: -77.02472068,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10501,
        localCode: '076',
        name: 'PUCALLPA 1',
        description: 'PUCALLPA 1',
        address: 'JR. INDEPENDENCIA NRO. 550 (URB. INDEPENDENCIA) UCAYALI - CORONEL PORTILLO - CALLERIA',
        latitude: -8.38351,
        longitude: -74.53331,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10502,
        localCode: '102',
        name: 'CAJAMARCA 2',
        description: 'CAJAMARCA 2',
        address: 'JR. TARAPACA NRO. 813 CAJAMARCA - CAJAMARCA - CAJAMARCA',
        latitude: -7.155127293,
        longitude: -78.51942793,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10503,
        localCode: '115',
        name: 'EL AGUSTINO 2',
        description: 'EL AGUSTINO 2',
        address: 'AV. JOSE CARLOS MARIATEGUI NRO. 2599 (PUENTE NUEVO) LIMA - LIMA - EL AGUSTINO',
        latitude: -12.03043854,
        longitude: -77.00005442,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10504,
        localCode: '120',
        name: 'AV SURCO',
        description: 'AV SURCO',
        address: 'AV. SURCO NRO. 606 URB. LA VIRREYNA LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.1412746,
        longitude: -76.994978,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10505,
        localCode: '170',
        name: 'PRESCOTT 1',
        description: 'PRESCOTT 1',
        address: 'AV. GUILLERMO PRESCOTT NRO. REF URB. COUNTRY CLUB (REF:298 298-A CALLE BURGOS NRO:197-199) LIMA - LIMA - SAN ISIDRO',
        latitude: -12.08962644,
        longitude: -77.04785507,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10506,
        localCode: '178',
        name: 'HUANCAYO EL TAMBO',
        description: 'HUANCAYO EL TAMBO',
        address: 'AV. HUANCAVELICA NRO. 2001 URB. LOS ANDES JUNIN - HUANCAYO - EL TAMBO',
        latitude: -12.05403,
        longitude: -75.22506,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10508,
        localCode: '189',
        name: 'FAUCETT 2',
        description: 'FAUCETT 2',
        address: 'AV. ELMER FAUCETT NRO. 2108 URB. SAN JOSE PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - BELLAVISTA',
        latitude: -12.05578727,
        longitude: -77.09756244,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10509,
        localCode: '194',
        name: 'LAS FLORES SJL',
        description: 'LAS FLORES SJL',
        address: 'AV. LAS FLORES DE PRIMAVERA MZA. 83 LOTE. 21 URB. LAS FLORES LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -12.00923685,
        longitude: -77.01120771,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10510,
        localCode: '197',
        name: 'CAJAMARCA TAYABA',
        description: 'CAJAMARCA TAYABA',
        address: 'JR. TAYABAMBA NRO. 201 (BARRIO SAN JOSE) CAJAMARCA - CAJAMARCA - CAJAMARCA',
        latitude: -7.152676542,
        longitude: -78.51736631,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10511,
        localCode: '198',
        name: 'CAJAMARCA 4',
        description: 'CAJAMARCA 4',
        address: 'AV. MANCO CAPAC NRO. 304 (BARRIO BALNEARIO 1) CAJAMARCA - CAJAMARCA - LOS BAÃ‘OS DEL INCA',
        latitude: -7.16479,
        longitude: -78.46672,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10512,
        localCode: '199',
        name: 'CAJAMARCA  COMERCIO',
        description: 'CAJAMARCA  COMERCIO',
        address: 'JR. DEL COMERCIO NRO. 671 CAJAMARCA - CAJAMARCA - CAJAMARCA',
        latitude: -7.156278313,
        longitude: -78.51939205,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10513,
        localCode: '220',
        name: 'CANTO GRANDE  MF4',
        description: 'CANTO GRANDE  MF4',
        address: 'AV. CANTO GRANDE MZA. N LOTE. 2 A.H. OROPEZA JESUS (SUB LT. A) LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -11.96701379,
        longitude: -77.00300619,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10514,
        localCode: '222',
        name: 'FIORI INDEPENDENCIA',
        description: 'FIORI INDEPENDENCIA',
        address: 'AV. LAS VIOLETAS NRO. 162 URB. JOSE GALVEZ (.) LIMA - LIMA - INDEPENDENCIA',
        latitude: -12.007281,
        longitude: -77.0535843,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10515,
        localCode: '231',
        name: 'LA HUAYRONA SJL',
        description: 'LA HUAYRONA SJL',
        address: 'AV. 13 DE ENERO 2267-A MZA. L LOTE. 2 COO. LA HUAYRONA LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -11.99323332,
        longitude: -77.00544097,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10516,
        localCode: '244',
        name: 'HUANCAYO 5',
        description: 'HUANCAYO 5',
        address: 'JR. CAJAMARCA NRO. 260 JUNIN - HUANCAYO - HUANCAYO',
        latitude: -12.07173,
        longitude: -75.20647,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10517,
        localCode: '246',
        name: 'CAJAMARCA AMAZONAS',
        description: 'CAJAMARCA AMAZONAS',
        address: 'JR. AMAZONAS NRO. 554 CAJAMARCA - CAJAMARCA - CAJAMARCA',
        latitude: -7.15549,
        longitude: -78.51749,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10518,
        localCode: '249',
        name: 'AVIACION 3',
        description: 'AVIACION 3',
        address: 'AV. AVIACION NRO. 2403 LIMA - LIMA - SAN BORJA',
        latitude: -12.0886845,
        longitude: -77.0032985,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10519,
        localCode: '303',
        name: 'MINKA II',
        description: 'MINKA II',
        address: 'AV. ARGENTINA NRO. 3093 (CALLE 3- PAB.5 LOC.300-304-308) PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - CALLAO',
        latitude: -12.04703597,
        longitude: -77.11091783,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10520,
        localCode: '362',
        name: 'JR. DE LA UNION',
        description: 'JR. DE LA UNION',
        address: 'JR. DE LA UNION NRO. 493 LIMA - LIMA - LIMA',
        latitude: -12.04704286,
        longitude: -77.0319546,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10521,
        localCode: '476',
        name: 'SANTA',
        description: 'SANTA',
        address: 'JR. DE LA UNION NRO. 202 (JR DE LA UNION 202 - 204) LIMA - LIMA - LIMA',
        latitude: -12.04425,
        longitude: -77.03006,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10522,
        localCode: '513',
        name: 'HUANCAYO EL TAMBO 2',
        description: 'HUANCAYO EL TAMBO 2',
        address: 'CAL.REAL NRO. 989 JUNIN - HUANCAYO - EL TAMBO',
        latitude: -12.05752,
        longitude: -75.21723,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10523,
        localCode: '648',
        name: 'ARENALES/DEL PINO',
        description: 'ARENALES/DEL PINO',
        address: 'AV. ARENALES NRO. 1405 (ESQUINA CON CALLE MANUEL DEL PINO # 110) LIMA - LIMA - LIMA',
        latitude: -12.0788,
        longitude: -77.03642,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10524,
        localCode: '668',
        name: 'BREÑA',
        description: 'BREÑA',
        address: 'AV. VENEZUELA NRO. 659 LIMA - LIMA - BREÑA',
        latitude: -12.05466,
        longitude: -77.04322,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10525,
        localCode: '722',
        name: 'HUANCAYO 2B',
        description: 'HUANCAYO 2B',
        address: 'CAL.REAL NRO. 1201 (ESQ. JR. TARAPACA) JUNIN - HUANCAYO - HUANCAYO',
        latitude: -12.07418,
        longitude: -75.20691,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10526,
        localCode: '808',
        name: 'TUSILAGOS',
        description: 'TUSILAGOS',
        address: 'AV. TUSILAGOS OESTE NRO. 281 INT. 2 (INT. 3 Y 4 HIPERMERCADO TOTTUS) LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -12.01333539,
        longitude: -77.00523444,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10527,
        localCode: '831',
        name: 'P. DE LAS LEYENDAS',
        description: 'P. DE LAS LEYENDAS',
        address: 'AV. LA MAR NRO. 2595 URB. PANDO PRIMERA ETAPA (ESQ.AV.PQ.DE LAS LEYENDAS BLCK A-TDA 5Y6) LIMA - LIMA - SAN MIGUEL',
        latitude: -12.07389752,
        longitude: -77.08695095,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10528,
        localCode: '840',
        name: 'SAN MIGUEL BOLOGNESI',
        description: 'SAN MIGUEL BOLOGNESI',
        address: 'JR. BOLOGNESI 894 - NRO. 898 (ESQ. C/ JR. AYACUCHO 499-A) LIMA - LIMA - SAN MIGUEL',
        latitude: -12.0844357,
        longitude: -77.07725376,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10529,
        localCode: '845',
        name: 'PRIMAVERA REAL PLAZA',
        description: 'PRIMAVERA REAL PLAZA',
        address: 'AV. ANGAMOS ESTE NRO. 2681 (LOCAL 136 C.C.REAL PLAZA PRIMAVERA) LIMA - LIMA - SAN BORJA',
        latitude: -12.11158066,
        longitude: -77.00184982,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10530,
        localCode: '848',
        name: 'PUCALLPA  SISLEY',
        description: 'PUCALLPA  SISLEY',
        address: 'JR. GUILLERMO SISLEY MZA. 210 LOTE. 01-B (PLANO REGULADOR DE PUCALLPA) UCAYALI - CORONEL PORTILLO - CALLERIA',
        latitude: -8.37794,
        longitude: -74.53868,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10531,
        localCode: '849',
        name: 'CAJAMARCA EL BATAN',
        description: 'CAJAMARCA EL BATAN',
        address: 'JR. DEL BATAN NRO. 137 (BARRIO LA MERCED) CAJAMARCA - CAJAMARCA - CAJAMARCA',
        latitude: -7.15629,
        longitude: -78.51755,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10532,
        localCode: '913',
        name: 'HUANCAYO INDEPENDENCIA',
        description: 'HUANCAYO INDEPENDENCIA',
        address: 'AV. INDEPENDENCIA NRO. 329 A.H. JUSTICIA PAZ Y VIDA (MZ. A LT. 11 SECTOR 1 ZONA A) JUNIN - HUANCAYO - EL TAMBO',
        latitude: -12.05342,
        longitude: -75.22912,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10533,
        localCode: '914',
        name: 'TACNA CRNEL MENDOZA',
        description: 'TACNA CRNEL MENDOZA',
        address: 'AV. CORONEL MENDOZA NRO. 1918 LOT. PUEBLO LIBRE (-1920) TACNA - TACNA - TACNA',
        latitude: -17.99987,
        longitude: -70.23807,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10534,
        localCode: '929',
        name: 'AV.RIO MARAÑON LOS OLIVOS',
        description: 'AV.RIO MARAÑON LOS OLIVOS',
        address: 'AV. RIO MARAÑON NRO. 644 URB. VILLA DEL NORTE (MZA. J LOTE 23) LIMA - LIMA - LOS OLIVOS',
        latitude: -11.97182634,
        longitude: -77.0714565,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10535,
        localCode: '944',
        name: 'MOLICENTRO TOTTUS',
        description: 'MOLICENTRO TOTTUS',
        address: 'AV. 7 NRO. 510 (HIPERMERCADOS TOTTUS) LIMA - LIMA - LA MOLINA',
        latitude: -12.0824152,
        longitude: -76.9290697,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10536,
        localCode: '984',
        name: 'TARAPOTO TAHUANTINSUYO 2',
        description: 'TARAPOTO TAHUANTINSUYO 2',
        address: 'CAL.MARTIN DE LA RIVA HERRERA NRO. 501 (ESQ. JR. TAHUANTINSUYO 699) SAN MARTIN - SAN MARTIN - TARAPOTO',
        latitude: -6.48577,
        longitude: -76.36746,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10537,
        localCode: 'T14',
        name: 'HUANCAYO  CARRION',
        description: 'HUANCAYO  CARRION',
        address: 'AV. DANIEL ALCIDES CARRION NRO. 1549 C.POBLADO CAJAS CHICO (MZA.M LOTE 7B SECTOR 1) JUNIN - HUANCAYO - HUANCAYO',
        latitude: -12.07334,
        longitude: -75.22069,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10538,
        localCode: 'A50',
        name: 'TRUJILLO LA MERCED WONG',
        description: 'TRUJILLO LA MERCED WONG',
        address: 'AV. LARCO NRO. 857 URB. LA MERCED (T WONG LOC 1032) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.12256,
        longitude: -79.03603,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10539,
        localCode: 'E38',
        name: 'AREQUIPA ESTADOS UNIDOS 3',
        description: 'AREQUIPA ESTADOS UNIDOS 3',
        address: 'CL. VALDELOMAR 100 ESQ AV EE UU 14Â - JOSE LUIS BUSTAMANTE Y RIVERO',
        latitude: -16.43059,
        longitude: -71.53233,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10540,
        localCode: 'A49',
        name: 'TRUJILLO MANSICHE METRO',
        description: 'TRUJILLO MANSICHE METRO',
        address: 'AV. MANSICHE NRO. 1721 (C.C. PENTA MALLS T. METRO LOC 1007) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.10185,
        longitude: -79.0449,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10542,
        localCode: 'T93',
        name: 'TRUJILLO TUPAC AMARU 2',
        description: 'TRUJILLO TUPAC AMARU 2',
        address: 'AV. TUPAC AMARU NRO. 602 URB. LAS QUINTANAS (MZA.A,LTE.17 ESQ.CAVERO Y MUÃ‘OZ-803-819) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.09898,
        longitude: -79.02801,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10543,
        localCode: 'E04',
        name: 'PROCERES SAN HILARION',
        description: 'PROCERES SAN HILARION',
        address: 'AV PROCERES DE LA INDEPENDENCIA 2301 SAN JUAN DE LURIGANCHO',
        latitude: -11.9934724,
        longitude: -77.01104712,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10544,
        localCode: 'B94',
        name: 'AV  TACNA 3',
        description: 'AV  TACNA 3',
        address: 'AV. TACNA NRO. 686 (TAMBIEN TACNA 688 CERCADO) LIMA - LIMA - LIMA',
        latitude: -12.0484075,
        longitude: -77.0390133,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10545,
        localCode: 'A42',
        name: 'AREQUIPA LAMBRAMANI METRO',
        description: 'AREQUIPA LAMBRAMANI METRO',
        address: 'AV. LAMBRAMANI NRO. 325 (T. METRO LOC. 1128) AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.410744,
        longitude: -71.520602,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10546,
        localCode: 'Q15',
        name: 'AREQUIPA  MARIANO MELGAR',
        description: 'AREQUIPA  MARIANO MELGAR',
        address: 'AV. LIMA NÂ° 501 ESQUINA CON CALLE ANCASH (MZ. J LT. 4), URBANIZACIÃ“N MARIANO MELGAR.',
        latitude: -16.40311,
        longitude: -71.51174,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10547,
        localCode: 'E43',
        name: 'TRUJILLO PIZARRO 3',
        description: 'TRUJILLO PIZARRO 3',
        address: 'JR FRANCISCO PIZARRO 724 TDA 08Â Â  -Â  TRUJILLO',
        latitude: -8.1091,
        longitude: -79.02547,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10548,
        localCode: 'E33',
        name: 'COMAS  UNIVERSITARIA',
        description: 'COMAS  UNIVERSITARIA',
        address: 'AV. UNIVERSITARIA NRO. 5821 URB. LAS VEGAS (NRO. 5823) LIMA - LIMA - COMAS',
        latitude: -11.954915,
        longitude: -77.060185,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10549,
        localCode: 'E35',
        name: 'TRUJILLO LAS QUINTANAS 3',
        description: 'TRUJILLO LAS QUINTANAS 3',
        address: 'AV GERONIMO DE LA TORRE 287 URB LAS QUINTANAS TRUJILLO',
        latitude: -8.10391,
        longitude: -79.03177,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10550,
        localCode: 'T26',
        name: 'AV IQUITOS',
        description: 'AV IQUITOS',
        address: 'AV. IQUITOS 496- NRO. 498 (CRUCE AV.BAUZATE Y MEZA Y AV.IQUITOS) LIMA - LIMA - LA VICTORIA',
        latitude: -12.06471862,
        longitude: -77.0308673,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10551,
        localCode: 'T63',
        name: 'AREQUIPA TIABAYA',
        description: 'AREQUIPA TIABAYA',
        address: 'CAL.BOLIVAR NRO. 114 AREQUIPA - AREQUIPA - TIABAYA',
        latitude: -16.44806,
        longitude: -71.59034,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10552,
        localCode: 'C31',
        name: 'SAN ROQUE 2',
        description: 'SAN ROQUE 2',
        address: 'JR. ESTEBAN CAMERE NRO. 576 URB. SAN ROQUE LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.14819718,
        longitude: -76.99144922,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10553,
        localCode: 'E27',
        name: 'CARABAYLLO TUPAC AMARU 2',
        description: 'CARABAYLLO TUPAC AMARU 2',
        address: 'AV TUPAC AMARU 9692Â  LIMA LIMA CARABAYLLO',
        latitude: -11.89072,
        longitude: -77.02687,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10554,
        localCode: 'E45',
        name: 'AREQUIPA  EJERCITO 6',
        description: 'AREQUIPA  EJERCITO 6',
        address: 'AV. EJERCITO NRO. 1004 (1004-A) AREQUIPA - AREQUIPAâ€“CAYMA',
        latitude: -16.388946,
        longitude: -71.549212,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10555,
        localCode: 'C05',
        name: 'AREQUIPA A. CARRION 1',
        description: 'AREQUIPA A. CARRION 1',
        address: 'AV. ALCIDES CARRION NRO. 283 (ANTES CENTRO POBLADO PAMPILLA MZ-G,LT-3) AREQUIPA - AREQUIPA - JOSE LUIS BUSTAMANTE Y RIVERO',
        latitude: -16.42512,
        longitude: -71.53337,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10556,
        localCode: 'E75',
        name: 'AREQUIPA AV. PIZARRO',
        description: 'AREQUIPA AV. PIZARRO',
        address: 'AV. PIZARRO MZ J LT 17 URB STA CATALINA-AREQUIPA JOSE LUIS BUSTAMANTE Y RIVERO',
        latitude: -16.424345,
        longitude: -71.515709,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10557,
        localCode: 'C54',
        name: 'JULIACA SAN ROMAN 2',
        description: 'JULIACA SAN ROMAN 2',
        address: 'JR. SAN ROMAN NRO. 302 PUNO - SAN ROMAN - JULIACA',
        latitude: -15.4946,
        longitude: -70.13258,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10558,
        localCode: 'A43',
        name: 'AREQUIPA C. COLORADO METRO',
        description: 'AREQUIPA C. COLORADO METRO',
        address: 'AV. AVIACION NRO. S/N (T. METRO LOC: 1006) AREQUIPA - AREQUIPA - CERRO COLORADO',
        latitude: -16.374529,
        longitude: -71.557039,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10559,
        localCode: 'C23',
        name: 'SURQUILLO ANGAMOS',
        description: 'SURQUILLO ANGAMOS',
        address: 'AV. ANGAMOS ESTE NRO. 761 LIMA - LIMA - SURQUILLO',
        latitude: -12.1132158,
        longitude: -77.0238506,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10560,
        localCode: 'B16',
        name: 'TRUJILLO  PRIMAVERA',
        description: 'TRUJILLO  PRIMAVERA',
        address: 'AV. MANUEL VERA ENRIQUEZ NRO. 612 (ESQUINA CON AV.AMERICA NORTE) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.10286,
        longitude: -79.03303,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10561,
        localCode: 'B78',
        name: 'AREQUIPA  PEDREGAL',
        description: 'AREQUIPA  PEDREGAL',
        address: 'CAL.ZAMACOLA MZA. G LOTE. 01 AREQUIPA - CAYLLOMA - MAJES',
        latitude: -16.36224228,
        longitude: -72.19011303,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10562,
        localCode: 'T74',
        name: 'ASCOPE CHOCOPE',
        description: 'ASCOPE CHOCOPE',
        address: 'CAR.PANAMERICANA NORTE MZA. A LOTE. 1 A.H. 26 DE ABRIL SECTOR 1 LA LIBERTAD - ASCOPE - CHOCOPE',
        latitude: -7.79325,
        longitude: -79.22242,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10563,
        localCode: 'E66',
        name: 'TUMBES AV. 24 JULIO',
        description: 'TUMBES AV. 24 JULIO',
        address: 'CL. 24 DE JULIO 500 Y 560  -  TUMBES',
        latitude: -3.561923,
        longitude: -80.457142,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10564,
        localCode: 'T91',
        name: 'PUNO LOS INCAS',
        description: 'PUNO LOS INCAS',
        address: 'JR. LOS INCAS NRO. 364 PUNO - PUNO - PUNO',
        latitude: -13.07687,
        longitude: -76.38558,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10565,
        localCode: 'E69',
        name: 'AREQUIPA EE UU /AV DOLORES',
        description: 'AREQUIPA EE UU /AV DOLORES',
        address: 'MZ B LTE 12 URB ALTO DE LA LUNA IV ETAPA JOSE LUIS BUSTAMANTE Y RIVERO AREQUIPA',
        latitude: -16.42928,
        longitude: -71.52377,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10566,
        localCode: 'D88',
        name: 'TRUJILLO PABLO CASALS',
        description: 'TRUJILLO PABLO CASALS',
        address: 'CAL.PABLO CASALS MZA. B LOTE. 5A URB. LOS CEDROS LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.09764,
        longitude: -79.0432,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10567,
        localCode: 'T86',
        name: 'HUANUCO 2DE MAYO  2',
        description: 'HUANUCO 2DE MAYO  2',
        address: 'JR. DOS DE MAYO NRO. 1201 (TAMBIEN 1209-1211 ESQ.JR.D.BERAUN.....) HUANUCO - HUANUCO - HUANUCO',
        latitude: -9.92868,
        longitude: -76.23978,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10568,
        localCode: 'C38',
        name: 'AREQUIPA ESTADOS UNIDOS 3',
        description: 'AREQUIPA ESTADOS UNIDOS 3',
        address: 'AV. ESTADOS UNIDOS MZA. E LOTE. 03 URB. ALTO DE LA LUNA (URB. ALTO DE LA LUNA) AREQUIPA - AREQUIPA - JOSE LUIS BUSTAMANTE Y RIVERO',
        latitude: -16.429952,
        longitude: -71.527854,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10569,
        localCode: 'E83',
        name: 'TRUJILLO LAS QUINTANAS 4',
        description: 'TRUJILLO LAS QUINTANAS 4',
        address: 'URB.LAS QUINTANAS  AV AMERICA NORTE 1363 4TA ETAPA LA LIBERTAD TRUJILLO',
        latitude: -8.094023,
        longitude: -79.025224,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10570,
        localCode: 'E57',
        name: 'TUMBES 28 DE JULIO',
        description: 'TUMBES 28 DE JULIO',
        address: 'AV 28 DE JULIO 311 CENTRO URBANO ZARUMILLA   -  ZARUMILLA',
        latitude: -3.50191,
        longitude: -80.27472,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10571,
        localCode: 'C59',
        name: 'AYACUCHO ASAMBLEA 2',
        description: 'AYACUCHO ASAMBLEA 2',
        address: 'JR. ASAMBLEA NRO. 131 (ASAMBLEA 131) AYACUCHO - HUAMANGA - AYACUCHO',
        latitude: -13.15958,
        longitude: -74.22501,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10572,
        localCode: 'B36',
        name: 'HUANUCO SAN MARTIN',
        description: 'HUANUCO SAN MARTIN',
        address: 'JR. AYACUCHO NRO. 402 HUANUCO - HUANUCO - HUANUCO',
        latitude: -9.92981,
        longitude: -76.24437,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10573,
        localCode: 'B38',
        name: 'ASCOPE CASA GRANDE',
        description: 'ASCOPE CASA GRANDE',
        address: 'AV. TREN NRO. 026 (SEC. PARTE ALTA) LA LIBERTAD - ASCOPE - CASA GRANDE',
        latitude: -7.74284,
        longitude: -79.18913,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10574,
        localCode: 'E37',
        name: 'AREQUIPA PERAL',
        description: 'AREQUIPA PERAL',
        address: 'CL. PERAL 503Â Â  -Â  AREQUIPA',
        latitude: -16.39525,
        longitude: -71.53124,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10575,
        localCode: 'T28',
        name: 'AREQUIPA YURA',
        description: 'AREQUIPA YURA',
        address: 'MZA. A LOTE. 01 A.H. ASO.VIVIENDAS C.MUNICIPAL (1ER PISO - ZONA-1) AREQUIPA - AREQUIPA - CERRO COLORADO',
        latitude: -16.32684,
        longitude: -71.594839,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10577,
        localCode: 'T34',
        name: 'SURQUILLO AVIACION',
        description: 'SURQUILLO AVIACION',
        address: 'AV. AVIACION NRO. 4573 LOTE. 9 (TAMBIEN 4585 MZA C- AA.HH SAN ATANACIO P) LIMA - LIMA - SURQUILLO',
        latitude: -12.1198349,
        longitude: -76.9980733,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10578,
        localCode: 'B54',
        name: 'PACASMAYO  ESPINAR',
        description: 'PACASMAYO  ESPINAR',
        address: 'CAL.LADISLAO ESPINAR NRO. 77 (MZA. 12 LOTE 24-A SECTOR CENTRO) LA LIBERTAD - PACASMAYO - PACASMAYO',
        latitude: -7.40083,
        longitude: -79.56862,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10579,
        localCode: 'D00',
        name: 'TRUJILLO AV EL GOLF',
        description: 'TRUJILLO AV EL GOLF',
        address: 'NRO. S/N SUBLOTE (SUBLOTE 70-A , MZA-O) LA LIBERTAD - TRUJILLO - VICTOR LARCO HERRERA',
        latitude: -8.13876,
        longitude: -79.0329,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10580,
        localCode: 'E51',
        name: 'AREQUIPA PEDREGAL 2',
        description: 'AREQUIPA PEDREGAL 2',
        address: 'MZ I LT 4 HAB URBANA CENTRO POBLADO EL PEDREGALÂ AREQUIPA',
        latitude: -16.36271,
        longitude: -72.19109,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10581,
        localCode: 'B81',
        name: 'ASCOPE  PAIJAN',
        description: 'ASCOPE  PAIJAN',
        address: 'CAL.O DONOVAN MZA. 44 LOTE. 17 P.J. ALTO PAIJAN (TAMBIEN SECTOR MANCO CAPAC 1ER PISO) LA LIBERTAD - ASCOPE - PAIJAN',
        latitude: -7.73319,
        longitude: -79.30188,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10582,
        localCode: 'E29',
        name: 'TRUJILLO LARCO 2',
        description: 'TRUJILLO LARCO 2',
        address: 'AV. LARCO 1400Â Â TRUJILLO LA LIBERTAD TRUJILLO',
        latitude: -8.12827,
        longitude: -79.0421,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10583,
        localCode: 'B40',
        name: 'AREQUIPA CAMANA 3',
        description: 'AREQUIPA CAMANA 3',
        address: 'AV. LIMA NRO. 161 (1ER. PISO) AREQUIPA - CAMANA - CAMANA',
        latitude: -16.62173,
        longitude: -72.70994,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10584,
        localCode: 'B73',
        name: 'AREQUIPA MOLLENDO 2',
        description: 'AREQUIPA MOLLENDO 2',
        address: 'CAL.AREQUIPA NRO. 390 (TAMBIEN 398) AREQUIPA - ISLAY - MOLLENDO',
        latitude: -17.02809,
        longitude: -72.01604,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10585,
        localCode: 'C44',
        name: 'AREQUIPA STO DOMINGO',
        description: 'AREQUIPA STO DOMINGO',
        address: 'CAL.SANTO DOMINGO NRO. 100 AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.39992,
        longitude: -71.53548,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10586,
        localCode: '039',
        name: 'TRUJILLO 1',
        description: 'TRUJILLO 1',
        address: 'JR. FRANCISCO BOLOGNESI NRO. 688 LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.11523,
        longitude: -79.02798,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10587,
        localCode: '046',
        name: 'HUANUCO 2',
        description: 'HUANUCO 2',
        address: 'JR. 28 DE JULIO NRO. 1034 HUANUCO - HUANUCO - HUANUCO',
        latitude: -9.92912,
        longitude: -76.23872,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10588,
        localCode: '054',
        name: 'CHEPEN',
        description: 'CHEPEN',
        address: 'CAL.SAN PEDRO NRO. 165 LA LIBERTAD - CHEPEN - CHEPEN',
        latitude: -7.22779,
        longitude: -79.42906,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10589,
        localCode: '068',
        name: 'HUANUCO 3',
        description: 'HUANUCO 3',
        address: 'JR. AYACUCHO NRO. 470 HUANUCO - HUANUCO - HUANUCO',
        latitude: -9.93015,
        longitude: -76.24381,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10590,
        localCode: '133',
        name: 'ESTACION CANADA',
        description: 'ESTACION CANADA',
        address: 'AV. PASEO DE LA REPUBLICA NRO. 1898 (AV.JOSE PARDO 891 - 895) LIMA - LIMA - LINCE',
        latitude: -12.08236469,
        longitude: -77.02699956,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10591,
        localCode: '136',
        name: 'SUCRE /MARINA',
        description: 'SUCRE /MARINA',
        address: 'AV. SUCRE NRO. 1190 LIMA - LIMA - PUEBLO LIBRE (MAGDALENA VIEJA)',
        latitude: -12.0828873,
        longitude: -77.0673095,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10592,
        localCode: '142',
        name: 'AREQUIPA 6 - LAMBRAMANI',
        description: 'AREQUIPA 6 - LAMBRAMANI',
        address: 'AV. LAMBRAMANI NRO. 325 (TIENDA 219) AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.41061,
        longitude: -71.5195,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10593,
        localCode: '175',
        name: 'AREQUIPA SAN JOSE',
        description: 'AREQUIPA SAN JOSE',
        address: 'CAL.SAN JOSE NRO. 324 (CERCADO AREQUIPA) AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.398985,
        longitude: -71.531676,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10594,
        localCode: '187',
        name: 'AREQUIPA CAMANA',
        description: 'AREQUIPA CAMANA',
        address: 'AV. LIMA NRO. 217 AREQUIPA - CAMANA - CAMANA',
        latitude: -16.62150381,
        longitude: -72.70987887,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10595,
        localCode: '193',
        name: 'TRUJILLO ESPAÑA',
        description: 'TRUJILLO ESPAÑA',
        address: 'AV. ESPAÑA NRO. 2414 (CENTRO CERCADO) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.1159,
        longitude: -79.0261,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10596,
        localCode: '203',
        name: 'JULIACA SAN ROMAN',
        description: 'JULIACA SAN ROMAN',
        address: 'JR. SAN ROMAN NRO. 403 (JIRON CUZCO 202) PUNO - SAN ROMAN - JULIACA',
        latitude: -15.49385,
        longitude: -70.13293,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10597,
        localCode: '213',
        name: 'HUAMACHUCO PLAZA',
        description: 'HUAMACHUCO PLAZA',
        address: '----JOSE BALTA NRO. 490 (PISO 1 MUN. PROV. SANCHEZ CARRION) LA LIBERTAD - SANCHEZ CARRION - HUAMACHUCO',
        latitude: -7.8154,
        longitude: -78.04784,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10598,
        localCode: '224',
        name: 'TRUJILLO 8',
        description: 'TRUJILLO 8',
        address: 'AV. ESPAÃ‘A NRO. 1400 (.) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.10663,
        longitude: -79.02307,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10599,
        localCode: '228',
        name: 'MOLLENDO 1',
        description: 'MOLLENDO 1',
        address: 'CAL.AREQUIPA NRO. 300 (ESQ. CALLE ARICA) AREQUIPA - ISLAY - MOLLENDO',
        latitude: -17.029,
        longitude: -72.01569,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10600,
        localCode: '236',
        name: 'JR. LAMPA 1117',
        description: 'JR. LAMPA 1117',
        address: 'JR. LAMPA NRO. 1117 LIMA - LIMA - LIMA',
        latitude: -12.05495314,
        longitude: -77.03450806,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10601,
        localCode: '254',
        name: 'TRUJILLO ESPAÑA 2',
        description: 'TRUJILLO ESPAÑA 2',
        address: 'AV. ESPAÑA NRO. 1599 LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.10814,
        longitude: -79.02173,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10602,
        localCode: '255',
        name: 'HUAMACHUCO  2',
        description: 'HUAMACHUCO  2',
        address: 'JR. JOSE BALTA 812 - NRO. 814 LA LIBERTAD - SANCHEZ CARRION - HUAMACHUCO',
        latitude: -7.8129,
        longitude: -78.04706,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10603,
        localCode: '257',
        name: 'TRUJILLO AYACUCHO 2',
        description: 'TRUJILLO AYACUCHO 2',
        address: 'CAL.MARISCAL ORBEGOSO NRO. 695 (CALLE AYACUCHO 507-509) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.113327,
        longitude: -79.02619,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10604,
        localCode: '267',
        name: 'TRUJILLO LARCO',
        description: 'TRUJILLO LARCO',
        address: 'MZA. P LOTE. 16 URB. LOS PINOS (1ER PISO) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.1254,
        longitude: -79.03936,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10605,
        localCode: '271',
        name: 'RIVERA NAVARRETE',
        description: 'RIVERA NAVARRETE',
        address: 'AV. RICARDO RIVERA NAVARRETE NRO. 731 LIMA LIMA SAN ISIDRO',
        latitude: -12.094242,
        longitude: -77.02645,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10606,
        localCode: '355',
        name: 'MERINO',
        description: 'MERINO',
        address: 'AV. IGNACIO MERINO NRO. 2251 LIMA - LIMA - LINCE',
        latitude: -12.0864162,
        longitude: -77.0321457,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10607,
        localCode: '356',
        name: 'PERU',
        description: 'PERU',
        address: 'AV. PERU NRO. 1312 URB. PERU LIMA - LIMA - SAN MARTIN DE PORRES',
        latitude: -12.032927,
        longitude: -77.058223,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10608,
        localCode: '361',
        name: 'LA QUINTA.',
        description: 'LA QUINTA.',
        address: 'JR. DE LA UNION NRO. 684 LIMA - LIMA - LIMA',
        latitude: -12.04878986,
        longitude: -77.03327559,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10609,
        localCode: '364',
        name: 'VENEZUELA 2',
        description: 'VENEZUELA 2',
        address: 'AV. REPUBLICA DE VENEZUELA NRO. 1001 LIMA - LIMA - BREÃ‘A',
        latitude: -12.05502,
        longitude: -77.04773,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10610,
        localCode: '390',
        name: 'SAN JUAN',
        description: 'SAN JUAN',
        address: 'AV. SAN JUAN NRO. 965 INT. 967 LIMA - LIMA - SAN JUAN DE MIRAFLORES',
        latitude: -12.15733388,
        longitude: -76.973175,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10611,
        localCode: '480',
        name: 'VIDENA',
        description: 'VIDENA',
        address: 'AV. SAN LUIS NRO. 1601 (MZ. M4 - LT.03. JACARANDA II) LIMA - LIMA - SAN BORJA',
        latitude: -12.0825532,
        longitude: -76.99712679,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10612,
        localCode: '484',
        name: 'ALFONSO UGARTE',
        description: 'ALFONSO UGARTE',
        address: 'AV. ALFONSO UGARTE NRO. 1238 (ESQ. JR. RECUAY 102) LIMA - LIMA - BREÃ‘A',
        latitude: -12.05537,
        longitude: -77.04214,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10613,
        localCode: '486',
        name: 'WILSON',
        description: 'WILSON',
        address: 'AV. INCA GARCILAZO DE LA VEGA NRO. 1900 (AV.G.DE LA VEGA 1900-1904 ESQ.JR.YAUYOS) LIMA - LIMA - LIMA',
        latitude: -12.06346385,
        longitude: -77.03774583,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10614,
        localCode: '504',
        name: 'ATAHUALPA',
        description: 'ATAHUALPA',
        address: 'AV. JOSE PARDO NRO. 196 LIMA - LIMA - MIRAFLORES',
        latitude: -12.11898848,
        longitude: -77.03023966,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10615,
        localCode: '530',
        name: 'ARAMBURU 2',
        description: 'ARAMBURU 2',
        address: 'AV. ARAMBURU ANDRES NRO. 1020 LIMA - LIMA - SURQUILLO',
        latitude: -12.10216964,
        longitude: -77.01946322,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10616,
        localCode: '539',
        name: 'SUCRE',
        description: 'SUCRE',
        address: 'AV. JOSE ANTONIO DE SUCRE NRO. 613 (TAMBIEN 617) LIMA - LIMA - PUEBLO LIBRE (MAGDALENA VIEJA)',
        latitude: -12.07755,
        longitude: -77.06442,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10617,
        localCode: '549',
        name: 'SAN ROQUE 1',
        description: 'SAN ROQUE 1',
        address: 'JR. EL SOL NRO. 185 URB. SAN ROQUE LIMA - LIMA - SANTIAGO DE SURCO',
        latitude: -12.14691757,
        longitude: -76.99031197,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10618,
        localCode: '569',
        name: 'HUANUCO PLAZA DE ARMAS',
        description: 'HUANUCO PLAZA DE ARMAS',
        address: 'JR. 28 DE JULIO NRO. 974 (976, 978, 980) HUANUCO - HUANUCO - HUANUCO',
        latitude: -9.92956,
        longitude: -76.23908,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10619,
        localCode: '576',
        name: 'BAYOVAR',
        description: 'BAYOVAR',
        address: 'AV. JOSE CARLOS MARIATEGUI MZA. R LOTE. 1 P.J. BAYOVAR (SECTOR 1) LIMA - LIMA - SAN JUAN DE LURIGANCHO',
        latitude: -11.95560705,
        longitude: -76.99214727,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10620,
        localCode: '623',
        name: 'PRESCOTT',
        description: 'PRESCOTT',
        address: 'AV. DOS DE MAYO NRO. 1608 URB. COUNTRY CLUB LIMA - LIMA - SAN ISIDRO',
        latitude: -12.09252781,
        longitude: -77.04762876,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10621,
        localCode: '667',
        name: 'HUANUCO 1B',
        description: 'HUANUCO 1B',
        address: 'JR. HUANUCO NRO. 696 (ENTRE EL CRUCE DEL JIRON 2 DE MAYO) HUANUCO - HUANUCO - HUANUCO',
        latitude: -9.93054,
        longitude: -76.24106,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10622,
        localCode: '712',
        name: 'CUBA',
        description: 'CUBA',
        address: 'AV. CUBA NRO. 1182 LIMA - LIMA - JESUS MARIA',
        latitude: -12.07501,
        longitude: -77.04669,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10623,
        localCode: '714',
        name: 'SAN MIGUEL 2',
        description: 'SAN MIGUEL 2',
        address: 'AV. LIMA NRO. 795 LIMA - LIMA - SAN MIGUEL',
        latitude: -12.08809641,
        longitude: -77.08150405,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10624,
        localCode: '762',
        name: 'CRILLON',
        description: 'CRILLON',
        address: 'AV. TACNA NRO. 655 INT. E2 (HIPER.TOTTUS ENTRE JR. MOQUEGUA Y OCOÃ‘A) LIMA - LIMA - LIMA',
        latitude: -12.0480531,
        longitude: -77.0384181,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10625,
        localCode: '764',
        name: 'PTE. PIEDRA',
        description: 'PTE. PIEDRA',
        address: 'AV. PUENTE PIEDRA SUR NRO. 443 INT. 6 (HIPER.TOTTUS ALT. KM PANAM. NORTE) LIMA - LIMA - PUENTE PIEDRA',
        latitude: -11.86823,
        longitude: -77.07287,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10626,
        localCode: '767',
        name: 'PACHACUTEC',
        description: 'PACHACUTEC',
        address: 'AV. PROLONGACION PACHACUTEC NRO. SN INT. 1 (HIPERM. TOTTUS TABLADA DE LURIN) LIMA - LIMA - VILLA MARIA DEL TRIUNFO',
        latitude: -12.20433,
        longitude: -76.92816,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10627,
        localCode: '847',
        name: 'CHEPEN 2',
        description: 'CHEPEN 2',
        address: 'CAL.SAN PEDRO NRO. 296 LOTE. 11 (MZA.149 SECTOR VI C.POBLADO CHEPEN) LA LIBERTAD - CHEPEN - CHEPEN',
        latitude: -7.22873,
        longitude: -79.42829,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10628,
        localCode: '857',
        name: 'AYACUCHO ASAMBLEA',
        description: 'AYACUCHO ASAMBLEA',
        address: 'JR. ASAMBLEA NRO. 274 U.V. CERCADO AYACUCHO - HUAMANGA - AYACUCHO',
        latitude: -13.15782,
        longitude: -74.22459,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10629,
        localCode: '858',
        name: 'AYACUCHO 28 DE JULIO 2',
        description: 'AYACUCHO 28 DE JULIO 2',
        address: 'JR. 28 DE JULIO NRO. 274 U.V. CERCADO AYACUCHO - HUAMANGA - AYACUCHO',
        latitude: -13.16304,
        longitude: -74.22701,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10630,
        localCode: '867',
        name: 'AREQUIPA ESTADOS UNIDOS 2',
        description: 'AREQUIPA ESTADOS UNIDOS 2',
        address: 'AV. ESTADOS UNIDOS NRO. 400 URB. SATELITE GRANDE (ESQ AV. GUATEMALA 101) AREQUIPA - AREQUIPA - JOSE LUIS BUSTAMANTE Y RIVERO',
        latitude: -16.43,
        longitude: -71.52844,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10631,
        localCode: '869',
        name: 'AREQUIPA SAN CAMILO 1',
        description: 'AREQUIPA SAN CAMILO 1',
        address: 'CAL.PERU NRO. 428 AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.40374,
        longitude: -71.53461,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10632,
        localCode: '873',
        name: 'AREQUIPA YANAHUARA 1',
        description: 'AREQUIPA YANAHUARA 1',
        address: 'AV. EMMEL NRO. 117 URB. YANAHUARA AREQUIPA - AREQUIPA - YANAHUARA',
        latitude: -16.39248,
        longitude: -71.5435,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10633,
        localCode: '874',
        name: 'AREQUIPA LANIFICIO 1',
        description: 'AREQUIPA LANIFICIO 1',
        address: 'AV. PERU MZA. C LOTE. 1 URB. COOP. EMPLEADOS LANIFICIO AREQUIPA - AREQUIPA - JOSE LUIS BUSTAMANTE Y RIVERO',
        latitude: -16.426253,
        longitude: -71.532987,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10634,
        localCode: '875',
        name: 'AREQUIPA MORAL/SAN FCO',
        description: 'AREQUIPA MORAL/SAN FCO',
        address: 'CAL.MORAL NRO. 121 AREQUIPA - AREQUIPA - AREQUIPA',
        latitude: -16.397422,
        longitude: -71.535741,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10635,
        localCode: '885',
        name: 'TRUJILLO HUSARES DE JUNIN',
        description: 'TRUJILLO HUSARES DE JUNIN',
        address: 'AV. HUSARES DE JUNIN NRO. 1196 URB. LA MERCED (ESQ. CALLE LOS RUISEÃ‘ORES) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.12728,
        longitude: -79.03637,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10636,
        localCode: '888',
        name: 'AREQUIPA CAMANA 2',
        description: 'AREQUIPA CAMANA 2',
        address: 'JR. NICOLAS DE PIEROLA 129 MZA. K LOTE. 28 AREQUIPA - CAMANA - CAMANA',
        latitude: -16.62262695,
        longitude: -72.71119315,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10637,
        localCode: '889',
        name: 'PUNO LAYKAKOTA',
        description: 'PUNO LAYKAKOTA',
        address: 'AV. LAYKAKOTA 141 - NRO. 143 PUNO - PUNO - PUNO',
        latitude: -15.84651,
        longitude: -70.02159,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10638,
        localCode: '915',
        name: 'AV. ABANCAY  2',
        description: 'AV. ABANCAY  2',
        address: 'AV. ABANCAY NRO. 907 (PRIMER PISO) LIMA - LIMA - LIMA',
        latitude: -12.05522922,
        longitude: -77.0302695,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10640,
        localCode: '927',
        name: 'AREQUIPA AV. JESUS',
        description: 'AREQUIPA AV. JESUS',
        address: 'AV. JESUS MZA. A LOTE. 2 P.J. CALIFORNIA (ESQUINA CALLE CESAR VALLEJO) AREQUIPA - AREQUIPA - PAUCARPATA',
        latitude: -16.4216,
        longitude: -71.49872,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10641,
        localCode: '933',
        name: 'VIRU INDEPENDENCIA',
        description: 'VIRU INDEPENDENCIA',
        address: 'CAL.INDEPENDENCIA NRO. 415 H.U. VIRU (MZA. 11 LOTE 1 ESQ. PSJE J. CHAVEZ 330) LA LIBERTAD - VIRU - VIRU',
        latitude: -8.41396,
        longitude: -78.75295,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10642,
        localCode: '936',
        name: 'AREQUIPA ALTO SELVA ALEGRE',
        description: 'AREQUIPA ALTO SELVA ALEGRE',
        address: 'AV. ESPAÃ‘A NRO. 248 A.H. ALTO DE SELVA ALEGRE (ESQ. AV. ANDES) AREQUIPA - AREQUIPA - ALTO SELVA ALEGRE',
        latitude: -16.381229,
        longitude: -71.518934,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10643,
        localCode: '953',
        name: 'HABICH 3',
        description: 'HABICH 3',
        address: 'AV. EDUARDO DE HABICH NRO. 585A URB. INGENIERIA (SECCION 1) LIMA - LIMA - SAN MARTIN DE PORRES',
        latitude: -12.0283953,
        longitude: -77.0572561,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10644,
        localCode: '988',
        name: 'TRUJILLO MALL PLAZA 2',
        description: 'TRUJILLO MALL PLAZA 2',
        address: 'AV. AMERICA OESTE NRO. 750 URB. EL INGENIO (C.C. MALL AVENTURA PLAZA LC: LS-04) LA LIBERTAD - TRUJILLO - TRUJILLO',
        latitude: -8.10127,
        longitude: -79.04926,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }, {
        legacyId: 10645,
        localCode: '996',
        name: 'HUANUCO REAL PLAZA',
        description: 'HUANUCO REAL PLAZA',
        address: 'JR. INDEPENDENCIA NRO. 1601 INT. 114A (REAL PLAZA HUANUCO CDRA 16 Y 17 JR. INDE) HUANUCO - HUANUCO - HUANUCO',
        latitude: -9.91989,
        longitude: -76.24085,
        localType: 'DRUGSTORE',
        wmsEnabled: false,
        enabled: false,
        position: 1,
        services: [],
        companies: [{
            company: 'Inkafarma',
            code: 'IKF'
        }, {
            company: 'MIFarma',
            code: 'MF'
        }]
    }];
