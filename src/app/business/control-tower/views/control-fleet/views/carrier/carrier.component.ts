import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
})
export class CarrierComponent implements OnInit{
  displayedColumns: string[] = [
    'local',
    'carrier',
    'provider',
    'vehicleType',
    'startHour',
    'status',
    'paused',
    'actions',
  ];
  dataFake :any[] = [
    {
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },{
      local: 'IKF-061-DOS DE MAYO',
      carrier: 'Renato Fernandez',
      provider: 'CAJE FOREST',
      vehicleType: 'Moto',
      startHour: '1:02 p.m.',
      status: 'Disponible',
      paused: 'No',
    },
  ];

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel(true, []);
  private fixedSelectedRows: any[] = [];
  page: number=1
  pageSize: number=10
  totalOrder=50
  selectedCompanies=[]
  companies=["adas","asdasd"]
  ngOnInit(): void {
    this.dataSource.data =this.dataFake
    this.dataSource.paginator =this.paginator
  }
  get selected(): number {
    return this.selection.selected.length;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

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
  selectionChange(e:any){}
  clearValues(){}
}
