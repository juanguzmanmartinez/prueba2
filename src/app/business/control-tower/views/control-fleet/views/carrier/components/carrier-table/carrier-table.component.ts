import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  displayedColumns,
  sortColumns,
} from '../../constants/carrier.constant';
import { Carrier } from 'app/business/control-tower/models/carrier.model';
import { CarrierStore } from '../../store/carrier.store';
import { Observable, Subscription } from 'rxjs';
import { SortEvent } from '@interfaces/vita/table.interface';
import { IPagination } from '@interfaces/control-tower/control-tower.interface';

@Component({
  selector: 'app-carrier-table',
  templateUrl: './carrier-table.component.html',
})
export class CarrierTableComponent implements OnInit, OnDestroy {
  @Input() displayTime: string;
  @Output() navigate = new EventEmitter<string>();
  @Output() sort = new EventEmitter<SortEvent>();
  @Output() page = new EventEmitter();

  public totalCarrier: number;
  public dataSource = new MatTableDataSource<any>();
  public displayedColumns = displayedColumns;
  public sortColumns = sortColumns;
  public carrierList: Carrier[];
  public loading$: Observable<boolean>;
  public pagination$: Observable<IPagination>;
  public pageSize = 30;
  private subscription = new Subscription();

  constructor(private carrierStore: CarrierStore) {}

  ngOnInit(): void {
    this.loadCarrierList();
    this.loading$ = this.carrierStore.loadingCarrierList$;
    this.pagination$ = this.carrierStore.pagination$;
  }

  loadCarrierList() {
    this.subscription.add(
      this.carrierStore.carrierList$.subscribe((carrierList: Carrier[]) => {
        this.carrierList = carrierList;
        this.dataSource.data = carrierList;
      })
    );
  }

  navigateCarrierRoute(idCarrier: string): void {
    this.navigate.emit(idCarrier);
  }

  sortData(event: SortEvent): void {
    this.sort.emit(event);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
