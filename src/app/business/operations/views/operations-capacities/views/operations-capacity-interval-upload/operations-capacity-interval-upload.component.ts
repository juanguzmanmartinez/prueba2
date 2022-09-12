import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
// import { TABS } from '../../constants/step-tabs.constants';
// import { UploadCapacitiesStoreService } from '../../stores/upload-capacities-store.service';
@Component({
  selector: 'app-operations-capacity-interval-upload',
  templateUrl: './operations-capacity-interval-upload.component.html',
  styleUrls: ['./operations-capacity-interval-upload.component.scss'],
})
export class OperationsCapacityIntervalUploadComponent implements OnInit {
  // private subscriptions = new Subscription();
  // stepTabs = [];
  // currentStep: string = '1';
  // constructor(
  //   private _uploadCapacitiesStoreService: UploadCapacitiesStoreService
  // ) {}

  ngOnInit(): void {
    // // this.currentStep = this._uploadCapacitiesStoreService.getCurrentStep();
    // const subscription =
    //   this._uploadCapacitiesStoreService.getCurrentStep$.subscribe(
    //     (eCapacityStepStatus: any) => {
    //       this.currentStep = eCapacityStepStatus;
    //     }
    //   );
    // this.subscriptions.add(subscription);
    // const subscription1 = this._uploadCapacitiesStoreService.setStepsTabs(TABS);
    // this._uploadCapacitiesStoreService.getStepsTabs$.subscribe((stepsTabs) => {
    //   this.stepTabs = stepsTabs;
    // });
    // this.subscriptions.add(subscription1);
  }
  // ngOnDestroy(): void {
  //   this.subscriptions.unsubscribe();
  // }
}
