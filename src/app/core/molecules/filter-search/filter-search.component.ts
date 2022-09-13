import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { IOptionFilterItem } from '@interfaces/capacities/options-filter';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss'],
})
export class FilterSearchComponent implements OnInit {
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

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.fg = this._formBuilder.group({
      code: [''],
      nombre: [''],
    });
    // const { locals } = this.orderFilterStore.getOrderFilter();

    // this.selectedLocals = locals ?? [];

    // this.orderRecordImplement.storeList
    //   .pipe(
    //     tap((res: IDrugstore[]) => {
    //       this.orderFilterStore.setLocalList(res);

    //       this.list = res;
    //     }),
    //     map((res: IDrugstore[]) => {
    //       const newLocals = res.sort(this.sortLocals);

    //       return newLocals.map((val) => {
    //         return {
    //           code: val.localCode,
    //           desc: `${val.name} - ${val.localCode}`,
    //           hidden: false,
    //         };
    //       });
    //     })
    //   )
    //   .subscribe((response: SearchOptionsI[]) => {

    //     this.locals = response;
    //     this.selectionChange(locals ?? [], true);
    //   });
    this.locals = this.listOptions;
    this.list = this.listOptions;
    console.log('this.listOptions', this.listOptions);
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
    // this.orderFilterStore.setLocals = locals;
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
      locals.slice(2).forEach((v) => {
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
    // this.presenter.filterForm.get('localId').reset();
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
