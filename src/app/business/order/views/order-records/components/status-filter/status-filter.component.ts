import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrderRecordsImplementService } from '../../implements/order-records-implement.service';
import { map, tap } from 'rxjs/operators';
import { OrderStatus, StatusFilterEvent } from '../../interfaces/order-records.interface';

@Component({
  selector: 'app-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.scss']
})
export class StatusFilterComponent implements OnInit {

  @Output() filter = new EventEmitter<StatusFilterEvent>();

  list: OrderStatus[];
  status: string[];
  valueSelect: string;

  constructor(
    private orderRecordImplement: OrderRecordsImplementService
  ) { }

  ngOnInit(): void {
    this.orderRecordImplement.statusList
      .pipe(
        tap((res: OrderStatus[]) => {
          this.list = [...new Set(res)];
        }),
        map((res: OrderStatus[]) => {
          const codes = res.map(val => {
            return val.id;
          });
          return [...new Set(codes)];
        })
      )
      .subscribe((response: string[]) => {
        this.status = response;
      });
  }

  getStatusName(option: string): string {
    return this.list.find(status => status.id === option).name;
  }

  private getListStatusName(status: string[]): string {
    const statusWithName = status.map(value => {
      return this.getStatusName(value);
    });
    return statusWithName.toString();
  }

  selectionChange(status: string[]): void {
    if (status.length === 1) {
      this.valueSelect = this.getStatusName(status[0]);
    } else if (status.length === 2) {
      this.valueSelect = `${this.getStatusName(status[0])}, ${this.getStatusName(status[1])}`;
    } else if (status.length > 2) {
      this.valueSelect = `${this.getStatusName(status[0])}, ${this.getStatusName(status[1])} (+${status.length - 2} otros`;
    }
    this.filter.emit({ status, notFound: this.getListStatusName(status) });
  }

}
