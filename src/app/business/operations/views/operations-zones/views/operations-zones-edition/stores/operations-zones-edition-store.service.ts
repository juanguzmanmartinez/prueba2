import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ZoneDetail } from '../../../models/operations-zones.model';
import { filter } from 'rxjs/operators';

@Injectable()
export class OperationsZonesEditionStoreService implements OnDestroy {
    private zoneDetailSubject = new BehaviorSubject<ZoneDetail>(null);
    private zoneBackupSubject = new BehaviorSubject<ZoneDetail>(null);
    private updateZoneDetailSubject = new BehaviorSubject<boolean>(null);

    constructor() {
    }

    get zoneDetail$(): Observable<ZoneDetail> {
        return this.zoneDetailSubject.asObservable()
            .pipe(filter(value => !!value));
    }

    set zoneDetail(zoneDetail: ZoneDetail) {
        this.zoneDetailSubject.next(zoneDetail);
    }

    set zoneDetailError(error: any) {
        this.zoneDetailSubject.error(error);
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
            .pipe(filter(value => !!value));
    }

    set zoneBackup(zoneDetail: ZoneDetail) {
        this.zoneBackupSubject.next(zoneDetail);
    }

    set zoneBackupError(error: any) {
        this.zoneBackupSubject.error(error);
    }

    ngOnDestroy() {
        this.zoneDetailSubject.complete();
        this.updateZoneDetailSubject.complete();
        this.zoneBackupSubject.complete();
    }
}
