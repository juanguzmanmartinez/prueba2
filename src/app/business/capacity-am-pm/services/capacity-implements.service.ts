import { Injectable } from '@angular/core';
import { ICustomSelectOption } from 'src/app/commons/interfaces/custom-controls.interface';
import { DrugstoreClientService } from 'src/app/shared/services/calendar/drugstores-client.service';
import { LocalClientService } from 'src/app/shared/services/calendar/local-client.service';

@Injectable()
export class CapacityImplementService {

  constructor(
    private localClient: LocalClientService,
  ) { }

  public getLocalImplements$(serviceType: string) {
    return this.localClient.getLocalClient$(serviceType);
  }

  public getTypeOperationImplements$(serviceType: string, selectedLocal: ICustomSelectOption, serviceTypeCode: string) {
    return this.localClient.getTypeOperationClient$(serviceType, selectedLocal, serviceTypeCode);
  }

}
