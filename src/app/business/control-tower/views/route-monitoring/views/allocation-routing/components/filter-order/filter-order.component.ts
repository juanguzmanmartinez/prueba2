import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-order',
  templateUrl: './filter-order.component.html',
})
export class FilterOrderComponent {
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
}
