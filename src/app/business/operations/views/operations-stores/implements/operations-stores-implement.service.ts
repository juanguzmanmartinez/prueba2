import { Injectable } from '@angular/core';
import { Store, StoreDetail } from '../models/operations-stores.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DrugstoresClientService } from '@clients/drugstores/drugstores-client.service';
import { IDrugstore, IDrugstoreDetail, IDrugstoreDetailUpdate, IDrugstoreServiceTypeRegister, IDrugstoreServiceTypeUpdate } from '@interfaces/drugstores/drugstores.interface';
import { isObject } from 'rxjs/internal-compatibility';
import { ECompany } from '@models/company/company.model';
import { ResourceClientService } from '@clients/resource/resource-client.service';
import { EPaymentMethod } from '@models/payment-method/payment-method.model';

@Injectable()
export class OperationsStoresImplementService {
    constructor(
        private storesClient: DrugstoresClientService,
        private resourceClient: ResourceClientService,
    ) {
    }

    get storeList(): Observable<Store[]> {
        return this.storesClient.getDrugstoreList()
            .pipe(
                map((iStoreList: IDrugstore[]) => {
                    return iStoreList.map((iStore: IDrugstore) => new Store(iStore));
                })
            );
    }

    getStoreDetail(storeCode: string): Observable<StoreDetail> {
        return this.storesClient.getStoreDetail(storeCode)
            .pipe(
                map((iStoreDetail: IDrugstoreDetail) => {
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

    putStoreDetail(storeCode: string, body: IDrugstoreDetailUpdate) {
        return this.storesClient.putStoreDetail(storeCode, body);
    }

    putStoreServiceType(serviceTypeId: string, storeServiceTypeUpdate: IDrugstoreServiceTypeUpdate) {
        return this.storesClient.putZoneServiceType(serviceTypeId, storeServiceTypeUpdate);
    }

    postStoreServiceType(storeServiceTypRegister: IDrugstoreServiceTypeRegister) {
        return this.storesClient.postStoreServiceType(storeServiceTypRegister);
    }
}
