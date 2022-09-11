import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UploadCapacitiesStoreService } from '../../../../stores/upload-capacities-store.service';

@Component({
  selector: 'app-op-capacities-upload-edit-ret',
  templateUrl: './op-capacities-upload-edit-ret.component.html',
  styleUrls: ['./op-capacities-upload-edit-ret.component.sass'],
})
export class OpCapacitiesUploadEditRetComponent implements OnInit {
  @ViewChild('inputRet') inputRet;
  private subscriptions = new Subscription();

  ret = [];
  displayedColumns: string[] = ['seleccion', 'horario', 'capacidad'];
  elementToEdit;
  datos;
  showData: any = [];
  selection = new SelectionModel(true, []);

  private fixedSelectedRows: any[] = [];

  constructor(
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService
  ) {}

  ngOnInit(): void {
    const subscription =
      this._uploadCapacitiesStoreService.getElementToEdit$.subscribe(
        (element) => {
          this.elementToEdit = element;
          this.ret = element.ret;
          // this.ret = element.ret;
          // this.scheduled = element.scheduled;
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
    this.showData = orderIdsSelected;
    this.ret.forEach((orderTable) => {
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
      : this.ret.forEach((row) => {
          this.showData = [];
          this.selection.select(row);
        });
  }

  // selectRoiw(row) {
  //   this.selection.toggle(row);
  // }

  changeRet(e, row) {
    this.ret = this.ret.map((item) => {
      if (item.id === row.id) {
        return {
          ...item,
          capacity:
            e.target.value != undefined && e.target.value != ''
              ? Number(e.target.value)
              : 0,
        };
      } else {
        return item;
      }
    });
    this.setElementToEdit();
  }
  setManyRet() {
    this.ret.map((item) => {
      this.showData.map((pla) => {
        if (pla == item.id) {
          return (item.capacity = this.inputRet.inputValue);
        }
      });
    });
    this.setElementToEdit();
  }

  setElementToEdit() {
    this.elementToEdit.ret = this.ret;
    this.elementToEdit.retTotalCapacity = this.getTotalCapacityAmpm;
    const subscription = this._uploadCapacitiesStoreService.setElementToEdit(
      this.elementToEdit
    );
    this.subscriptions.add(subscription);
  }
  get getTotalCapacityAmpm() {
    return this.ret.reduce((a, { capacity }) => a + capacity, 0);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
