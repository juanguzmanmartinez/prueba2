import { Injectable } from '@angular/core';
import { CapacityClientService } from 'src/app/shared/services/capacity-edition/capacity-edition.service';
import { ICapacityRequestParams } from 'src/app/shared/services/models/capacity.model';

@Injectable()
export class CapacityEditImplementService {

  constructor(
    private blockClient: CapacityClientService,
  ) { }

  public getBlockScheduleImplements$(requestparam: ICapacityRequestParams) {
    return this.blockClient.getBlockScheduleClient$(requestparam);
  }

}
