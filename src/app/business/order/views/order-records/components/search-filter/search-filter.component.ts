import { Component, EventEmitter, OnDestroy, OnInit, Output, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderFilterStore } from '@stores/order-filter-store.service';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface TypeSearch {
  code: string;
  icon: string;
  name: string;
  maxLength: string;
  alphanumeric: boolean;
}

enum CodeTypeSearch {
  pedido = '1',
  telefono = '2',
  documento = '3',
}

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit, OnDestroy {

  search = new FormControl('');

  typesSearch: TypeSearch[] = [
    {
      code: CodeTypeSearch.pedido,
      icon: 'local_mall',
      name: 'Nº de pedido',
      maxLength: '11',
      alphanumeric: false
    },
    {
      code: CodeTypeSearch.telefono,
      icon: 'call',
      name: 'Nº de teléfono',
      maxLength: '9',
      alphanumeric: false
    },
    {
      code: CodeTypeSearch.documento,
      icon: 'assignment_ind',
      name: 'Doc. Identidad',
      maxLength: '12',
      alphanumeric: true
    },
  ];

  valueSelect: TypeSearch;

  private subscription = new Subscription();

  @Output() filter = new EventEmitter<{ code: string; search: string }>();

  constructor(private orderFilterStore: OrderFilterStore) {
  }

  ngOnInit(): void {
    const {searchCode, searchValue} = this.orderFilterStore.getOrderFilter();

    const valueSelect = this.typesSearch.find(
      (type) => type.code === searchCode
    );
    this.valueSelect = valueSelect ?? this.typesSearch[0];
    this.search.setValue(searchValue ?? '');

    this.listenSearch();
  }

  selectionChange(event: TypeSearch): void {
    this.valueSelect = event;
    if (this.search.value) {
      this.search.setValue('');
    }
  }

  private changeSearch(value: string): void {
    if (this.valueSelect.code === CodeTypeSearch.pedido) {
      if (value.length < 6 && value.length !== 0) {
        return;
      }
    }

    if (this.valueSelect.code === CodeTypeSearch.telefono) {
      if (value.length < 8 && value.length !== 0) {
        return;
      }
    }

    if (this.valueSelect.code === CodeTypeSearch.documento) {
      if (value.length < 8 && value.length !== 0) {
        return;
      }
    }

    this.filter.emit({
      code: this.valueSelect.code,
      search: value,
    });
  }

  private listenSearch(): void {
    const subscription = this.search.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe({
        next: (value) => this.changeSearch(value),
      });
    this.subscription.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
