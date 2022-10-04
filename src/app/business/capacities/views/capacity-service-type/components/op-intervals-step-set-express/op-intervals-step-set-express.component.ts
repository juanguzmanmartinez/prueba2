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
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { Subscription } from 'rxjs';
import { CapacitiesDrugstore } from '../../models/operations-capacities-responses.model';
import { DrugStoreServiceStore } from '../../store/drug-store.service';

@Component({
  selector: 'app-op-intervals-step-set-express',
  templateUrl: './op-intervals-step-set-express.component.html',
  styleUrls: ['./op-intervals-step-set-express.component.scss'],
})
export class OpIntervalsStepSetExpressComponent implements OnInit {
  private subscriptions = new Subscription();
  private drugStore: CapacitiesDrugstore;

  @Input() drugStoreCode: string;
  @Input() drugStoreName: string;

  fg: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _drugStoreServiceStore: DrugStoreServiceStore
  ) {
    // this.drugStore = null;
  }

  ngOnInit(): void {
    this.getDrugStore();
    this.fg = this._formBuilder.group({
      capacity: [false],
      intervaltime: [false],
      percentCapacity: [false],
      incrementCapcity: [false],
      incrementInterval: [''],
    });
  }

  getDrugStore(): void {
    this._drugStoreServiceStore
      .getDrugStore()
      .subscribe((drugStore) => (this.drugStore = drugStore));
  }

  @Input() data: any[] = [];

  selectionChange(ev) {}

  nextStep(e: any) {}

  get drugStoreCardTitle() {
    return `${this.drugStoreCode} ${this.drugStoreName}`;
  }

  cancelStep(e: any) {
    this._router.navigate([ROUTER_PATH.capacities]);
  }
}
