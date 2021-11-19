import { Component, EventEmitter, Output } from '@angular/core';
import { CompanyFilterEvent } from '../../interfaces/order-records.interface';

@Component({
  selector: 'app-company-filter',
  templateUrl: './company-filter.component.html',
  styleUrls: ['./company-filter.component.scss']
})
export class CompanyFilterComponent {

  @Output() filter = new EventEmitter<CompanyFilterEvent>();

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
    }
    this.filter.emit({ companies, notFound: this.getCompaniesName(companies) });
  }

  getCompanyName(option: string): string {
    return this.list.find(company => company.code === option).name;
  }

  private getCompaniesName(companies: string[]): string {
    const companiesWithName = companies.map(value => {
      return this.getCompanyName(value);
    });
    return companiesWithName.toString();
  }

}
