import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CT_ROUTER_PATH } from '@parameters/router/routing/control-tower/control-tower-path.parameter';
import { ControlTowerImplementService } from 'app/business/control-tower/implements/control-tower.implement.service';
import { ISelectOption } from '@interfaces/vita/select.interface';
import { Observable, Subscription } from 'rxjs';
import { CarrierFilterFormService } from './services/carrier-filter-form.service';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.scss'],
})
export class CarrierComponent implements OnInit {
  displayedColumns: string[] = [
    'local',
    'carrier',
    'provider',
    'startHour',
    'status',
    'paused',
    'actions',
  ];
  dataFake: any[] = [
    {
      idCarrier: '1',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      startHour: '1:02 p.m.',
      status: 'DISPONIBLE',
      paused: 'No',
    },
    {
      idCarrier: '2',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      startHour: '1:02 p.m.',
      status: 'EN RUTA',
      paused: 'No',
    },
    {
      idCarrier: '3',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      startHour: '1:02 p.m.',
      status: 'NO DISPONIBLE',
      paused: 'No',
    },
    {
      idCarrier: '4',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      startHour: '1:02 p.m.',
      status: 'DISPONIBLE',
      paused: 'No',
    },
    {
      idCarrier: '5',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      startHour: '1:02 p.m.',
      status: 'DISPONIBLE',
      paused: 'No',
    },
    {
      idCarrier: '6',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      startHour: '1:02 p.m.',
      status: 'DISPONIBLE',
      paused: 'No',
    },
    {
      idCarrier: '7',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      startHour: '1:02 p.m.',
      status: 'DISPONIBLE',
      paused: 'No',
    },
    {
      idCarrier: '8',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      startHour: '1:02 p.m.',
      status: 'DISPONIBLE',
      paused: 'No',
    },
    {
      idCarrier: '9',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      startHour: '1:02 p.m.',
      status: 'DISPONIBLE',
      paused: 'No',
    },
    {
      idCarrier: '10',
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      startHour: '1:02 p.m.',
      status: 'DISPONIBLE',
      paused: 'No',
    },
  ];

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel(true, []);
  private fixedSelectedRows: any[] = [];
  page: number = 1;
  pageSize: number = 10;
  totalOrder = 50;
  selectedCompanies = [];
  selectedLocals = [];
  companies = ['DISPONIBLE', 'EN RUTA', 'NO DISPONIBLE'];
  locals = ['DOS DE MAYO', 'SALAVERRY', 'KENNEDY'];

  public subscription = new Subscription();
  public localList$: Observable<ISelectOption[]>;
  public carrierStateList$: Observable<ISelectOption[]>;
  public filterForm: FormGroup;
  public filterList: ISelectOption[];

  constructor(
    private router: Router,
    private controlTowerImplService: ControlTowerImplementService,
    private carrierFilterForm: CarrierFilterFormService
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.dataFake;
    this.dataSource.paginator = this.paginator;
    this.filterForm = this.carrierFilterForm.filterForm;
    this.localList$ = this.controlTowerImplService.getLocalList();
    this.carrierStateList$ = this.controlTowerImplService.getCarrierStateList();
    this.subscription.add(this.localList$.subscribe());
    this.subscription.add(this.carrierStateList$.subscribe());
  }
  get selected(): number {
    return this.selection.selected.length;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  viewCarrierRoute(idCarrier: string) {
    this.router.navigate([CT_ROUTER_PATH.ctCarrierRoute(idCarrier)]);
  }

  executeSearch() {
    this.filterList = this.carrierFilterForm.getFilterList();
  }

  isAllSelected(): boolean {
    let allSelected = true;
    const orderIdsSelected = this.fixedSelectedRows.map(
      (orderSelected) => orderSelected.orderId
    );

    this.dataSource.data.forEach((orderTable) => {
      if (!orderIdsSelected.includes(orderTable.orderId)) {
        allSelected = false;
        return;
      }
    });

    return allSelected;
  }
  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  onChangePage(pe: PageEvent): void {
    // const orderFilter = this.orderFilterStore.getOrderFilter();
    // const orderFilters = this.presenter.getFilters();
    // this.orderFilterStore.setDatePromise = orderFilters.promiseDate;
    // this.tableLoader = true;
    // this.orderRecordsImplement
    //   .orderList(
    //     pe.pageIndex + 1,
    //     pe.pageSize,
    //     orderFilters,
    //     orderFilter.orderCriteria
    //   )
    //   .pipe(
    //     finalize(() => {
    //       this.tableLoader = false;
    //     })
    //   )
    //   .subscribe({
    //     next: (res: OrderRecords) => {
    //       // this.page = res.page;
    //       this.orderFilterStore.setPage(res.page);
    //       this.setOrderPageData(res, false);
    //     },
    //     error: (err) => (this.errorResponse = err),
    //   });
  }

  filterAll(): void {
    // this.appearTable = true;
    // const orderFilter = this.orderFilterStore.getOrderFilter();
    // const orderFilters = this.presenter.getFilters();
    // this.orderFilterStore.setPageSize(this.pageSize);
    // this.orderFilterStore.setDatePromise = orderFilters.promiseDate;
    // this.tableLoader = true;
    // this.showPaginator = false;
    // this.orderRecordsImplement
    //   .orderList(
    //     this.page,
    //     this.pageSize,
    //     orderFilters,
    //     orderFilter.orderCriteria
    //   )
    //   .pipe(
    //     finalize(() => {
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
  selectionChange(e: any) {}
  clearValues() {}
}
