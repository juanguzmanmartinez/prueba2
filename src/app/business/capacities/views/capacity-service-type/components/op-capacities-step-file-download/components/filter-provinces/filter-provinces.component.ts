import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { IOptionFilterItem } from '@interfaces/capacities/options-filter';
import { OperationsCapacityHomeStoreService } from 'app/business/operations/views/operations-capacities/views/operations-capacity-home/store/operations-capacity-home-store.service';
import { map, tap } from 'rxjs/operators';
import { UploadCapacitiesStoreService } from '../../../../store/upload-capacities-store.service';

@Component({
  selector: 'app-filter-provinces',
  templateUrl: './filter-provinces.component.html',
  styleUrls: ['./filter-provinces.component.sass'],
})
export class FilterProvincesComponent implements OnInit {
  list: any[];
  locals: any[];
  valueSelect: string;
  selectedLocals: string[];
  othersSelects = '';
  filterForm: FormGroup;
  fg: FormGroup;
  arriba: any = [];
  abajo: any = [];
  @Input() placeholder: string;
  @Input() listOptions: IOptionFilterItem[];
  @Output() filter = new EventEmitter();
  @Input() containerSearchClass = '';
  @Input() inputSearchClass = '';
  @Input() isError: boolean = false;
  orderBySelect = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService
  ) {}

  ngOnInit(): void {
    this.fg = this._formBuilder.group({
      code: [''],
      nombre: [''],
    });

    this._uploadCapacitiesStoreService.getProvincesFilter$
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
        if (response.length > 0) {
          if (this.arriba.length > 0) {
            let noSelectedLocals = response;

            this.arriba.forEach((item) => {
              noSelectedLocals = noSelectedLocals.filter((res) => {
                return res.code != item.code && item.name != res.name;
              });
            });

            this.locals = [
              ...this.arriba.sort((a, b) => {
                let fa = a.name.toLowerCase(),
                  fb = b.name.toLowerCase();

                if (fa < fb) {
                  return -1;
                }
                if (fa > fb) {
                  return 1;
                }
                return 0;
              }),
              ...noSelectedLocals.sort((a, b) => {
                let fa = a.name.toLowerCase(),
                  fb = b.name.toLowerCase();

                if (fa < fb) {
                  return -1;
                }
                if (fa > fb) {
                  return 1;
                }
                return 0;
              }),
            ];
          } else {
            this.locals = response.sort((a, b) => {
              let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();

              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            });
          }
        } else {
          this.locals = [];
        }
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

    this.orderBySelect = [];
    this.arriba = [];
    this.abajo = [];
    this.list.forEach((item) => {
      let stattus;
      this.selectedLocals.forEach((local) => {
        if (local == item.code) {
          stattus = true;
        }
      });
      if (stattus) {
        this.orderBySelect.unshift(item);
        this.arriba.push(item);
      } else {
        this.orderBySelect.push(item);
        this.abajo.push(item);
      }
      stattus = null;
    });
    let nuevo = [
      ...this.arriba.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      }),
      ...this.abajo.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      }),
    ];
    this.orderBySelect = nuevo;
    if (locals.length > 0) {
      this.list = this.orderBySelect;
    } else {
      this.locals = this.list.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    }

    if (locals.length === 1) {
      this.valueSelect = this.getLocalName(locals[0]);
    } else if (locals.length === 2) {
      this.valueSelect = `${this.getLocalName(locals[0])}, ${this.getLocalName(
        locals[1]
      )}`;
    } else if (locals.length === 3) {
      this.valueSelect = `${this.getLocalName(locals[0])}, ${this.getLocalName(
        locals[1]
      )}, ${this.getLocalName(locals[2])}`;
    } else if (locals.length > 3) {
      this.valueSelect = `${this.getLocalName(locals[0])}, ${this.getLocalName(
        locals[1]
      )}, ${this.getLocalName(locals[2])}...`;
    }

    if (locals.length > 0) {
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
  isKVEqual(obj1, obj2) {
    // Get the keys of these objects, make sure they have the same number of keys.
    const o1keys = Object.keys(obj1);
    const o2keys = Object.keys(obj2);
    if (o1keys.length !== o2keys.length) return false;

    // Check that the value of each key is the same in each object.
    for (const key of o1keys) {
      if (obj2[key] !== obj1[key]) return false;
    }

    return true;
  }
  objectsEqual(o1, o2) {
    const entries1 = Object.entries(o1);
    const entries2 = Object.entries(o2);
    if (entries1.length !== entries2.length) {
      return false;
    }
    for (let i = 0; i < entries1.length; ++i) {
      // Keys
      if (entries1[i][0] !== entries2[i][0]) {
        return false;
      }
      // Values
      if (entries1[i][1] !== entries2[i][1]) {
        return false;
      }
    }

    return true;
  }
}
