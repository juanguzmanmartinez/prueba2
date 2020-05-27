import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ITypeOperation } from '../../../models/schedule.model';
import { CompanyDrugstoresStoreService } from 'src/app/commons/business-factories/factories-stores/company-drugstores-store.service';
import { MONTHS } from 'src/app/commons/parameters/date.parameters';

@Component({
  selector: 'app-table-operation-type-section',
  templateUrl: './table-operation-type-section.component.html',
  styleUrls: ['./table-operation-type-section.component.scss']
})
export class TableOperationTypeSectionComponent implements OnInit {

  public day = '';
  public drugstore = '';
  @Input() showTypeOperations: number;
  @Output() typeOperation = new EventEmitter();

  sectionOne = false;
  sectionTwo = true;
  sectionDisabledOne = true;
  sectionDisabledTwo = false;
  values: ITypeOperation = {} as ITypeOperation;

  constructor(
    public companyDrugstoresStore: CompanyDrugstoresStoreService,
  ) { }

  ngOnInit() {
    this.companyDrugstoresStore.selectedDrugstore$
      .subscribe(selectedDrugstore => {
        this.drugstore = `${selectedDrugstore.localCode} - ${selectedDrugstore.name}`;
      });
    this.companyDrugstoresStore.configForCapacities$
      .subscribe(config => {
        if (config.selectedDay && config.selectedDay.length) {
          const elements = config.selectedDay.split('-');
          const [ year, month, day ] = elements;
          this.day = `${Number(day)} ${MONTHS[Number(month) - 1]} - ${year}`;
        }
      });
  }

  getRad() {
    this.sectionOne = false;
    this.sectionTwo = true;
    this.sectionDisabledOne = true;
    this.sectionDisabledTwo = false;
    this.values = {
      code: 'RAD',
      numberArray: 0
    } as ITypeOperation;
    this.typeOperation.emit(this.values);
  }
  getRet() {
    this.sectionOne = true;
    this.sectionTwo = false;
    this.sectionDisabledOne = false;
    this.sectionDisabledTwo = true;

    this.values = {
      code: 'RET',
      numberArray: 1
    } as ITypeOperation;
    this.typeOperation.emit(this.values);
  }
}
