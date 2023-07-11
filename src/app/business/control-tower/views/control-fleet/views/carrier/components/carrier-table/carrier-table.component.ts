import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { displayedColumns } from '../../constants/carrier.constant';
import { Carrier } from 'app/business/control-tower/models/carrier.model';
import { CarrierStore } from '../../store/carrier.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrier-table',
  templateUrl: './carrier-table.component.html',
})
export class CarrierTableComponent implements OnInit, OnDestroy {
  @Output() navigate = new EventEmitter<string>();

  public totalCarrier: number;
  public dataSource = new MatTableDataSource<any>();
  public displayedColumns = displayedColumns;
  public carrierList: Carrier[];
  private subscription = new Subscription();

  constructor(private carrierStore: CarrierStore) {}

  ngOnInit(): void {
    this.loadCarrierList();
  }

  loadCarrierList() {
    this.subscription = this.carrierStore.carrierList$.subscribe(
      (carrierList) => {
        this.carrierList = carrierList;
        this.dataSource.data = carrierList;
      }
    );
  }

  navigateCarrierRoute(idCarrier: string): void {
    this.navigate.emit(idCarrier);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
