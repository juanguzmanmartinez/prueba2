import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

interface TypeSearch {
  code: string;
  icon: string;
  name: string;
}

enum CodeTypeSearch {
  pedido = '1',
  telefono = '2',
  documento = '3'
}

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnDestroy {

  search = new FormControl('');

  typesSearch: TypeSearch[] = [
    {code: CodeTypeSearch.pedido, icon: 'call', name: 'Nº de pedido'},
    {code: CodeTypeSearch.telefono, icon: 'local_mall', name: 'Nº de teléfono'},
    {code: CodeTypeSearch.documento, icon: 'assignment_ind', name: 'Doc. Identidad'}
  ];

  valueSelect: TypeSearch = this.typesSearch[0];

  private subscription = new Subscription();

  @Output() filter = new EventEmitter<{ code: string, search: string }>();

  constructor() {
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
      if (value.length < 7) {
        return;
      }
    }

    if (this.valueSelect.code === CodeTypeSearch.telefono) {
      if (value.length < 8) {
        return;
      }
    }

    if (this.valueSelect.code === CodeTypeSearch.documento) {
      if (value.length < 8) {
        return;
      }
    }

    this.filter.emit({
      code: this.valueSelect.code,
      search: value
    });
  }

  private listenSearch(): void {
    const subscription = this.search.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe({
        next: value => this.changeSearch(value)
      });
    this.subscription.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
