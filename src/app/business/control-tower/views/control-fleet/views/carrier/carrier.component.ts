import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { Carrier } from 'app/business/control-tower/models/carrier.model';
import { CarrierListDBDummy } from 'app/business/control-tower/db-example/carrier-list.db';
import { CarrierService } from './services/carrier.service';
import { CarrierStore } from './store/carrier.store';
@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.scss'],
})
export class CarrierComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'local',
    'carrier',
    'provider',
    'startHour',
    'state',
    'paused',
    'actions',
  ];
  dataFake: any[] = CarrierListDBDummy;

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel(true, []);
  private fixedSelectedRows: any[] = [];
  page: number = 1;
  pageSize: number = 10;
  totalOrder = 50;
  selectedCompanies = [];
  selectedLocals = [];

  public subscription = new Subscription();
  public localList$: Observable<ISelectOption[]>;
  public carrierStateList$: Observable<ISelectOption[]>;
  public carrierList$: Observable<Carrier[]>;
  public carrierList: Carrier[];
  public filterForm: FormGroup;
  public filterList: ISelectOption[];

  constructor(
    private router: Router,
    private carrierFilterForm: CarrierFilterFormService,
    private carrierService: CarrierService
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.filterForm = this.carrierFilterForm.filterForm;
    this.localList$ = this.carrierService.getLocalList();
    this.carrierStateList$ = this.carrierService.getCarrierStateList();
    this.loadCarrierSettings();
  }

  get selected(): number {
    return this.selection.selected.length;
  }

  loadCarrierSettings() {
    this.subscription.add(this.carrierService.loadCarrierList().subscribe());
    this.subscription.add(this.carrierService.loadLocalList().subscribe());
    this.subscription.add(
      this.carrierService.loadCarrierStateList().subscribe()
    );
  }

  filterCarrierList() {
    const carrierFilters = this.carrierFilterForm.filterForm.value;
    this.carrierService.filterCarrierList(carrierFilters);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  viewCarrierRoute(idCarrier: string) {
    this.router.navigate([CT_ROUTER_PATH.ctCarrierRoute(idCarrier)]);
  }

  executeSearch() {
    this.filterList = this.carrierFilterForm.getfilterPillList();
    this.filterCarrierList();
  }

  deleteOptionFilter(filter: ISelectOption) {
    console.log(filter)
    this.carrierFilterForm.deleteOptionFilter(filter);
    this.executeSearch();
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
