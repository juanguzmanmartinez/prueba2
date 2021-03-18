import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { StoreDetail } from '../../../models/operations-stores.model';

@Injectable()
export class OperationsStoresEditionStoreService implements OnDestroy {
    private storeDetailSubject = new BehaviorSubject<StoreDetail>(null);
    private updateStoreDetailSubject = new BehaviorSubject<boolean>(null);

    constructor() {
    }

    get storeDetail$(): Observable<StoreDetail> {
        return this.storeDetailSubject.asObservable()
            .pipe(filter(value => !!value));
    }

    set storeDetail(storeDetail: StoreDetail) {
        this.storeDetailSubject.next(storeDetail);
    }

    set storeDetailError(error: any) {
        this.storeDetailSubject.error(error);
    }

    get updateStoreDetail$(): Observable<boolean> {
        return this.updateStoreDetailSubject.asObservable()
            .pipe(filter(value => !!value));
    }

    set updateStoreDetail(updateZoneDetail: boolean) {
        this.updateStoreDetailSubject.next(updateZoneDetail);
    }

    ngOnDestroy() {
        this.storeDetailSubject.complete();
        this.updateStoreDetailSubject.complete();
    }
}
