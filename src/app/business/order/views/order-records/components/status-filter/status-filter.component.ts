import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchOptionsI } from '@atoms/select/select.component';
import { OrderFilterStore } from '@stores/order-filter-store.service';
import { map, tap } from 'rxjs/operators';
import { OrderRecordsImplementService } from '../../implements/order-records-implement.service';
import {
  OrderStatus,
  StatusFilterEvent,
} from '../../interfaces/order-records.interface';
import { OrderFormPresenter } from '../../order-form.presenter';

@Component({
  selector: 'app-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.scss'],
})
export class StatusFilterComponent implements OnInit {
  @Output() filter = new EventEmitter<StatusFilterEvent>();

  list: OrderStatus[];
  status: SearchOptionsI[];
  valueSelect: string;
  selectedStatus: string[];
  othersSelects = '';

  constructor(
    private orderRecordImplement: OrderRecordsImplementService,
    private orderFilterStore: OrderFilterStore,
    public presenter: OrderFormPresenter
  ) {}

  ngOnInit(): void {
    const { statusOrder } = this.orderFilterStore.getOrderFilter();
    this.selectedStatus = statusOrder ?? [];

    this.orderRecordImplement.statusList
      .pipe(
        tap((res: OrderStatus[]) => {
          this.list = res;
        }),
        map((res: OrderStatus[]) => {
          const newStatus = res.sort(this.sortStatus);
          console.log(res);
          return newStatus.map((val) => {
            return {
              code: val.id,
              desc: val.name,
              hidden: false,
            };
          });         
        })
      )
      .subscribe((response: SearchOptionsI[]) => {
        this.status = response.filter((item) => item.code !== '70');
        this.selectionChange(statusOrder ?? [], true);
      });
  }

  getStatusName(option: string): string {
    return this.list.find((status) => status.id === option).name;
  }

  private getListStatusName(status: string[]): string {
    const statusWithName = status.map((value) => {
      return this.getStatusName(value);
    });
    return statusWithName.toString();
  }

  filterOptionList(value: string): void {
    this.status = this.list.map((v) => {
      let isHide = true;
      if (
        v.name.toLowerCase().includes(value.toLowerCase()) ||
        v.id.toLowerCase().includes(value.toLowerCase())
      ) {
        isHide = false;
      }
      return {
        code: v.id,
        hidden: isHide,
        desc: v.name,
      };
    });
  }

  selectionChange(status: string[], isOnInit = false): void {
    this.orderFilterStore.setStatusOrder = status;
    this.selectedStatus = status;
    this.othersSelects = '';
    if (status.length === 1) {
      this.valueSelect = this.getStatusName(status[0]);
    } else if (status.length === 2) {
      this.valueSelect = `${this.getStatusName(
        status[0]
      )}, ${this.getStatusName(status[1])}`;
    } else if (status.length > 2) {
      this.valueSelect = `${this.getStatusName(
        status[0]
      )}, ${this.getStatusName(status[1])}...`;
    }

    if (status.length > 2) {
      status.slice(2).forEach((v) => {
        this.othersSelects = `${this.othersSelects} ${this.getStatusName(v)}\n`;
      });
    }

    if (isOnInit) {
      return;
    }
    this.filter.emit({ status, notFound: this.getListStatusName(status) });
  }

  clearValues(): void {
    this.selectionChange([]);
    this.presenter.filterForm.get('orderStatus').reset();
  }

  private sortStatus(x, y) {
    if (x.name < y.name) {
      return -1;
    }
    if (x.name > y.name) {
      return 1;
    }
    return 0;
  }
}
