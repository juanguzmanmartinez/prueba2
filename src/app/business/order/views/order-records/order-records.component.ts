import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { normalizeValue } from '@helpers/string.helper';
import { CStatusOrderName, EStatusOrder } from '@models/status-order/status-order.model';
import { AlertService } from '@molecules/alert/alert.service';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { OrderFilterStore } from '@stores/order-filter-store.service';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ExportTableSelection } from '../../../../shared/utils/export-table-selection.util';
import { OrderRecordsImplementService } from './implements/order-records-implement.service';
import {
  ChannelFilterEvent,
  CompanyFilterEvent,
  DatepickerFilterEvent,
  LocalFilterEvent,
  OrderRecords,
  ServicesFilterEvent,
  StatusFilterEvent
} from './interfaces/order-records.interface';
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
  actions: 'actions',
};

@Component({
  selector: 'app-order-records',
  templateUrl: './order-records.component.html',
  styleUrls: ['./order-records.component.scss'],
})
export class OrderRecordsComponent implements OnInit, AfterViewInit, OnDestroy {

  tableLoader = true;
  errorResponse: HttpErrorResponse;

  totalOrder = 0;

  page = 1;
  pageSize = 10;
  showPaginator = true;

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
    ColumnNameList.actions,
  ];

  dataSource = new MatTableDataSource<OrderModel>();
  selection = new SelectionModel(true, []);
  private fixedSelectedRows: OrderModel[] = [];

  get selected(): number {
    return this.selection.selected.length;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('exporter') exporter;

  sortColumns = {
    orderId: {
      column: '1',
      reload: false
    },
    local: {
      column: '2',
      reload: false
    },
    channel: {
      column: '3',
      reload: false
    },
    service: {
      column: '4',
      reload: false
    },
    promiseDate: {
      column: '5',
      reload: false
    },
    client: {
      column: '6',
      reload: false
    },
    documentId: {
      column: '7',
      reload: false
    },
    state: {
      column: '8',
      reload: false
    }
  };

  readonly statusError = CStatusOrderName[EStatusOrder.error];

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private orderRecordsImplement: OrderRecordsImplementService,
    private alertService: AlertService,
    private orderFilterStore: OrderFilterStore
  ) {
  }

  ngOnInit(): void {
    const subscription = this.selection.changed.subscribe(
      (x) => (this.fixedSelectedRows = x.source.selected)
    );
    this.subscriptions.add(subscription);

    this.filterAll();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private setDataSourceService(): void {
    this.dataSource.filterPredicate = (data: OrderModel, fltr: string) => {
      const filterNormalize = normalizeValue(fltr);
      const orderId = normalizeValue(JSON.stringify(data.ecommerceId));
      const local = normalizeValue(data.local);
      const channel = normalizeValue(data.channel);
      const service = normalizeValue(data.service);
      const promiseDate = normalizeValue(JSON.stringify(data.promiseDate));
      const client = normalizeValue(data.client);
      const documentId = normalizeValue(data.documentId);
      const state = normalizeValue(data.state);
      const valueArray = [
        orderId,
        local,
        channel,
        service,
        promiseDate,
        client,
        documentId,
        state,
      ];
      const concatValue = normalizeValue(valueArray.join(''));
      const everyValue = valueArray.some((value) =>
        value.includes(filterNormalize)
      );

      return concatValue.includes(filterNormalize) && everyValue;
    };

    this.dataSource._updatePaginator(this.totalOrder);
    this.tableLoader = false;
  }

  viewOrderDetails(id: string): void {
    this.router.navigate([ROUTER_PATH.orderDetail(id)]);
  }

  onChangePage(pe: PageEvent): void {
    const orderFilter = this.orderFilterStore.getOrderFilter();

    this.tableLoader = true;
    this.orderRecordsImplement
      .orderList(
        pe.pageIndex + 1,
        pe.pageSize,
        orderFilter.searchCode,
        orderFilter.searchValue,
        orderFilter.locals,
        orderFilter.channelOfBuy,
        orderFilter.typeServices,
        orderFilter.datePromise,
        orderFilter.statusOrder,
        orderFilter.companies,
        orderFilter.orderCriteria
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
        error: (err) => (this.errorResponse = err),
      });
  }

  filterAll(): void {
    const orderFilter = this.orderFilterStore.getOrderFilter();

    this.tableLoader = true;
    this.showPaginator = false;
    this.orderRecordsImplement
      .orderList(
        1,
        this.pageSize,
        orderFilter.searchCode,
        orderFilter.searchValue,
        orderFilter.locals,
        orderFilter.channelOfBuy,
        orderFilter.typeServices,
        orderFilter.datePromise,
        orderFilter.statusOrder,
        orderFilter.companies,
        orderFilter.orderCriteria
      )
      .pipe(
        finalize(() => {
          this.page = 1;
          this.tableLoader = false;
          this.showPaginator = true;
        })
      )
      .subscribe({
        next: (res: any) => this.setOrderPageData(res, false),
        error: (err) => (this.errorResponse = err),
      });
  }

  filterBySearch(value: { code: string; search: string }): void {
    this.orderFilterStore.setSearchCode = value.code;
    this.orderFilterStore.setSearchValue = value.search;

    this.notFound = value.search;
    this.filterAll();
  }

  filterByLocal(event: LocalFilterEvent): void {
    this.orderFilterStore.setLocals = event.locals;

    this.notFound = event.notFound;
    this.filterAll();
  }

  filterByCompany(event: CompanyFilterEvent): void {
    this.orderFilterStore.setCompanies = event.companies;

    this.notFound = event.notFound;
    this.filterAll();
  }

  filterByService(event: ServicesFilterEvent): void {
    this.orderFilterStore.setTypeServices = event.services;

    this.notFound = event.notFound;
    this.filterAll();
  }

  filterByDatePromise(event: DatepickerFilterEvent): void {
    this.orderFilterStore.setDatePromise = event.dateRange;

    this.notFound = event.notFound;
    this.filterAll();
  }

  filterByStatus(event: StatusFilterEvent): void {
    this.orderFilterStore.setStatusOrder = event.status;

    this.notFound = event.notFound;
    this.filterAll();
  }

  filterByChannel(event: ChannelFilterEvent): void {
    this.orderFilterStore.setChannelOfBuy = event.channels;

    this.notFound = event.notFound;
    this.filterAll();
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  private setOrderPageData(response: OrderRecords, initialCharge = true): void {
    const selectedRecord = this.fixedSelectedRows.map(
      (value) => value.ecommerceId
    );
    const data = response.orders.filter(
      (item) => !selectedRecord.includes(item.ecommerceId)
    );
    this.dataSource.data = [...this.fixedSelectedRows, ...data];
    this.totalOrder = response.totalRecords;
    this.dataSource._updatePaginator(this.totalOrder);

    if (initialCharge) {
      this.setDataSourceService();
    }
  }

  sortData(event: { column: string, order: 'A' | 'D' | 'N' }): void {
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

    console.log(event);
    this.orderFilterStore.setOrderCriteria = event;
    this.filterAll();
  }

  exportData(): void {
    try {
      const data = this.selection.selected.map((value) => {
        return {
          ['N° Pedido (Digital)']: value.ecommerceId,
          ['N° Pedido (Call)']: '',
          ['Estado']: value.state,
          ['Local']: value.local,
          ['Marca']: '',
          ['Canal']: value.channel,
          ['Servicio']: value.service,
          ['Fecha Creación']: '',
          ['Fecha Promesa']: value.promiseDate.slice(0, 9),
          ['Hora Promesa']: value.promiseDate.slice(9).replace('<br>', '').trim(),
          ['Cliente']: value.client,
          ['Documento']: value.documentId,
          ['Dirección']: '',
          ['Correo']: '',
          ['Teléfono']: '',
          ['RUC']: '',
          ['Razón Social']: '',
          ['Coordenadas']: '',
          ['Zona']: '',
          ['Purchase ID']: '',
          ['Tipo Despacho']: '',
          ['Observación']: '',
          ['Motivo de Cancelación']: '',
          ['Tipo de Pago']: '',
          ['Estado Liquidacion']: '',
          ['Fecha Estado Liquidacion']: '',
          ['Transportista']: '',
          ['Documento Transportista']: '',
          ['Telefono Transportista']: '',
          ['Grupo de Viaje']: '',
          ['Total sin Descuentos']: '',
          ['Delivery']: '',
          ['Descuento']: '',
          ['Importe Total']: '',
        };
      });
      ExportTableSelection.exportArrayToExcel(data, 'Pedidos');
    } catch (e) {
      this.alertService.alertError(
        'Hubo un error al descargar la información, por favor vuelve a intentarlo.'
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
