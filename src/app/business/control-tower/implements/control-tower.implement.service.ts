import { Injectable } from '@angular/core';
import { ControlTowerClientService } from '@clients/control-tower/control-tower.service';
import { ISelectOption } from '@interfaces/vita/select.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ControlTowerImplementService {
  constructor(private ctClientService: ControlTowerClientService) {}

  getCarrierStateList(): Observable<ISelectOption[]> {
    return this.ctClientService.getCarrierStateList().pipe(
      map((stateList) =>
        stateList.map((state) => {
          return {
            value: state.stateType,
            label: state.description,
          } as ISelectOption;
        })
      )
    );
  }

  getLocalList(): Observable<ISelectOption[]> {
    return this.ctClientService.getLocalList().pipe(
      map((localList) =>
        localList.map((local) => {
          return {
            value: local.localCode,
            label: local.name,
          } as ISelectOption;
        })
      )
    );
  }
}
