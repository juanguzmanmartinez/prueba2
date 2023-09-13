import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CT_ROUTER_PATH } from '@parameters/router/routing/control-tower/control-tower-path.parameter';
import { ISelectOption } from '@interfaces/vita/select.interface';
import { Observable, Subscription, forkJoin, interval } from 'rxjs';
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
  public subscription = new Subscription();
  public localList$: Observable<ISelectOption[]>;
  public carrierStateList$: Observable<ISelectOption[]>;
  public carrierList$: Observable<Carrier[]>;
  public carrierList: Carrier[];
  public filterForm: FormGroup;
  public filterList: ISelectOption[];
  public loadingTable$: Observable<boolean>;

  public timer: number = 60; // Start at 60 seconds (1 minute)
  public displayTime: string;
  private timerSubscription: Subscription;

  constructor(
    private router: Router,
    private carrierFilterForm: CarrierFilterFormService,
    private carrierService: CarrierService
  ) {}

  @HostListener('document:click', ['$event'])
  clickout(event) {
    this.resetTimer();
    console.log('clear timer', event);
  }

  ngOnInit(): void {
    this.filterForm = this.carrierFilterForm.filterForm;
    this.loadingTable$ = this.carrierService.getLoadingCarrierList();
    this.localList$ = this.carrierService.getLocalList();
    this.carrierStateList$ = this.carrierService.getCarrierStateList();
    this.formatTime(this.timer);
    this.loadCarrierSettings();
  }

  loadCarrierSettings() {
    this.subscription.add(
      forkJoin([
        this.carrierService.loadCarrierList(),
        this.carrierService.loadLocalList(),
        this.carrierService.loadCarrierStateList(),
      ]).subscribe(() => {
        if (this.carrierService.hasFilterStorage()) this.executeSearch();
        this.carrierService.setLoadingCarrierList(false);
        this.startTimer();
      })
    );
  }

  filterCarrierList() {
    const carrierFilters = this.carrierFilterForm.filterForm.value;
    this.carrierService.filterCarrierList(carrierFilters);
  }

  navigateToCarrierRoute(idCarrier: string) {
    // this.router.navigate([CT_ROUTER_PATH.ctCarrierRoute(idCarrier)]);
    window.open(CT_ROUTER_PATH.ctCarrierRoute(idCarrier), '_blank');
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

  // timer

  startTimer() {
    const timerObservable = interval(1000); // 1 second interval
    this.timerSubscription = timerObservable.subscribe(() => {
      if (this.timer > 0) {
        this.timer--;
        this.formatTime(this.timer);
      } else {
        this.executeSomething();
        this.stopTimer();
        this.carrierService.loadCarrierList().subscribe(() => {
          this.carrierService.setLoadingCarrierList(false);
          this.resetTimer();
          this.startTimer();
        });
      }
    });
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  resetTimer() {
    this.timer = 60; // Reset to 60 seconds (1 minute)
    this.formatTime(this.timer);
  }

  executeSomething() {
    console.log('Time is up! Executing something...');
  }

  formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    console.log(minutes, seconds);
    this.displayTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
