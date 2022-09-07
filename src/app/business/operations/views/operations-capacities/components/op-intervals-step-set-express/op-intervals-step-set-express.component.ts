import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-op-intervals-step-set-express',
  templateUrl: './op-intervals-step-set-express.component.html',
  styleUrls: ['./op-intervals-step-set-express.component.scss'],
})
export class OpIntervalsStepSetExpressComponent implements OnInit {
  private subscriptions = new Subscription();

  fg: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _router: Router) {}

  ngOnInit(): void {
    this.fg = this._formBuilder.group({
      ampm: [false],
      scheduled: [false],
      express: [false],
      ret: [false],
      departamento: [''],
      provincia: [''],
      distrito: [''],
      local: [''],
    });
  }

  @Input() data: any[] = [];

  selectionChange(ev) {
    console.log('e', ev);
  }

  nextStep(e: any) {}
  cancelStep(e: any) {
    this._router.navigate(['/operaciones/capacidades']);
  }

  // updateDefaultCapacityDrugstoreList(): void {
  //   const subscription =
  //     this._opCapacitiesDrugstoreDefaultCapacity.drugstoreList$.subscribe(
  //       (capacitiesDrugstoreList) => {
  //         this.capacitiesDrugstoreList = capacitiesDrugstoreList;
  //         this.changeCapacitiesDrugstoreSelection(capacitiesDrugstoreList[0]);
  //       }
  //     );
  //   this.subscriptions.add(subscription);
  // }
  // changeCapacitiesDrugstoreSelection(
  //   capacitiesDrugstore: CapacitiesDrugstore
  // ): void {
  //   this.capacitiesDrugstoreSelection = capacitiesDrugstore;
  //   this._opCapacitiesDrugstoreDefaultCapacity.drugstoreSelection =
  //     capacitiesDrugstore;
  // }
}
