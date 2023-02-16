import { SelectionModel } from '@angular/cdk/collections';
import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { normalizeValue } from '@helpers/string.helper';
import { IDrugstore } from '@interfaces/drugstores/drugstores.interface';
import {
  CStatusOrderName,
  EStatusOrder,
} from '@models/status-order/status-order.model';
import { AlertService } from '@molecules/alert/alert.service';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { OrderFilterStore } from '@stores/order-filter-store.service';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { ExportTableSelection } from '../../../../shared/utils/export-table-selection.util';
import { OrderCancelDialogService } from '../order-cancel-dialog/order-cancel-dialog.service';
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
import { OrderFormPresenter } from './order-form.presenter';

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
  providers: [CurrencyPipe],
})
export class OrderRecordsComponent implements OnInit, AfterViewInit, OnDestroy {
  tableLoader = false;
  loadingExport = false;
  errorResponse: HttpErrorResponse;

  localList: IDrugstore[];
  totalOrder = 0;
  activeButtonFilter: boolean;
  page = 1;
  pageSize = 10;
  showPaginator = true;
  fontColorDownloadItem: string;
  notFound = '';
  appearTable = false;

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
      reload: false,
    },
    local: {
      column: '2',
      reload: false,
    },
    channel: {
      column: '3',
      reload: false,
    },
    service: {
      column: '4',
      reload: false,
    },
    promiseDate: {
      column: '5',
      reload: false,
    },
    client: {
      column: '6',
      reload: false,
    },
    documentId: {
      column: '7',
      reload: false,
    },
    state: {
      column: '8',
      reload: false,
    },
  };

  readonly statusError = CStatusOrderName[EStatusOrder.error];

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private orderRecordsImplement: OrderRecordsImplementService,
    private alertService: AlertService,
    private orderFilterStore: OrderFilterStore,
    private currencyPipe: CurrencyPipe,
    public presenter: OrderFormPresenter,
    private orderCancelDialog: OrderCancelDialogService
  ) {
    this.activeButtonFilter = false;
    this.fontColorDownloadItem = '#2697FF';
  }

  ngOnInit(): void {
    const subscription = this.selection.changed.subscribe(
      (x) => (this.fixedSelectedRows = x.source.selected)
    );
    this.subscriptions.add(subscription);
    this.getListStore();
    this.appearTable = false;
    this.formOnChanges();
  }

  formOnChanges() {
    this.presenter.filterForm.valueChanges
      .pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe((val) => {
        if (
          ((val.companyCode && val.companyCode.length > 0) ||
            (val.localId && val.localId.length > 0) ||
            (val.orderStatus && val.orderStatus.length > 0) ||
            (val.serviceChannel && val.serviceChannel.length > 0) ||
            (val.serviceTypeId && val.serviceTypeId.length > 0)) &&
          !val.searchValue
        ) {
          this.presenter.setPromiseDateRequiredValidator();
          this.presenter.clearRangeDateRequiredValidator();
          if (val.promiseDateSelect === 'Otro periodo') {
            this.presenter.clearPromiseDateValidators();
            this.presenter.setRangeDateRequiredValidator();
          }
        } else {
          this.presenter.clearPromiseDateValidators();
          this.presenter.clearRangeDateRequiredValidator();
        }
      });
  }

  getListStore(): void {
    this.subscriptions.add(
      this.orderFilterStore
        .getLocalList()
        .subscribe((localList) => (this.localList = localList))
    );
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
    const orderFilters = this.presenter.getFilters();
    this.orderFilterStore.setDatePromise = orderFilters.promiseDate;
    this.tableLoader = true;
    this.orderRecordsImplement
      .orderList(
        pe.pageIndex + 1,
        pe.pageSize,
        orderFilters,
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
    this.appearTable = true;
    const orderFilter = this.orderFilterStore.getOrderFilter();
    const orderFilters = this.presenter.getFilters();
    this.orderFilterStore.setDatePromise = orderFilters.promiseDate;
    this.tableLoader = true;
    this.showPaginator = false;
    this.orderRecordsImplement
      .orderList(1, this.pageSize, orderFilters, orderFilter.orderCriteria)
      .pipe(
        finalize(() => {
          this.page = 1;
          this.tableLoader = false;
          this.showPaginator = true;
        })
      )
      .subscribe({
        next: (res: any) => {
          this.selection.clear();
          this.setOrderPageData(res, false);
        },
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
    const previousValue = this.orderFilterStore.getDatePromise;

    this.orderFilterStore.setDatePromise = event.dateRange;
    this.notFound = event.notFound;

    const [prevDateInit, prevDateEnd] = previousValue ?? ['', ''];
    const [dateInit, dateEnd] = event.dateRange ?? ['', ''];

    if (prevDateInit !== dateInit && prevDateEnd !== dateEnd) {
      this.filterAll();
    }
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

  private setOrderPageData(response: OrderRecords, initialCharge = true): void {
    const orderIdSelected = this.fixedSelectedRows.map(
      (order) => order.orderId
    );

    const builds = response.orders.map((order) => {
      if (orderIdSelected.includes(order.orderId)) {
        const orderSelected = this.fixedSelectedRows.find(
          (orderFixed) => orderFixed.orderId === order.orderId
        );
        this.selection.deselect(orderSelected);
        this.selection.select(order);
        return this.fixedSelectedRows.find(
          (newOrder) => newOrder.orderId === order.orderId
        );
      } else {
        return order;
      }
    });

    this.dataSource.data = builds;

    this.totalOrder = response.totalRecords;
    this.dataSource._updatePaginator(this.totalOrder);

    if (initialCharge) {
      this.setDataSourceService();
    }
  }

  naturalCompare(a, b) {
    return a - b;
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

    this.orderFilterStore.setOrderCriteria = event;
    this.filterAll();
  }

  resetOrderFilters() {
    this.presenter.reset();
    this.orderFilterStore.setIsResetFilters(true);
    this.appearTable = false;
  }

  getLocalDescription(localCode: string) {
    const local = this.localList.find((local) => local.localCode === localCode);
    if (!local) {
      return '-';
    }
    if (!local.name) {
      return local.localCode;
    }
    return `${local.name} - ${local.localCode}`;
  }

  exportData(): void {
    this.loadingExport = true;
    const orderListId = this.selection.selected.map((order: OrderModel) =>
      order.orderId.toString()
    );
    this.orderRecordsImplement.orderReport(orderListId).subscribe(
      (orderList) => {
        try {
          const data = orderList.orders.map((value: OrderModel) => {
            return {
              ['N° Pedido (Digital)']: value.ecommerceId,
              ['N° Pedido (Call)']:
                value.orderDetail && value.orderDetail.callNumber
                  ? value.orderDetail.callNumber
                  : '-',
              ['Estado']: value.state ? value.state : '-',
              ['Local']: value.local
                ? this.getLocalDescription(value.local)
                : '-',
              ['Marca']: value.companyCode,
              ['Canal']: value.channel,
              ['Servicio']: value.service,
              ['Fecha Creación']:
                value.orderDetail && value.orderDetail.timeline
                  ? value.orderDetail.timeline.find(
                      (step) => step.status === 'En tienda'
                    )
                    ? value.orderDetail.timeline.find(
                        (step) => step.status === 'En tienda'
                      ).date
                    : '-'
                  : '-',
              ['Fecha Promesa']: value.promiseDate.slice(0, 9),
              ['Hora Promesa']: value.promiseDate
                .slice(9)
                .replace('<br>', '')
                .trim(),
              ['Cliente']: value.client,
              ['Doc. Identidad']: value.documentId,
              ['Dirección']:
                value.orderDetail &&
                value.orderDetail.clientInformation &&
                value.orderDetail.clientInformation.address
                  ? value.orderDetail.clientInformation.address
                  : '-',
              ['Correo']:
                value.orderDetail &&
                value.orderDetail.clientInformation &&
                value.orderDetail.clientInformation.email
                  ? value.orderDetail.clientInformation.email
                  : '-',
              ['Teléfono']:
                value.orderDetail &&
                value.orderDetail.clientInformation &&
                value.orderDetail.clientInformation.phone
                  ? value.orderDetail.clientInformation.phone
                  : '-',
              ['RUC']:
                value.orderDetail &&
                value.orderDetail.clientInformation &&
                value.orderDetail.clientInformation.ruc
                  ? value.orderDetail.clientInformation.ruc
                  : '-',
              ['Razón Social']:
                value.orderDetail &&
                value.orderDetail.clientInformation &&
                value.orderDetail.clientInformation.businessName
                  ? value.orderDetail.clientInformation.businessName
                  : '-',
              ['Coordenadas']:
                value.orderDetail &&
                value.orderDetail.clientInformation &&
                value.orderDetail.clientInformation.coordinates
                  ? value.orderDetail.clientInformation.coordinates
                  : '-',
              ['Zona']:
                value.orderDetail &&
                value.orderDetail.orderInformation &&
                value.orderDetail.orderInformation.zone
                  ? value.orderDetail.orderInformation.zone
                  : '-',
              ['Purchase ID']:
                value.orderDetail &&
                value.orderDetail.orderInformation &&
                value.orderDetail.orderInformation.purchaseId
                  ? value.orderDetail.orderInformation.purchaseId
                  : '-',
              ['Tipo Despacho']:
                value.orderDetail &&
                value.orderDetail.orderInformation &&
                value.orderDetail.orderInformation.typeOfOffice
                  ? value.orderDetail.orderInformation.typeOfOffice
                  : '-',
              ['Observación']:
                value.orderDetail &&
                value.orderDetail.orderInformation &&
                value.orderDetail.orderInformation.observation
                  ? value.orderDetail.orderInformation.observation
                  : '-',
              ['Motivo de Cancelación']:
                value.orderDetail &&
                value.orderDetail.orderInformation &&
                value.orderDetail.orderInformation.reasonForCancellation
                  ? value.orderDetail.orderInformation.reasonForCancellation
                  : '-',
              ['Tipo de Pago']:
                value.orderDetail &&
                value.orderDetail.paymentInformation &&
                value.orderDetail.paymentInformation.paymentType
                  ? value.orderDetail.paymentInformation.paymentType
                  : '-',
              ['Estado Liquidacion']:
                value.orderDetail &&
                value.orderDetail.paymentInformation &&
                value.orderDetail.paymentInformation.status
                  ? value.orderDetail.paymentInformation.status
                  : '-',
              ['Fecha Estado Liquidacion']:
                value.orderDetail &&
                value.orderDetail.paymentInformation &&
                value.orderDetail.paymentInformation.date
                  ? value.orderDetail.paymentInformation.date
                  : '-',
              ['Transportista']:
                value.orderDetail &&
                value.orderDetail.carrierInformation &&
                value.orderDetail.carrierInformation.transporters
                  ? value.orderDetail.carrierInformation.transporters
                  : '-',
              ['Documento Transportista']:
                value.orderDetail &&
                value.orderDetail.carrierInformation &&
                value.orderDetail.carrierInformation.document
                  ? value.orderDetail.carrierInformation.document
                  : '-',
              ['Telefono Transportista']:
                value.orderDetail &&
                value.orderDetail.carrierInformation &&
                value.orderDetail.carrierInformation.mobile
                  ? value.orderDetail.carrierInformation.mobile
                  : '-',
              ['Grupo de Viaje']:
                value.orderDetail &&
                value.orderDetail.carrierInformation &&
                value.orderDetail.carrierInformation.tripGroup
                  ? value.orderDetail.carrierInformation.tripGroup
                  : '-',
              ['Total sin Descuentos']:
                value.orderDetail &&
                value.orderDetail.productInformation &&
                value.orderDetail.productInformation.withoutDiscountAmount
                  ? value.orderDetail.productInformation.withoutDiscountAmount
                  : '-',
              ['Delivery']:
                value.orderDetail &&
                value.orderDetail.productInformation &&
                value.orderDetail.productInformation.deliveryAmount
                  ? value.orderDetail.productInformation.deliveryAmount
                  : '-',
              ['Descuento']:
                value.orderDetail &&
                value.orderDetail.productInformation &&
                value.orderDetail.productInformation.totalDiscount
                  ? this.currencyPipe.transform(
                      value.orderDetail.productInformation.totalDiscount,
                      '- S/ '
                    )
                  : '-',
              ['Importe Total']:
                value.orderDetail && value.orderDetail.productInformation
                  ? value.orderDetail.productInformation.totalImportTOH &&
                    value.orderDetail.productInformation.totalImportTOH !== 0
                    ? this.currencyPipe.transform(
                        value.orderDetail.productInformation.totalImportTOH,
                        'S/ '
                      )
                    : this.currencyPipe.transform(
                        value.orderDetail.productInformation.totalImport,
                        'S/ '
                      )
                  : '-',
            };
          });
          ExportTableSelection.exportArrayToExcel(data, 'Pedidos');
          this.loadingExport = false;
        } catch (e) {
          this.loadingExport = false;
          this.alertService.alertError(
            'Hubo un error al descargar la información, por favor vuelve a intentarlo.'
          );
        }
      },
      () => {
        this.loadingExport = false;
        this.alertService.alertError(
          'Hubo un error al descargar la información, por favor vuelve a intentarlo.'
        );
      }
    );
  }
  cancelOrderModal(id){
    this.orderCancelDialog.open(id);
  }
  appearanceDownloadButton(): string {
    if (!this.selected || this.loadingExport) {
      return 'primary';
    }
    return 'outline';
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
