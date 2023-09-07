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
import { Subscription } from 'rxjs';
import { SortEvent } from '@interfaces/vita/table.interface';

@Component({
  selector: 'app-carrier-table',
  templateUrl: './carrier-table.component.html',
})
export class CarrierTableComponent implements OnInit, OnDestroy {
  @Output() navigate = new EventEmitter<string>();
  @Output() sort = new EventEmitter<SortEvent>();

  public totalCarrier: number;
  public dataSource = new MatTableDataSource<any>();
  public displayedColumns = displayedColumns;
  public sortColumns = sortColumns;
  public carrierList: Carrier[];
  public loader = true;
  public pageSize = 30;
  private subscription = new Subscription();

  constructor(private carrierStore: CarrierStore) {}

  ngOnInit(): void {
    this.loadCarrierList();
  }

  loadCarrierList() {
    this.subscription = this.carrierStore.carrierList$.subscribe(
      (carrierList: Carrier[]) => {
        this.carrierList = carrierList;
        this.dataSource.data = carrierList;
        this.loader = !!this.carrierList;
      }
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
