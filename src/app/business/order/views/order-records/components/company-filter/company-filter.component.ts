import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrderFilterStore } from '@stores/order-filter-store.service';
import { CompanyFilterEvent } from '../../interfaces/order-records.interface';
import { OrderFormPresenter } from '../../order-form.presenter';

@Component({
  selector: 'app-company-filter',
  templateUrl: './company-filter.component.html',
  styleUrls: ['./company-filter.component.scss'],
})
export class CompanyFilterComponent implements OnInit {
  list = [
    { code: 'IKF', name: 'Inkafarma' },
    { code: 'MF', name: 'Mifarma' },
  ];
  companies = this.list.map((value) => value.code);
  selectedCompanies: string[];

  @Output() filter = new EventEmitter<CompanyFilterEvent>();

  constructor(
    private orderFilterStore: OrderFilterStore,
    public presenter: OrderFormPresenter
  ) {}

  ngOnInit(): void {
    const { companies } = this.orderFilterStore.getOrderFilter();
    this.selectedCompanies = companies ?? [];
  }

  selectionChange(companies: string[]): void {
    this.orderFilterStore.setCompanies = companies;
    this.selectedCompanies = companies;
    this.filter.emit({ companies, notFound: this.getCompaniesName(companies) });
  }

  clearValues(): void {
    this.selectionChange([]);
    this.presenter.filterForm.get('companyCode').reset();
  }

  getCompanyName(option: string): string {
    return this.list.find((company) => company.code === option).name;
  }

  private getCompaniesName(companies: string[]): string {
    const companiesWithName = companies.map((value) => {
      return this.getCompanyName(value);
    });
    return companiesWithName.toString();
  }
}
