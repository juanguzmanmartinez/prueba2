import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ICustomSelectOption } from 'src/app/commons/interfaces/custom-controls.interface';
import { CapacityImplementService } from 'src/app/shared/services/capacity-edition/capacity-implements.service';

@Injectable()
export class OperationsCapacityHelperService {
  private subscription: Subscription[] = [];

  constructor(
    private service: CapacityImplementService,
  ) { }

  // callGetTypeOperationLocalDefault(modeEdition: string, initialDrugstoreOption: ICustomSelectOption, serviceTypeCode: string) {
  //   const defaultSubs = this.service.getTypeOperationImplements$(modeEdition, initialDrugstoreOption, serviceTypeCode)
  //     .pipe(take(1))
  //     .subscribe(value => {
  //       this.mainLoaderService.isLoaded = false;
  //       this.setInputValue = value;
  //       this.formService.inputAMControl.setValue(this.setInputValue.segments[0].capacity.toString());
  //       this.formService.inputPMControl.setValue(this.setInputValue.segments[1].capacity.toString());
  //       this.segmentOne = this.setInputValue.segments[0].hour || '';
  //       this.segmentTwo = this.setInputValue.segments[1].hour || '';
  //     });
  //   this.subscription.push(defaultSubs);
  // }

}
