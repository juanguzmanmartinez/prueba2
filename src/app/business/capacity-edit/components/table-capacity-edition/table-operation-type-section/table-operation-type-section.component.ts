import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ITypeOperation } from '../../../models/schedule.model';

@Component({
  selector: 'app-table-operation-type-section',
  templateUrl: './table-operation-type-section.component.html',
  styleUrls: ['./table-operation-type-section.component.scss']
})
export class TableOperationTypeSectionComponent implements OnInit {

  @Input() day: string;
  @Input() drugstore: string;
  @Input() showTypeOperations: number;
  @Output() typeOperation = new EventEmitter();

  sectionOne = false;
  sectionTwo = true;
  sectionDisabledOne = true;
  sectionDisabledTwo = false;
  values: ITypeOperation = {} as ITypeOperation;

  constructor() { }

  ngOnInit() {
    this.day = '8 abr - 2020';
    this.drugstore = 'BoticaID01 - Flora Tristán';
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
