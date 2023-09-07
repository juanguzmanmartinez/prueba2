import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CT_ROUTER_PATH } from '@parameters/router/routing/control-tower/control-tower-path.parameter';
import { ISelectOption } from '@interfaces/vita/select.interface';
import { Observable, Subscription } from 'rxjs';
import { CarrierFilterFormService } from './services/carrier-filter-form.service';
import { FormGroup } from '@angular/forms';
import { Carrier } from 'app/business/control-tower/models/carrier.model';
import { CarrierListDBDummy } from 'app/business/control-tower/db-example/carrier-list.db';
import { CarrierService } from './services/carrier.service';
import { SortEvent } from '@interfaces/vita/table.interface';
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
  public loadingTable$: Observable<boolean>;

  constructor(
    private router: Router,
    private carrierFilterForm: CarrierFilterFormService,
    private carrierService: CarrierService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.carrierFilterForm.filterForm;
    this.loadingTable$ = this.carrierService.getLoadingCarrierList();
    this.localList$ = this.carrierService.getLocalList();
    this.carrierStateList$ = this.carrierService.getCarrierStateList();
    this.loadCarrierSettings();
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

  navigateToCarrierRoute(idCarrier: string) {
    this.router.navigate([CT_ROUTER_PATH.ctCarrierRoute(idCarrier)]);
  }

  executeSearch() {
    this.filterList = this.carrierFilterForm.getfilterPillList();
    this.filterCarrierList();
  }

  deleteOptionFilter(filter: ISelectOption) {
    this.carrierFilterForm.deleteOptionFilter(filter);
    this.executeSearch();
  }

  downloadMotorized() {
    this.carrierService.downloadMotorized();
  }

  sortColumn(event: SortEvent) {
    this.carrierService.sortColumn(event);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
