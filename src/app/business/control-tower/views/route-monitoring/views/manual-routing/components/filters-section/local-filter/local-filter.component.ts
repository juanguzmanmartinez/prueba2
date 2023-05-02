import { Component } from '@angular/core';
import { ISelectOption } from '@interfaces/vita/select.interface';

interface ILocal {
  idLocal: string;
  name: string;
  value: string;
}

@Component({
  selector: 'app-local-filter',
  templateUrl: './local-filter.component.html',
})
export class LocalFilterComponent {
  locals: ILocal[] = [
    {
      value: '1',
      idLocal: 'IFK-609',
      name: 'Gerardo Unger 3',
    },
    {
      value: '2',
      idLocal: 'IFK-610',
      name: 'Javier prado 4',
    },
  ];
}
