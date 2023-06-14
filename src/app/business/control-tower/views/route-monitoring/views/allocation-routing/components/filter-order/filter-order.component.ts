import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filter-order',
  templateUrl: './filter-order.component.html',
})
export class FilterOrderComponent {
  @Input() isErrorTab: boolean = true;

  errorTypeList = [
    {
      value: '1',
      label: 'Volumen',
    },
    {
      value: '2',
      label: 'Off Time',
    },
    {
      value: '3',
      label: 'Ubicación',
    },
    {
      value: '4',
      label: 'Por asignar',
    },
  ];

  locals = [
    {
      value: 'IFK-609',
      label: 'Gerardo Unger 3',
    },
    {
      value: 'IFK-610',
      label: 'Javier prado 4',
    },
  ];

  serviceTypeList = [
    {
      value: 'EXP',
      label: 'Express',
    },
    {
      value: 'PRO',
      label: 'Programado',
    },
    {
      value: 'AM/PM',
      label: 'AM / PM',
    },
  ];

  get secondOptionLabel() {
    return this.isErrorTab ? 'Tipo de error' : 'Tipo de pedido';
  }
}
