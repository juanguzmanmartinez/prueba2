import { Component, EventEmitter, Output } from '@angular/core';

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
export class SearchFilterComponent {

  typesSearch: TypeSearch[] = [
    {code: '1', icon: 'call', name: 'Nº de pedido'},
    {code: '2', icon: 'local_mall', name: 'Nº de teléfono'},
    {code: '3', icon: 'assignment_ind', name: 'Doc. Identidad'}
  ];

  typesCodes = ['1', '2', '3'];

  valueSelect: TypeSearch = this.typesSearch[0];

  @Output() filter = new EventEmitter<{ code: string, search: string }>();

  searchContent = '';

  constructor() {
  }

  selectionChange(event: TypeSearch): void {
    this.valueSelect = event;
    this.searchContent = '';
    this.filter.emit({
      code: this.valueSelect.code,
      search: ''
    });
  }

  changeSearch(event): void {
    this.filter.emit({
      code: this.valueSelect.code,
      search: event
    });
  }

}
