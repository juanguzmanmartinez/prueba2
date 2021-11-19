import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrderRecordsImplementService } from '../../implements/order-records-implement.service';
import { map, tap } from 'rxjs/operators';
import { IDrugstore } from '@interfaces/drugstores/drugstores.interface';
import { LocalFilterEvent } from '../../interfaces/order-records.interface';

@Component({
  selector: 'app-local-filter',
  templateUrl: './local-filter.component.html',
  styleUrls: ['./local-filter.component.scss']
})
export class LocalFilterComponent implements OnInit {

  @Output() filter = new EventEmitter<LocalFilterEvent>();

  list: IDrugstore[];
  locals: string[];
  valueSelect: string;

  constructor(
    private orderRecordImplement: OrderRecordsImplementService
  ) { }

  ngOnInit(): void {
    this.orderRecordImplement.storeList
      .pipe(
        tap((res: IDrugstore[]) => {
          this.list = res;
        }),
        map(res => {
          return res.map(val => {
            return val.localCode;
          });
        })
      )
      .subscribe((response: string[]) => {
        this.locals = response;
      });
  }

  getLocalName(option: string): string {
    return this.list.find(local => local.localCode === option).name;
  }

  private getLocalsName(locals: string[]): string {
    const localsWithName = locals.map(value => {
      return this.getLocalName(value);
    });
    return localsWithName.toString();
  }

  selectionChange(locals: string[]): void {
    if (locals.length === 1) {
      this.valueSelect = this.getLocalName(locals[0]);
    } else if (locals.length === 2) {
      this.valueSelect = `${this.getLocalName(locals[0])}, ${this.getLocalName(locals[1])}`;
    } else if (locals.length > 2) {
      this.valueSelect = `${this.getLocalName(locals[0])}, ${this.getLocalName(locals[1])} (+${locals.length - 2} otros`;
    }
    this.filter.emit({ locals, notFound: this.getLocalsName(locals) });
  }

}
