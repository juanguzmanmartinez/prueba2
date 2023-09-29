import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CT_ROUTER_PATH } from '@parameters/router/routing/control-tower/control-tower-path.parameter';
import { ISelectOption } from '@interfaces/vita/select.interface';
import { Observable, Subscription, forkJoin, interval } from 'rxjs';
import { CarrierFilterFormService } from './services/carrier-filter-form.service';
import { FormGroup } from '@angular/forms';
import { Carrier } from 'app/business/control-tower/models/carrier.model';
import { CarrierService } from './services/carrier.service';
import { SortEvent } from '@interfaces/vita/table.interface';
import moment from 'moment';
import { IPillFilter } from '@interfaces/control-tower/control-tower.filter.interface';
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
  public errorCarrierList$: Observable<boolean>;
  public carrierList: Carrier[];
  public filterForm: FormGroup;
  public filterList: IPillFilter[];
  public loadingTable$: Observable<boolean>;
  public hasError: boolean;
  public updatedLastTime: string;

  public timer: number = 60; // Start at 60 seconds (1 minute)
  public displayTime: string;
  private timerSubscription: Subscription;

  constructor(
    private carrierFilterForm: CarrierFilterFormService,
    private carrierService: CarrierService
  ) {}

  @HostListener('document:click', ['$event'])
  clickout(event) {
    this.resetTimer();
  }

  ngOnInit(): void {
    this.filterForm = this.carrierFilterForm.filterForm;
    this.loadingTable$ = this.carrierService.getLoadingCarrierList();
    this.errorCarrierList$ = this.carrierService.getErrorCarrierList();
    this.localList$ = this.carrierService.getLocalList();
    this.carrierStateList$ = this.carrierService.getCarrierStateList();
    this.formatTime(this.timer);
    this.loadLocalList();
    this.loadCarrierStateList();
    this.loadCarrierList();
    this.loadErrorCarrierList();
  }

  loadErrorCarrierList() {
    this.subscription.add(
      this.carrierService.getErrorCarrierList().subscribe((hasError) => {
        this.hasError = hasError;
        if (hasError) {
          this.subscription.unsubscribe();
          this.resetTimer();
          this.stopTimer();
        }
      })
    );
  }

  loadLocalList() {
    this.subscription.add(this.carrierService.loadLocalList().subscribe());
  }

  loadCarrierStateList() {
    this.subscription.add(
      this.carrierService.loadCarrierStateList().subscribe()
    );
  }

  loadCarrierList() {
    this.subscription.add(
      this.carrierService.loadCarrierList().subscribe(() => {
        this.afterLoadExecuteSearch();
      })
    );
  }

  updateCarrierList() {
    this.stopTimer();
    this.loadCarrierList();
  }

  afterLoadExecuteSearch() {
    this.executeSearch();
    this.carrierService.setLoadingCarrierList(false);
    this.updatedLastTime = moment().format('YYYY-MM-DD HH:mm:ss');
    this.resetTimer();
    this.startTimer();
  }

  filterCarrierList() {
    this.carrierService.filterCarrierList();
  }

  navigateToCarrierRoute(idCarrier: string) {
    window.open(CT_ROUTER_PATH.ctCarrierRoute(idCarrier), '_blank');
  }

  executeSearch() {
    this.filterList = this.carrierService.getFilterSelectedList();
    this.filterCarrierList();
  }

  deleteOptionFilter(filter: IPillFilter) {
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
    this.resetTimer();
    this.stopTimer();
  }

  // timer

  startTimer() {
    const timerObservable = interval(1000); // 1 second interval
    this.timerSubscription = timerObservable.subscribe(() => {
      if (this.timer > 0) {
        this.timer--;
        this.formatTime(this.timer);
      } else {
        this.updateCarrierList();
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

  formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.displayTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
