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

    open(zoneId: string): Observable<boolean> {
        this.openDialogLoader();
        this.getZoneDetail(zoneId);
        return this.dialogZoneDetailSubject.asObservable();
    }

    openDialogZoneDetail(zoneDetail: ZoneDetail): void {
        this.dialogDetailRef = this._dialog.open(OpZonesHomeZoneDetailDialogComponent);
        this.dialogDetailRef.componentInstance.zoneDetail = zoneDetail;
        this.dialogDetailRef.afterClosed()
            .pipe(take(1))
            .subscribe((closeResult: boolean) => {
                this.dialogZoneDetailSubject.next(closeResult);
            });
    }

    openDialogLoader(): void {
        this.dialogLoaderRef = this._dialogLoader.open();
    }

    getZoneDetail(zoneId: string): void {
        this._operationsZonesImplement.getZoneDetail(zoneId)
            .subscribe((zoneDetail: ZoneDetail) => {
                this.openDialogZoneDetail(zoneDetail);
                this.dialogLoaderRef.close();
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
