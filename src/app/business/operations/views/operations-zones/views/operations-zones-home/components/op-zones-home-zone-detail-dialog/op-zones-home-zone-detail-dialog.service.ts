import { Injectable, OnDestroy } from '@angular/core';
import { DialogService } from '@molecules/dialog/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { OpZonesHomeZoneDetailDialogComponent } from './op-zones-home-zone-detail-dialog.component';
import { ZoneDetail } from '../../../../models/operations-zones.model';
import { OperationsZonesImplementService } from '../../../../implements/operations-zones-implement.service';
import { DialogLoaderService } from '@molecules/dialog/views/dialog-loader/dialog-loader.service';
import { take } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class OpZonesHomeZoneDetailDialogService implements OnDestroy {
    private dialogDetailRef: MatDialogRef<OpZonesHomeZoneDetailDialogComponent>;
    private dialogLoaderRef: MatDialogRef<any>;
    private dialogZoneDetailSubject = new BehaviorSubject<boolean>(false);

    constructor(
        private _dialog: DialogService,
        private _dialogLoader: DialogLoaderService,
        private _operationsZonesImplement: OperationsZonesImplementService
    ) {
    }

    open(zoneCode: string): Observable<boolean> {
        this.openDialogLoader();
        this.getZoneDetail(zoneCode);
        return this.dialogZoneDetailSubject.asObservable();
    }

    openDialogZoneDetail(zoneDetail: ZoneDetail): void {
        this.dialogDetailRef = this._dialog.open(OpZonesHomeZoneDetailDialogComponent);
        this.dialogDetailRef.componentInstance.zoneDetail = zoneDetail;
        this.dialogDetailRef.afterClosed()
            .pipe(take(1))
            .subscribe((closeResult: boolean) => {
                this.dialogZoneDetailSubject.next(closeResult);
                this.dialogZoneDetailSubject.complete();
            });
    }

    openDialogLoader(): void {
        this.dialogZoneDetailSubject = new BehaviorSubject<boolean>(false);
        this.dialogLoaderRef = this._dialogLoader.open();
    }

    getZoneDetail(zoneCode: string): void {
        this._operationsZonesImplement.getZoneDetail(zoneCode)
            .subscribe((zoneDetail: ZoneDetail) => {
                this.openDialogZoneDetail(zoneDetail);
                this.dialogLoaderRef.close();
            }, (error) => {
                this.dialogLoaderRef.close();
                this.dialogZoneDetailSubject.error(error);
                this.dialogZoneDetailSubject.complete();
            });
    }

    ngOnDestroy() {
        if (this.dialogLoaderRef) {
            this.dialogLoaderRef.close();
        }
        if (this.dialogDetailRef) {
            this.dialogDetailRef.close();
        }
        this.dialogZoneDetailSubject.complete();
    }
}
