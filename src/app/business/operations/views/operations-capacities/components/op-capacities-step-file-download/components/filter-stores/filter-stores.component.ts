import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { IOptionFilterItem } from '@interfaces/capacities/options-filter';
import { UploadCapacitiesStoreService } from 'app/business/operations/views/operations-capacities/stores/upload-capacities-store.service';
import { OperationsCapacityHomeStoreService } from 'app/business/operations/views/operations-capacities/views/operations-capacity-home/store/operations-capacity-home-store.service';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-filter-stores',
  templateUrl: './filter-stores.component.html',
  styleUrls: ['./filter-stores.component.sass'],
})
export class FilterStoresComponent implements OnInit {
  list: any[];
  locals: any[];
  valueSelect: string = 'asdasd';
  selectedLocals: string[];
  othersSelects = '';
  filterForm: FormGroup;
  fg: FormGroup;
  @ViewChild('inputStores') inputStores;

  @Input() placeholder: string;
  @Input() listOptions: IOptionFilterItem[];
  @Output() filter = new EventEmitter();
  @Input() containerSearchClass = '';
  @Input() inputSearchClass = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService
  ) {}

  ngOnInit(): void {
    this.fg = this._formBuilder.group({
      code: [''],
      nombre: [''],
    });

    this.list = [];
    this._uploadCapacitiesStoreService.getStoresFilter$
      .pipe(
        tap((res: any[]) => {
          if (res.length == 0) this.selectedLocals = [];
          this.list = res;
          if (
            this.selectedLocals != undefined &&
            this.selectedLocals.length > 0
          )
            this.selectionChange(this.selectedLocals, true);
        }),
        map((res: any[]) => {
          return res;
        })
      )
      .subscribe((response: any[]) => {
        this.locals = response;
      });
  }

  getLocalName(option: string): string {
    const localSelected = this.locals.find((local) => local.code === option);
    return `${localSelected.code}- ${localSelected.name}`;
  }

  private getLocalsName(locals: string[]): string {
    const localsWithName = locals.map((value) => {
      return this.getLocalName(value);
    });
    return localsWithName.toString();
  }

  selectionChange(locals: string[], isCallOnInit?: boolean): void {
    let filterLocals = [];
    if (isCallOnInit) {
      locals.map((local: any) => {
        this.list.forEach((item: any) => {
          if (local == item.code) filterLocals.push(local);
        });
      });
    }
    if (filterLocals.length > 0) this.selectedLocals = filterLocals;
    else this.selectedLocals = locals;
    this.othersSelects = '';
    if (this.selectedLocals.length === 1) {
      this.valueSelect = this.getLocalName(this.selectedLocals[0]);
    } else if (this.selectedLocals.length === 2) {
      this.valueSelect = `${this.getLocalName(
        this.selectedLocals[0]
      )}, ${this.getLocalName(this.selectedLocals[1])}`;
    } else if (this.selectedLocals.length === 3) {
      this.valueSelect = `${this.getLocalName(
        this.selectedLocals[0]
      )}, ${this.getLocalName(this.selectedLocals[1])},${this.getLocalName(
        this.selectedLocals[2]
      )}`;
    } else if (this.selectedLocals.length > 3) {
      this.valueSelect = `${this.getLocalName(
        this.selectedLocals[0]
      )}, ${this.getLocalName(this.selectedLocals[1])},${this.getLocalName(
        this.selectedLocals[2]
      )}...`;
    }

    if (this.selectedLocals.length > 3) {
      this.selectedLocals.slice(2).forEach((v) => {
        this.othersSelects = `${this.othersSelects} ${this.getLocalName(v)}\n`;
      });
    }
    this.filter.emit(this.selectedLocals);
  }

  filterOptionList(value: string): void {
    this.locals = this.list.map((v) => {
      let isHide = true;
      if (
        v.name.toLowerCase().includes(value.toLowerCase()) ||
        v.code.toLowerCase().includes(value.toLowerCase())
      ) {
        isHide = false;
      }
      return {
        name: v.name,
        code: v.code,
        hidden: isHide,
        desc: `${v.code} - ${v.name}`,
      };
    });
  }

  clearValues(): void {
    this.selectedLocals = [];
    this.selectionChange([]);
    this.inputStores.value = [];
    this.inputStores.disableOptionsMultiple = false;
  }

  private sortLocals(x, y) {
    if (x.name < y.name) {
      return -1;
    }

    if (x.name > y.name) {
      return 1;
    }
    return 0;
  }
}
