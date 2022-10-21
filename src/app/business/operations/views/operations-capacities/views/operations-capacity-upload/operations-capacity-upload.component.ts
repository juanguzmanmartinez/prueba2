import { Component, OnDestroy, OnInit } from '@angular/core';
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
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService
  ) {}

  ngOnInit(): void {
    // this.currentStep = this._uploadCapacitiesStoreService.getCurrentStep();
    TABS[1].flow = 'pending';
    TABS[2].flow = 'pending';
    TABS[2].icon = 'pending';
    TABS[1].icon = 'pending';
    this._uploadCapacitiesStoreService.setStepsTabs(TABS);
    this._uploadCapacitiesStoreService.setCurrentStep('1');
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
