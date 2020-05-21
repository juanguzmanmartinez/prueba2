import { Injectable } from '@angular/core';
import { ICapacityRequestParams } from 'src/app/shared/services/models/capacity.model';
import { CapacityClientService } from 'src/app/shared/services/capacity-edition/capacity-edition.service';

@Injectable()
export class CapacityEditImplementService {

  constructor(
    private blockClient: CapacityClientService,
  ) { }

  public getBlockScheduleImplements$(requestparam: ICapacityRequestParams) {
    return this.blockClient.getBlockScheduleClient$(requestparam);
  }

  public patchScheduleDetailImplements$(requestparam: ICapacityRequestParams, hours: string, quantities: string) {
    return this.blockClient.patchScheduleDetail$(requestparam, hours, quantities);
  }

}
