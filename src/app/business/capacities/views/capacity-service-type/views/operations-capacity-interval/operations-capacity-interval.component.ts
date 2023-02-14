import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operations-capacity-interval',
  templateUrl: './operations-capacity-interval.component.html',
  styleUrls: ['./operations-capacity-interval.component.sass'],
})
export class OperationsCapacityIntervalComponent implements OnInit {
  tableLoader = true;
  displayedColumns: string[] = [
    'select',
    'code',
    'name',
    'demand',
    'intervaltime-base',
    'intervaltime',
    'capacity-base',
    'capacity',
    'times',
    'status',
    'actions',
  ];
  dataSource = [
    {
      code: 'BO5',
      name: 'San Miguel 1',
      demand: '60%',
      intervaltimeBase: '90 min',
      intervaltime: '30 min',
      capacityBase: '100',
      capacity: '5',
      times: '4',
      status: false,
    },
  ];

  private fixedSelectedRows: any[] = [];

  selection = new SelectionModel(true, []);

  sortColumns = {
    code: {
      column: '1',
      reload: false,
    },
    name: {
      column: '2',
      reload: false,
    },
    demand: {
      column: '3',
      reload: false,
    },
    intervaltimeBase: {
      column: '4',
      reload: false,
    },
    intervaltime: {
      column: '5',
      reload: false,
    },
    capacityBase: {
      column: '6',
      reload: false,
    },
    capacity: {
      column: '7',
      reload: false,
    },
    times: {
      column: '8',
      reload: false,
    },
    status: {
      column: '9',
      reload: false,
    },
  };

  capacitiesDrugstoreList: any[] = [];
  capacitiesDrugstoreSelection;

  selectedChannels: string[];
  list = [
    { code: 'CALL', name: 'Call Center' },
    { code: 'DIGITAL', name: 'Digital' },
  ];
  channels = this.list.map((value) => value.code);
  fg: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _router: Router) {}

  ngOnInit(): void {
    this.fg = this._formBuilder.group({
      serviceChannel: [''],
    });
  }

  changeCapacitiesDrugstoreSelection(capacitiesDrugstore: any): void {}
  selectionChange(e) {}
  clearValues(): void {}
  isAllSelected(): boolean {
    let allSelected = true;
    const orderIdsSelected = this.fixedSelectedRows.map(
      (orderSelected) => orderSelected.orderId
    );
    this.dataSource.forEach((orderTable) => {
      if (!orderIdsSelected.includes(orderTable.code)) {
        allSelected = false;
        return;
      }
    });

    return allSelected;
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.forEach((row) => this.selection.select(row));
  }

  sortData(event: { column: string; order: 'A' | 'D' | 'N' }): void {
    for (const sortColumnsKey in this.sortColumns) {
      if (this.sortColumns[sortColumnsKey].column !== event.column) {
        this.sortColumns[sortColumnsKey].reload = true;
      }
    }

    setTimeout(() => {
      for (const sortColumnsKey of Object.keys(this.sortColumns)) {
        this.sortColumns[sortColumnsKey].reload = false;
      }
    }, 200);

    // this.orderFilterStore.setOrderCriteria = event;
    this.filterAll();
  }
  filterAll(): void {
    // const orderFilter = this.orderFilterStore.getOrderFilter();
    // const orderFilters = this.presenter.getFilters();
    // this.orderFilterStore.setDatePromise = orderFilters.promiseDate;
    // this.tableLoader = true;
    // this.showPaginator = false;
    // this.orderRecordsImplement
    //   .orderList(1, this.pageSize, orderFilters, orderFilter.orderCriteria)
    //   .pipe(
    //     finalize(() => {
    //       this.page = 1;
    //       this.tableLoader = false;
    //       this.showPaginator = true;
    //     })
    //   )
    //   .subscribe({
    //     next: (res: any) => {
    //       this.selection.clear();
    //       this.setOrderPageData(res, false);
    //     },
    //     error: (err) => (this.errorResponse = err),
    //   });
  }
  getChannelName(option: string): string {
    return this.list.find((channel) => channel.code === option).name;
  }
  goToUploadInterval() {
    this._router.navigate(['/operaciones/capacidades/intervaltime/upload']);
  }
}
