import { Injectable } from '@angular/core';
import { Store, StoreDetail } from '../models/operations-stores.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoresClientService } from '@clients/stores/stores-client.service';
import { IStore, IStoreDetail, IStoreDetailUpdate, IStoreServiceTypeRegister, IStoreServiceTypeUpdate } from '@interfaces/stores/stores.interface';
import { isObject } from 'rxjs/internal-compatibility';
import { ECompany } from '@models/company/company.model';
import { ResourceClientService } from '@clients/resource/resource-client.service';
import { EPaymentMethod } from '@models/payment-method/payment-method.model';

@Injectable()
export class OperationsStoresImplementService {
    constructor(
        private storesClient: StoresClientService,
        private resourceClient: ResourceClientService,

    ) {
    }

    get storeList(): Observable<Store[]> {
        return this.storesClient.getStoreList()
            .pipe(
                map((iStoreList: IStore[]) => {
                    return iStoreList.map((iStore: IStore) => new Store(iStore));
                })
            );
    }

    getStoreDetail(storeCode: string): Observable<StoreDetail> {
        return this.storesClient.getStoreDetail(storeCode)
            .pipe(
                map((iStoreDetail: IStoreDetail) => {
                    return isObject(iStoreDetail) ? new StoreDetail(iStoreDetail) : null;
                })
            );
    }

    get companyList(): Observable<ECompany[]> {
        return this.resourceClient.getCompanyList();
    }

    get paymentMethodList(): Observable<EPaymentMethod[]> {
        return this.resourceClient.getPaymentMethodList();
    }

    putStoreDetail(storeCode: string, body: IStoreDetailUpdate) {
        return this.storesClient.putStoreDetail(storeCode, body);
    }

    putStoreServiceType(serviceTypeId: string, storeServiceTypeUpdate: IStoreServiceTypeUpdate) {
        return this.storesClient.putZoneServiceType(serviceTypeId, storeServiceTypeUpdate);
    }

    postStoreServiceType(storeServiceTypRegister: IStoreServiceTypeRegister) {
        return this.storesClient.postStoreServiceType(storeServiceTypRegister);
    }
}
