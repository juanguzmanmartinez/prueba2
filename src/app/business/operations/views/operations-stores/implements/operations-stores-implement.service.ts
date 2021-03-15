import { Injectable } from '@angular/core';
import { Store, StoreDetail } from '../models/operations-stores.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoresClientService } from '@clients/stores/stores-client.service';
import { IStore, IStoreDetail } from '@interfaces/stores/stores.interface';
import { isObject } from 'rxjs/internal-compatibility';

@Injectable()
export class OperationsStoresImplementService {
    constructor(
        private storesClient: StoresClientService
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
}
