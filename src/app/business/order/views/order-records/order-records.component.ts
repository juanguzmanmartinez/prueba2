import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { normalizeValue } from '@helpers/string.helper';
import { SortAlphanumeric } from '@helpers/sort.helper';
import { OrderRecordsImplementService } from './implements/order-records-implement.service';
import { finalize } from 'rxjs/operators';
import { OrderModel } from './models/order-records.model';
import {
  ChannelFilterEvent,
  CompanyFilterEvent,
  DatepickerFilterEvent,
  LocalFilterEvent,
  OrderRecords,
  ServicesFilterEvent,
  StatusFilterEvent
} from './interfaces/order-records.interface';
import { AlertService } from '@molecules/alert/alert.service';

const ColumnNameList = {
  select: 'select',
  id: 'id',
  orderId: 'orderId',
  local: 'local',
  channel: 'channel',
  service: 'service',
  promiseDate: 'promiseDate',
  client: 'client',
  documentId: 'documentId',
  state: 'state',
  actions: 'actions'
};

@Component({
  selector: 'app-order-records',
  templateUrl: './order-records.component.html',
  styleUrls: ['./order-records.component.scss']
})
export class OrderRecordsComponent implements OnInit, AfterViewInit, OnDestroy {

  tableLoader = true;
  errorResponse: HttpErrorResponse;

  totalOrder = 0;

  page = 1;
  pageSize = 10;

  private searchValue: string;
  private selectedLocals: string[];
  private selectedCompany: string[];
  private selectedService: string[];
  private datePromise: string[];
  private selectedStatus: string[];
  private selectedChannel: string[];

  notFound = '';

  displayedColumns: string[] = [
    ColumnNameList.select,
    ColumnNameList.orderId,
    ColumnNameList.local,
    ColumnNameList.channel,
    ColumnNameList.service,
    ColumnNameList.promiseDate,
    ColumnNameList.client,
    ColumnNameList.documentId,
    ColumnNameList.state,
    ColumnNameList.actions
  ];

  dataSource = new MatTableDataSource<OrderModel>();
  selection = new SelectionModel(true, []);
  fixedSelectedRows: OrderModel[] = [];

  get selected(): number {
    return this.selection.selected.length;
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('exporter') exporter;

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private orderRecordsImplement: OrderRecordsImplementService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    const subscription = this.selection.changed.subscribe(x => this.fixedSelectedRows = x.source.selected);
    this.subscriptions.add(subscription);

    this.orderRecordsImplement.orderList(this.page, this.pageSize)
      .pipe(
        finalize(() => {
          this.tableLoader = false;
        }),
      )
      .subscribe({
        next: (res: OrderRecords) => this.setOrderPageData(res),
        error: err => this.errorResponse = err
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private setDataSourceService(): void {
    this.dataSource.filterPredicate = (data: OrderModel, fltr: string) => {
      const filterNormalize = normalizeValue(fltr);
      const orderId = normalizeValue(JSON.stringify(data.orderId));
      const local = normalizeValue(data.local);
      const channel = normalizeValue(data.channel);
      const service = normalizeValue(data.service);
      const promiseDate = normalizeValue(JSON.stringify(data.promiseDate));
      const client = normalizeValue(data.client);
      const documentId = normalizeValue(data.documentId);
      const state = normalizeValue(data.state);
      const valueArray = [
        orderId, local, channel, service, promiseDate, client, documentId, state
      ];
      const concatValue = normalizeValue(valueArray.join(''));
      const everyValue = valueArray.some(value => value.includes(filterNormalize));

      return concatValue.includes(filterNormalize) && everyValue;
    };

    this.dataSource.sortData = (data: OrderModel[], sort: MatSort) => {
      return data.sort((a: OrderModel, b: OrderModel) => {
        switch (sort.active) {
          case ColumnNameList.orderId:
            return SortAlphanumeric(a.orderId, b.orderId, sort.direction);
          case ColumnNameList.local:
            return SortAlphanumeric(a.local, b.local, sort.direction);
          case ColumnNameList.channel:
            return SortAlphanumeric(a.channel, b.channel, sort.direction);
          case ColumnNameList.service:
            return SortAlphanumeric(a.service, b.service, sort.direction);
          case ColumnNameList.promiseDate:
            return SortAlphanumeric(a.promiseDate, b.promiseDate, sort.direction);
          case ColumnNameList.client:
            return SortAlphanumeric(a.client, b.client, sort.direction);
          case ColumnNameList.documentId:
            return SortAlphanumeric(a.documentId, b.documentId, sort.direction);
          case ColumnNameList.state:
            return SortAlphanumeric(a.state, b.state, sort.direction);

          default:
            const defaultA = a[sort.active];
            const defaultB = b[sort.active];
            return SortAlphanumeric(defaultA, defaultB, sort.direction);
        }
      });
    };

    this.dataSource._updatePaginator(this.totalOrder);
    this.tableLoader = false;
  }

  viewOrderDetails(id: string): void {
    this.router.navigate([ROUTER_PATH.orderDetail(id)]);
  }

  onChangePage(pe: PageEvent): void {
    this.tableLoader = true;
    this.orderRecordsImplement
      .orderList(
        pe.pageIndex + 1,
        pe.pageSize,
        this.searchValue,
        this.selectedLocals,
        this.selectedCompany,
        this.selectedService,
        this.datePromise,
        this.selectedStatus,
        this.selectedChannel
      )
      .pipe(
        finalize(() => {
          this.tableLoader = false;
        })
      )
      .subscribe({
        next: (res: OrderRecords) => {
          this.page = res.page;
          this.setOrderPageData(res, false);
        },
        error: err => this.errorResponse = err
      });
  }

  filterAll(): void {
    this.tableLoader = true;
    this.orderRecordsImplement
      .orderList(
        this.page,
        this.pageSize,
        this.searchValue,
        this.selectedLocals,
        this.selectedCompany,
        this.selectedService,
        this.datePromise,
        this.selectedStatus,
        this.selectedChannel
      )
      .pipe(
        finalize(() => {
          this.tableLoader = false;
        })
      )
      .subscribe({
        next: (res: any) => this.setOrderPageData(res, false),
        error: err => this.errorResponse = err
      });
  }

  filterBySearch(value: string): void {
    this.searchValue = value;
    this.notFound = value;
    this.filterAll();
  }

  filterByLocal(event: LocalFilterEvent): void {
    this.selectedLocals = event.locals;
    this.notFound = event.notFound;
    this.filterAll();
  }

  filterByCompany(event: CompanyFilterEvent): void {
    this.selectedCompany = event.companies;
    this.notFound = event.notFound;
    this.filterAll();
  }

  filterByService(event: ServicesFilterEvent): void {
    this.selectedService = event.services;
    this.notFound = event.notFound;
    this.filterAll();
  }

  filterByDatePromise(event: DatepickerFilterEvent): void {
    this.datePromise = event.dateRange;
    this.notFound = event.notFound;
    this.filterAll();
  }

  filterByStatus(event: StatusFilterEvent): void {
    this.selectedStatus = event.status;
    this.notFound = event.notFound;
    this.filterAll();
  }

  filterByChannel(event: ChannelFilterEvent): void {
    this.selectedChannel = event.channels;
    this.notFound = event.notFound;
    this.filterAll();
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  private setOrderPageData(response: OrderRecords, initialCharge = true): void {
    const selectedRecord = this.fixedSelectedRows.map(value => value.ecommerceId);
    const data = response.orders.filter(item => !selectedRecord.includes(item.ecommerceId));
    this.dataSource.data = [
      ...this.fixedSelectedRows,
      ...data
    ];
    this.totalOrder = response.totalRecords;
    this.dataSource._updatePaginator(this.totalOrder);

    if (initialCharge) {
      this.setDataSourceService();
    }
  }

  exportData(): void {
    try {
      this.exporter.exportTable('xlsx', { fileName: 'Pedidos' });
    } catch (e) {
      this.alertService.alertError('Hubo un error al descargar la información, por favor vuelve a intentarlo.');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
