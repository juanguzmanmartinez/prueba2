import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-company-filter',
  templateUrl: './company-filter.component.html',
  styleUrls: ['./company-filter.component.scss']
})
export class CompanyFilterComponent {

  @Output() filter = new EventEmitter<string[]>();

  list = [
    { code: 'IKF', name: 'Inkafarma' },
    { code: 'MF', name: 'Mifarma' }
  ];
  companies = ['IKF', 'MF'] ;
  valueSelect: string;

  constructor() { }

  selectionChange(companies: string[]): void {
    if (companies.length === 1) {
      this.valueSelect = this.getCompanyName(companies[0]);
    } else if (companies.length === 2) {
      this.valueSelect = `${this.getCompanyName(companies[0])}, ${this.getCompanyName(companies[1])}`;
    } else if (companies.length > 2) {
      this.valueSelect = `${this.getCompanyName(companies[0])}, ${this.getCompanyName(companies[1])} (+${companies.length - 2} otros`;
    }
    console.log(companies);
    this.filter.emit(companies);
  }

  getCompanyName(option: string): string {
    return this.list.find(company => company.code === option).name;
  }

}
