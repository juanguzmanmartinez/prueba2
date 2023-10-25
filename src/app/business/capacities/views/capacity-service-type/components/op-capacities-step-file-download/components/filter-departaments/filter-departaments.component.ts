import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { IOptionFilterItem } from '@interfaces/capacities/options-filter';
import { OperationsCapacityHomeStoreService } from 'app/business/operations/views/operations-capacities/views/operations-capacity-home/store/operations-capacity-home-store.service';
import { map, tap } from 'rxjs/operators';
import { UploadCapacitiesStoreService } from '../../../../store/upload-capacities-store.service';

@Component({
  selector: 'app-filter-departaments',
  templateUrl: './filter-departaments.component.html',
  styleUrls: ['./filter-departaments.component.sass'],
})
export class FilterDepartamentsComponent implements OnInit {
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
  orderBySelect = [];
  latestOrders = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _uploadCapacitiesStoreService: UploadCapacitiesStoreService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.fg = this._formBuilder.group({
      code: [''],
      nombre: [''],
    });

    this._uploadCapacitiesStoreService.getDepartamentsFilter$
      .pipe(
        tap((res: any[]) => {
          this.list = res;
        }),
        map((res: any[]) => {
          return res;
        })
      )
      .subscribe((response: any[]) => {
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
    this.latestOrders = [];

    let arriba = [];
    let abajo = [];
    this.list.forEach((item) => {
      let stattus;
      this.selectedLocals.forEach((local) => {
        if (local == item.code) {
          stattus = true;
        }
      });
      if (stattus) {
        this.orderBySelect.unshift(item);
        arriba.push(item);
      } else {
        this.orderBySelect.push(item);
        abajo.push(item);
      }
      stattus = null;
    });

    let nuevo = [
      ...arriba.sort((a, b) => {
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
      ...abajo.sort((a, b) => {
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
    if (locals.length > 0) this.list = this.orderBySelect;
    else {
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
}
