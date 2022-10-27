import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { IOptionFilterItem } from '@interfaces/capacities/options-filter';
import { UploadCapacitiesStoreService } from 'app/business/operations/views/operations-capacities/stores/upload-capacities-store.service';
import { OperationsCapacityHomeStoreService } from 'app/business/operations/views/operations-capacities/views/operations-capacity-home/store/operations-capacity-home-store.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-filter-districts',
  templateUrl: './filter-districts.component.html',
  styleUrls: ['./filter-districts.component.sass'],
})
export class FilterDistrictsComponent implements OnInit {
  list: any[];
  locals: any[];
  valueSelect: string;
  selectedLocals: string[];
  othersSelects = '';
  filterForm: FormGroup;
  fg: FormGroup;
  @Input() placeholder: string;
  @Input() listOptions: IOptionFilterItem[];
  @Output() filter = new EventEmitter();
  @Input() containerSearchClass = '';
  @Input() inputSearchClass = '';
  @Input() isError: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService
  ) {}

  ngOnInit(): void {
    this.fg = this._formBuilder.group({
      code: [''],
      nombre: [''],
    });

    this._uploadCapacitiesStoreService.getDistrictsFilter$
      .pipe(
        tap((res: any[]) => {
          if (res.length == 0) this.selectedLocals = [];
          this.list = res;
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
    return `${localSelected.name}`;
  }

  private getLocalsName(locals: string[]): string {
    const localsWithName = locals.map((value) => {
      return this.getLocalName(value);
    });
    return localsWithName.toString();
  }

  selectionChange(locals: string[], isCallOnInit = false): void {
    this.selectedLocals = locals;
    this.othersSelects = '';
    if (locals.length === 1) {
      this.valueSelect = this.getLocalName(locals[0]);
    } else if (locals.length === 2) {
      this.valueSelect = `${this.getLocalName(locals[0])}, ${this.getLocalName(
        locals[1]
      )}`;
    } else if (locals.length > 2) {
      this.valueSelect = `${this.getLocalName(locals[0])}, ${this.getLocalName(
        locals[1]
      )}...`;
    }

    if (locals.length > 2) {
      locals.slice(0).forEach((v) => {
        this.othersSelects = `${this.othersSelects} ${this.getLocalName(v)}\n`;
      });
    }
    this.filter.emit(this.selectedLocals);

    if (isCallOnInit) {
      return;
    }
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
        desc: `${v.name} `,
      };
    });
  }

  clearValues(): void {
    this.selectionChange([]);
    this._uploadCapacitiesStoreService.setStoresSelected(true);
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
