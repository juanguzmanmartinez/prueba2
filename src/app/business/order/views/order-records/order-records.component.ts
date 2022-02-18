import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  SortAlphanumeric,
  SortNumeric,
  SortString,
} from '@helpers/sort.helper';
import { normalizeValue } from '@helpers/string.helper';
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
  StatusFilterEvent,
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

  private searchCode: string;
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
    ColumnNameList.actions,
  ];

  dataSource = new MatTableDataSource<OrderModel>();
  selection = new SelectionModel(true, []);
  fixedSelectedRows: OrderModel[] = [];
  formOrderRecords: FormGroup = null;

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
    private alertService: AlertService,
    private orderFilterStore: OrderFilterStore
  ) {}

  ngOnInit(): void {
    const subscription = this.selection.changed.subscribe(
      (x) => (this.fixedSelectedRows = x.source.selected)
    );
    this.subscriptions.add(subscription);

    this.orderRecordsImplement
      .orderList(this.page, this.pageSize)
      .pipe(
        finalize(() => {
          this.tableLoader = false;
        })
      )
      .subscribe({
        next: (res: OrderRecords) => this.setOrderPageData(res),
        error: (err) => (this.errorResponse = err),
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

    this.dataSource.sortData = (data: OrderModel[], sort: MatSort) => {
      return data.sort((a: OrderModel, b: OrderModel) => {
        switch (sort.active) {
          case ColumnNameList.orderId:
            return SortNumeric(a.orderId, b.orderId, sort.direction);
          case ColumnNameList.local:
            return SortAlphanumeric(a.local, b.local, sort.direction);
          case ColumnNameList.channel:
            return SortString(a.channel, b.channel, sort.direction);
          case ColumnNameList.service:
            return SortString(a.service, b.service, sort.direction);
          case ColumnNameList.promiseDate:
            return SortAlphanumeric(
              a.promiseDate,
              b.promiseDate,
              sort.direction
            );
          case ColumnNameList.client:
            return SortString(a.client, b.client, sort.direction);
          case ColumnNameList.documentId:
            return SortNumeric(a.documentId, b.documentId, sort.direction);
          case ColumnNameList.state:
            return SortString(a.state, b.state, sort.direction);

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
        this.searchCode,
        this.searchValue,
        this.selectedLocals,
        this.selectedChannel,
        this.selectedService,
        this.datePromise,
        this.selectedStatus,
        this.selectedCompany
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
    console.log({ orderFilter });

    this.tableLoader = true;
    this.showPaginator = false;
    this.orderRecordsImplement
      .orderList(
        this.page,
        this.pageSize,
        this.searchCode,
        this.searchValue,
        this.selectedLocals,
        this.selectedChannel,
        this.selectedService,
        this.datePromise,
        this.selectedStatus,
        this.selectedCompany
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
    this.searchCode = value.code;
    this.searchValue = value.search;

    this.orderFilterStore.setSearchCode = value.code;
    this.orderFilterStore.setSearchValue = value.search;

    this.notFound = value.search;
    this.filterAll();
  }

  filterByLocal(event: LocalFilterEvent): void {
    this.orderFilterStore.setLocals = event.locals;

    this.selectedLocals = event.locals;
    this.notFound = event.notFound;
    this.filterAll();
  }

  filterByCompany(event: CompanyFilterEvent): void {
    this.orderFilterStore.setCompanies = event.companies;

    this.selectedCompany = event.companies;
    this.notFound = event.notFound;
    this.filterAll();
  }

  filterByService(event: ServicesFilterEvent): void {
    this.orderFilterStore.setTypeServices = event.services;

    // this.formOrderRecords.get('services').setValue(event.services);
    // this.formOrderRecords.updateValueAndValidity();

    this.selectedService = event.services;
    this.notFound = event.notFound;
    this.filterAll();
  }

  filterByDatePromise(event: DatepickerFilterEvent): void {
    this.orderFilterStore.setDatePromise = event.dateRange;

    this.datePromise = event.dateRange;
    this.notFound = event.notFound;
    this.filterAll();
  }

  filterByStatus(event: StatusFilterEvent): void {
    this.orderFilterStore.setStatusOrder = event.status;

    this.selectedStatus = event.status;
    this.notFound = event.notFound;
    this.filterAll();
  }

  filterByChannel(event: ChannelFilterEvent): void {
    this.orderFilterStore.setChannelOfBuy = event.channels;

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

  exportData(): void {
    try {
      const data = this.selection.selected.map((value) => {
        return {
          ['N° Pedido (Digital)']: value.orderId,
          ['N° Pedido (Call)']: '',
          ['Estado']: value.state,
          ['Local']: value.local,
          ['Marca']: '',
          ['Canal']: value.channel,
          ['Servicio']: value.service,
          ['Fecha Creación']: '',
          ['Fecha Promesa']: value.promiseDate.slice(0, 9),
          ['Hora Promesa']: value.promiseDate
            .slice(9)
            .replace('<br>', '')
            .trim(),
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
