import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UploadCapacitiesStoreService } from '../../stores/upload-capacities-store.service';

@Component({
  selector: 'app-op-capacities-step-file-edit-capacity',
  templateUrl: './op-capacities-step-file-edit-capacity.component.html',
  styleUrls: ['./op-capacities-step-file-edit-capacity.component.scss'],
})
export class OpCapacitiesStepFileEditCapacityComponent
  implements OnInit, OnDestroy
{
  @ViewChild('inputAmpm') inputAmpm;
  textButtonNext = 'Cargar capacidades';
  private subscriptions = new Subscription();

  displayedColumns: string[] = ['seleccion', 'horario', 'capacidad'];
  constructor(
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    private _router: Router
  ) {}
  elementToEdit = { code: '', local: '' };
  ampm = [];
  ret = [];
  scheduled = [];
  express = [];

  mostrar: any = [];
  selection = new SelectionModel(true, []);

  private fixedSelectedRows: any[] = [];

  ngOnInit(): void {
    const subscription =
      this._uploadCapacitiesStoreService.getElementToEdit$.subscribe(
        (element) => {
          this.elementToEdit = element;
          this.ampm = element.ampm;
          this.ret = element.ret;
          this.scheduled = element.scheduled;
          this.express = element.express;
        }
      );
    this.subscriptions.add(subscription);

    const subscription1 = this.selection.changed.subscribe(
      (x) => (this.fixedSelectedRows = x.source.selected)
    );
    this.subscriptions.add(subscription1);
  }

  isAllSelected(): boolean {
    let allSelected = true;
    const orderIdsSelected = this.fixedSelectedRows.map(
      (orderSelected) => orderSelected.id
    );
    this.mostrar = orderIdsSelected;
    this.ampm.forEach((orderTable) => {
      if (!orderIdsSelected.includes(orderTable.id)) {
        allSelected = false;
        return;
      }
    });

    return allSelected;
  }

  masterToggle(data): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.ampm.forEach((row) => {
          this.mostrar = [];
          this.selection.select(row);
        });
  }

  changeAmpm(e, row) {
    this.ampm = this.ampm.map((item) => {
      if (item.id === row.id) {
        return {
          ...item,
          capacity:
            e.target.value != undefined && e.target.value != ''
              ? e.target.value
              : 0,
        };
      } else {
        return item;
      }
    });
  }
  setManyAmpm() {
    this.ampm.map((item) => {
      this.mostrar.map((pla) => {
        if (pla == item.id) {
          return (item.capacity = this.inputAmpm.inputValue);
        }
      });
    });
  }

  nextStep(e) {
    // let nuevadata = [];
    // const subscription =
    //   this._uploadCapacitiesStoreService.getDataSource$.subscribe(
    //     (element) => {}
    //   );
    // this.subscriptions.add(subscription);

    this._uploadCapacitiesStoreService.setCurrentStep('3');
  }
  cancelStep(e) {}

  get getTotalCapacityAmpm() {
    return this.ampm.reduce((a, { capacity }) => a + capacity, 0);
  }

  get getTitle() {
    return `${this.elementToEdit.code} - ${this.elementToEdit.local}: Editar capacidad`;
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
