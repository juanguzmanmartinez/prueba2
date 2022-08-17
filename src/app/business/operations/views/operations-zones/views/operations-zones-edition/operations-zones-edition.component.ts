import { Component, OnDestroy, OnInit } from '@angular/core';
import { OperationsZonesEditionStoreService } from './stores/operations-zones-edition-store.service';
import { ActivatedRoute } from '@angular/router';
import { OperationsZonesImplementService } from '../../implements/operations-zones-implement.service';
import { ZoneDetail } from '../../models/operations-zones.model';
import { Subscription } from 'rxjs';
import { OperationsZonesEditionActionsStoreService } from './stores/operations-zones-edition-actions-store.service';
import { OP_ZONES_PATH } from '@parameters/router/routing/operations/operations-router.parameter';
import { ZoneServiceType } from '../../models/operations-zones-service-type.model';
import { map } from 'rxjs/operators';

@Component({
  template: '<router-outlet></router-outlet>',
  providers: [
    OperationsZonesEditionStoreService,
    OperationsZonesEditionActionsStoreService,
  ],
})
export class OperationsZonesEditionComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  private zoneCode: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _operationsZonesImplement: OperationsZonesImplementService,
    private _operationsZonesEditionStore: OperationsZonesEditionStoreService,
    private _operationsZonesEditionActionsStore: OperationsZonesEditionActionsStoreService
  ) {}

  ngOnInit(): void {
    const subscription = this._activatedRoute.paramMap.subscribe(() => {
      this.zoneCode =
        this._activatedRoute.snapshot.params[OP_ZONES_PATH.zoneCode];
      this._operationsZonesEditionStore.updateZoneDetail = true;
      this._operationsZonesEditionActionsStore.resetStore();
    });
    this.updateZoneDetail();
    this.subscriptions.add(subscription);
  }

  getZoneDetail(zoneCode: string): void {
    this._operationsZonesImplement.getZoneDetail(zoneCode).subscribe(
      (zoneDetail: ZoneDetail) => {
        console.log('zoneDetail', zoneDetail);
        this._operationsZonesEditionStore.zoneDetail = zoneDetail;
        if (zoneDetail.zoneBackup) {
          this.getZoneBackup(
            zoneDetail.zoneBackup.id,
            zoneDetail.zoneBackup.serviceTypeList
          );
        } else {
          this._operationsZonesEditionStore.zoneBackupNotRegistered();
        }
      },
      (error) => {
        this._operationsZonesEditionStore.zoneDetailError(error);
        this._operationsZonesEditionStore.zoneBackupError(error);
      }
    );
  }

  updateZoneDetail(): void {
    const subscription =
      this._operationsZonesEditionStore.updateZoneDetail$.subscribe(() => {
        this.getZoneDetail(this.zoneCode);
      });
    this.subscriptions.add(subscription);
  }

  getZoneBackup(zoneCode: string, servicesType: ZoneServiceType[]): void {
    this._operationsZonesImplement
      .getZoneDetail(zoneCode)
      .pipe(
        map((zoneDetail) => {
          zoneDetail.serviceTypeList = servicesType;
          return zoneDetail;
        })
      )
      .subscribe(
        (zoneDetail: ZoneDetail) => {
          this._operationsZonesEditionStore.zoneBackup = zoneDetail;
        },
        (error) => {
          this._operationsZonesEditionStore.zoneBackupError(error);
        }
      );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
