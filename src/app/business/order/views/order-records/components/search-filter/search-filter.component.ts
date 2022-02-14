import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

interface TypeSearch {
  code: string;
  icon: string;
  name: string;
}

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnDestroy {

  search = new FormControl('');

  typesSearch: TypeSearch[] = [
    {code: '1', icon: 'call', name: 'Nº de pedido'},
    {code: '2', icon: 'local_mall', name: 'Nº de teléfono'},
    {code: '3', icon: 'assignment_ind', name: 'Doc. Identidad'}
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
