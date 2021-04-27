import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ZoneDetail } from '../../../models/operations-zones.model';
import { filter, map } from 'rxjs/operators';

export class ZoneEditionStoreError {
    constructor() {
    }

}

@Injectable()
export class OperationsZonesEditionStoreService implements OnDestroy {
    private zoneDetailSubject = new BehaviorSubject<ZoneDetail | ZoneEditionStoreError>(null);
    private zoneBackupSubject = new BehaviorSubject<ZoneDetail | ZoneEditionStoreError>(null);
    private updateZoneDetailSubject = new BehaviorSubject<boolean>(null);

    constructor() {
    }

    get zoneDetail$(): Observable<ZoneDetail> {
        return this.zoneDetailSubject.asObservable()
            .pipe(
                filter(value => value instanceof ZoneDetail || value instanceof ZoneEditionStoreError),
                map(value => value instanceof ZoneEditionStoreError ? null : value)
            );
    }

    set zoneDetail(zoneDetail: ZoneDetail) {
        this.zoneDetailSubject.next(zoneDetail);
    }

    zoneDetailError() {
        this.zoneDetailSubject.next(new ZoneEditionStoreError());
    }

    get updateZoneDetail$(): Observable<boolean> {
        return this.updateZoneDetailSubject.asObservable()
            .pipe(filter(value => !!value));
    }

    set updateZoneDetail(updateZoneDetail: boolean) {
        this.updateZoneDetailSubject.next(updateZoneDetail);
    }

    get zoneBackup$(): Observable<ZoneDetail> {
        return this.zoneBackupSubject.asObservable()
            .pipe(
                filter(value => value instanceof ZoneDetail || value instanceof ZoneEditionStoreError),
                map(value => value instanceof ZoneEditionStoreError ? null : value)
            );
    }

    set zoneBackup(zoneDetail: ZoneDetail) {
        this.zoneBackupSubject.next(zoneDetail);
    }

    zoneBackupError() {
        this.zoneBackupSubject.next(new ZoneEditionStoreError());
    }

    ngOnDestroy() {
        this.zoneDetailSubject.complete();
        this.updateZoneDetailSubject.complete();
        this.zoneBackupSubject.complete();
    }
}
