import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageClientService } from '@clients/storage/storage-client.service';
import { Subscription } from 'rxjs';
import { TABS } from '../../constants/step-tabs.constants';
import { UploadCapacitiesStoreService } from '../../stores/upload-capacities-store.service';

@Component({
  selector: 'app-operations-capacity-upload',
  templateUrl: './operations-capacity-upload.component.html',
  styleUrls: ['./operations-capacity-upload.component.scss'],
})
export class OperationsCapacityUploadComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  stepTabs = [];
  currentStep: string = '1';
  constructor(
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    private _storageClientService: StorageClientService
  ) {}

  ngOnInit(): void {
    // this.currentStep = this._uploadCapacitiesStoreService.getCurrentStep();
    TABS[0].icon = 'done';
    TABS[0].left = '';
    TABS[0].rigth = 'pending';
    TABS[1].icon = 'pending';
    TABS[1].left = 'pending';
    TABS[1].rigth = 'pending';

    TABS[2].icon = 'pending';
    TABS[2].left = 'pending';
    TABS[2].rigth = 'pending';
    this._uploadCapacitiesStoreService.setStepsTabs(TABS);

    let currentStep =
      this._storageClientService.getStorageCrypto('current-step');
    if (currentStep)
      this._uploadCapacitiesStoreService.setCurrentStep(currentStep);
    else this._uploadCapacitiesStoreService.setCurrentStep('1');

    this._uploadCapacitiesStoreService.setDataSource([]);
    const subscription =
      this._uploadCapacitiesStoreService.getCurrentStep$.subscribe(
        (eCapacityStepStatus: any) => {
          this.currentStep = eCapacityStepStatus;
        }
      );
    this.subscriptions.add(subscription);
    const subscription1 = this._uploadCapacitiesStoreService.setStepsTabs(TABS);
    this._uploadCapacitiesStoreService.getStepsTabs$.subscribe((stepsTabs) => {
      this.stepTabs = stepsTabs;
    });

    this.subscriptions.add(subscription1);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this._storageClientService.setStorageCrypto('current-step', '1');
    this._storageClientService.setStorageCrypto('data-raw', null);
    this._storageClientService.setStorageCrypto('list-stores', null);
    this._storageClientService.setStorageCrypto('data-source', null);
  }
}

export class CapacityLocal {
  code: any;
  local: string;
  service: string;
  segmentHour: string;
  capacity: string;
  constructor(iZone: any) {
    this.code = iZone.CodLocal;
    this.local = iZone.Local;
    this.service = iZone.Servicio;
    this.segmentHour = iZone.SegmentoHorario;
    this.capacity = iZone.Capacidad;
  }
}
