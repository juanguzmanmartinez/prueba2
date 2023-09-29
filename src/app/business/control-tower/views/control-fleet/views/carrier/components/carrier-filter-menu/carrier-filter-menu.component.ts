import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ISelectOption } from '@interfaces/vita/select.interface';
import { CarrierStore } from '../../store/carrier.store';
import { ErrorLoadMessage } from '../../constants/error-message.constant';

@Component({
  selector: 'app-carrier-filter-menu',
  templateUrl: './carrier-filter-menu.component.html',
})
export class CarrierFilterMenuComponent implements OnInit {
  @Input() localList: ISelectOption[];
  @Input() carrierStateList: ISelectOption[];
  @Input() filterForm: FormGroup;
  @Output() search = new EventEmitter();

  public errorLoadLocalList: boolean;
  public errorLoadStateList: boolean;
  public errorMessageLocal: string;
  public errorMessageState: string;

  constructor(private carrierStore: CarrierStore) {}

  ngOnInit(): void {
    this.errorLocalList();
    this.errorStateList();
  }

  errorLocalList() {
    this.carrierStore.errorLoadLocalList$.subscribe((hasLocalError) => {
      this.errorLoadLocalList = hasLocalError;
      this.errorMessageLocal = ErrorLoadMessage.LOCAL_LIST;
    });
  }

  errorStateList() {
    this.carrierStore.errorLoadStateList$.subscribe((hasStateError) => {
      this.errorLoadStateList = hasStateError;
      this.errorMessageState = ErrorLoadMessage.STATE_LIST;
    });
  }

  get hasFilters() {
    const { carrierStates, locals } = this.filterForm.value;
    return carrierStates?.length > 0 || locals?.length > 0;
  }

  searchCarriers() {
    this.search.emit();
  }

  onChangeStates(selectedOptions: ISelectOption[]) {
    this.carrierStore.setStateSelectedList(selectedOptions);
  }
  
  onChangeLocals(selectedOptions: ISelectOption[]) {
    this.carrierStore.setLocalSelectedList(selectedOptions);
  }
}
