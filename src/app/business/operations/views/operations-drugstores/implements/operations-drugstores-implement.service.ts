import { Injectable } from '@angular/core';
import { Drugstore, DrugstoreDetail } from '../models/operations-drugstores.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DrugstoresClientService } from '@clients/drugstores/drugstores-client.service';
import { IDrugstore, IDrugstoreDetail, IDrugstoreDetailUpdate, IDrugstoreServiceTypeRegister, IDrugstoreServiceTypeUpdate } from '@interfaces/drugstores/drugstores.interface';
import { isObject } from 'rxjs/internal-compatibility';
import { ECompany } from '@models/company/company.model';
import { ResourceClientService } from '@clients/resource/resource-client.service';
import { EPaymentMethod } from '@models/payment-method/payment-method.model';

@Injectable()
export class OperationsDrugstoresImplementService {
    constructor(
        private drugstoresClient: DrugstoresClientService,
        private resourceClient: ResourceClientService,
    ) {
    }

    get drugstoreList(): Observable<Drugstore[]> {
        return this.drugstoresClient.getDrugstoreList()
            .pipe(
                map((iDrugstoreList: IDrugstore[]) => {
                    return iDrugstoreList.map((iDrugstore: IDrugstore) => new Drugstore(iDrugstore));
                })
            );
    }

    get companyList(): Observable<ECompany[]> {
        return this.resourceClient.getCompanyList();
    }

    get paymentMethodList(): Observable<EPaymentMethod[]> {
        return this.resourceClient.getPaymentMethodList();
    }

    getDrugstoreDetail(drugstoreCode: string): Observable<DrugstoreDetail> {
        return this.drugstoresClient.getStoreDetail(drugstoreCode)
            .pipe(
                map((iDrugstoreDetail: IDrugstoreDetail) => {
                    return isObject(iDrugstoreDetail) ? new DrugstoreDetail(iDrugstoreDetail) : null;
                })
            );
    }

    putDrugstoreDetail(drugstoreCode: string, body: IDrugstoreDetailUpdate) {
        return this.drugstoresClient.putStoreDetail(drugstoreCode, body);
    }

    putDrugstoreServiceType(serviceTypeId: string, iDrugstoreServiceTypeUpdate: IDrugstoreServiceTypeUpdate) {
        return this.drugstoresClient.putZoneServiceType(serviceTypeId, iDrugstoreServiceTypeUpdate);
    }

    postDrugstoreServiceType(iDrugstoreServiceTypRegister: IDrugstoreServiceTypeRegister) {
        return this.drugstoresClient.postStoreServiceType(iDrugstoreServiceTypRegister);
    }
}
