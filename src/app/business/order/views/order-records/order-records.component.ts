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
import { finalize, tap } from 'rxjs/operators';
import { OrderModel } from './models/order-records.model';

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

  pageIndex = 0;
  pageSize = 10;

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

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel(true, []);
  fixedSelectedRows: any[] = [];

  get selected(): number {
    return this.selection.selected.length;
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private orderRecordsImplement: OrderRecordsImplementService
  ) {
  }

  ngOnInit(): void {
    const subscription = this.selection.changed.subscribe(x => this.fixedSelectedRows = x.source.selected);
    this.subscriptions.add(subscription);

    this.orderRecordsImplement.orderList(this.pageIndex, this.pageSize)
      .pipe(
        finalize(() => this.tableLoader = false),
        tap(console.log)
      )
      .subscribe({
        next: (res: OrderModel[]) => this.setOrderPageData(res),
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
        pe.pageIndex,
        pe.pageSize,
        // this.searchContent,
        // this.startDate,
        // this.endDate,
        // this.selectedState,
        // this.selectedLocals
      )
      .pipe(
        finalize(() => {
          this.tableLoader = false;
        })
      )
      .subscribe({
        next: (res: OrderModel[]) => {
          this.pageIndex = pe.pageIndex;
          this.setOrderPageData(res, false);
        },
        error: err => this.errorResponse = err
      });
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

  private setOrderPageData(response: OrderModel[], initialCharge = true): void {
    const selectedRecord = this.fixedSelectedRows.map(value => value.ecommerceId);
    const data = response.filter(item => !selectedRecord.includes(item.ecommerceId));
    this.dataSource.data = [
      ...this.fixedSelectedRows,
      ...data
    ];
    this.totalOrder = response.length;
    this.dataSource._updatePaginator(this.totalOrder);

    if (initialCharge) {
      this.setDataSourceService();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
