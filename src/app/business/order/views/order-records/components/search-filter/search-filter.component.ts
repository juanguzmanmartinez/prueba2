import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderFilterStore } from '@stores/order-filter-store.service';
import { Subscription } from 'rxjs';
import {
  CTypesSearch,
  ECodeTypeSearch,
} from '../../constants/order-filters.constant';
import { ITypeSearch } from '../../interfaces/order-filter.interface';
import { OrderFormPresenter } from '../../order-form.presenter';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit, OnDestroy {
  typesSearch: ITypeSearch[];
  valueSelect: ITypeSearch;

  private subscription = new Subscription();

  constructor(
    private orderFilterStore: OrderFilterStore,
    public presenter: OrderFormPresenter
  ) {
    this.typesSearch = CTypesSearch;
  }

  ngOnInit(): void {
    const { searchCode, searchValue } = this.orderFilterStore.getOrderFilter();

    const valueSelect = this.typesSearch.find(
      (type) => type.code === searchCode
    );
    this.valueSelect = valueSelect ?? this.typesSearch[0];
    this.presenter.filterForm.get('searchCode').setValue(this.valueSelect);
  }

  selectionChange(event: ITypeSearch): void {
    this.valueSelect = event;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
