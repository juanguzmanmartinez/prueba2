import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ZoneDetail } from '../../../models/operations-zones.model';
import { filter } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

export const CZoneBackupNotRegistered = false;
export type TZoneDetail = ZoneDetail | HttpErrorResponse;
export type TZoneBackup = ZoneDetail | HttpErrorResponse | boolean;

@Injectable()
export class OperationsZonesEditionStoreService implements OnDestroy {
    private zoneDetailSubject = new BehaviorSubject<TZoneDetail>(null);
    private zoneBackupSubject = new BehaviorSubject<TZoneBackup>(null);
    private updateZoneDetailSubject = new BehaviorSubject<boolean>(null);

    constructor() {
    }

    get zoneDetail$(): Observable<TZoneDetail> {
        return this.zoneDetailSubject.asObservable()
            .pipe(
                filter(value => value instanceof ZoneDetail || value instanceof HttpErrorResponse)
            );
    }

    set zoneDetail(zoneDetail: ZoneDetail) {
        this.zoneDetailSubject.next(zoneDetail);
    }

    zoneDetailError(error: any) {
        this.zoneDetailSubject.next(error);
    }

    get updateZoneDetail$(): Observable<boolean> {
        return this.updateZoneDetailSubject.asObservable()
            .pipe(filter(value => !!value));
    }

    set updateZoneDetail(updateZoneDetail: boolean) {
        this.updateZoneDetailSubject.next(updateZoneDetail);
    }

    get zoneBackup$(): Observable<TZoneBackup> {
        return this.zoneBackupSubject.asObservable()
            .pipe(
                filter(value => value instanceof ZoneDetail || value instanceof HttpErrorResponse || value === CZoneBackupNotRegistered)
            );
    }

    set zoneBackup(zoneDetail: ZoneDetail) {
        this.zoneBackupSubject.next(zoneDetail);
    }

    zoneBackupNotRegistered() {
        this.zoneBackupSubject.next(CZoneBackupNotRegistered);
    }

    zoneBackupError(error) {
        this.zoneBackupSubject.next(error);
    }

    ngOnDestroy() {
        this.zoneDetailSubject.complete();
        this.updateZoneDetailSubject.complete();
        this.zoneBackupSubject.complete();
    }
}
