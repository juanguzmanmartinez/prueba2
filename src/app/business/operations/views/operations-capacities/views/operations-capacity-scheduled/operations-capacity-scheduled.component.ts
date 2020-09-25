import {Component, OnDestroy, OnInit} from '@angular/core';
import {Drugstore} from '../../../../../../shared/services/models/drugstore.model';
import {ICustomSelectOption} from '../../../../../../commons/interfaces/custom-controls.interface';
import {Subscription} from 'rxjs';
import {MainLoaderService} from '../../../../../../shared/helpers/main-loader.service';
import {CapacityImplementService} from '../../../../../../shared/services/capacity-edition/capacity-implements.service';
import {CapacityAmPmService} from '../operations-capacity-am-pm/operations-forms/capacity-am-pm-form.service';
import {Router} from '@angular/router';
import {take} from 'rxjs/internal/operators/take';
import {ILocal} from '../../../../../../shared/services/models/local.model';

@Component({
  selector: 'app-operations-capacity-scheduled',
  templateUrl: './operations-capacity-scheduled.component.html',
  styleUrls: ['./operations-capacity-scheduled.component.scss']
})
export class OperationsCapacityScheduledComponent implements OnInit, OnDestroy {

  InfoDrugstores: Drugstore[] = [] as Drugstore[];
  selectedVal: string;
  modeEdition: string;
  selectedRadioButton: string;
  stepOne: boolean;
  stepTwo: boolean;
  stepThree: boolean;
  serviceType: string;
  newInfoDrugstore: ICustomSelectOption[] = [] as ICustomSelectOption[];
  public initialDrugstoreOption: ICustomSelectOption = {} as ICustomSelectOption;
  serviceTypeCode: string;
  private subscription: Subscription[] = [];

  constructor(
    private mainLoaderService: MainLoaderService,
    private service: CapacityImplementService,
    public formService: CapacityAmPmService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.serviceTypeCode = 'PROG';
    this.stepOne = true;
    this.stepTwo = false;
    this.stepThree = false;
    this.mainLoaderService.isLoaded = false;
    this.selectedVal = 'group';
    this.modeEdition = 'default';


    this.formService.radioControl.setValue('default');
    const radioSubs = this.formService.radioControl.valueChanges
      .subscribe(edition => {
        if (this.modeEdition === 'DEFAULT') {
          this.selectedRadioButton = 'Defecto';
        } else if (this.modeEdition === 'CALENDAR') {
          this.selectedRadioButton = 'Calendario';
        }
        this.modeEdition = edition;
      });

    const dropdowSubs = this.formService.dropdowControl.valueChanges
      .subscribe(val => {
        console.log(val);
        this.initialDrugstoreOption = val;
      });
    this.subscription.push(radioSubs, dropdowSubs);
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  public onValChange(val: string) {
    this.selectedVal = val;
    if (val === 'group') {
      console.log('1');
    } else if (val === 'local') {
      this.serviceType = 'PROG';
      this.mainLoaderService.isLoaded = true;
      this.service.getLocalImplements$(this.serviceType)
        .pipe(take(1))
        .subscribe(value => {
          this.mainLoaderService.isLoaded = false;
          this.newInfoDrugstore = this.getFormattedDrugstoreOptions(value);
        });
    }
  }

  nextOne() {
    this.stepOne = false;
    this.stepTwo = true;
    this.stepThree = false;

  }

  nextTwo() {
    if (this.modeEdition === 'DEFAULT') {
      this.selectedRadioButton = 'Defecto';
      this.mainLoaderService.isLoaded = true;
      this.service.getTypeOperationImplements$(this.modeEdition, this.initialDrugstoreOption, this.serviceTypeCode)
        .pipe(take(1))
        .subscribe(value => {
          this.mainLoaderService.isLoaded = false;
          console.log(value);
        });

    } else if (this.modeEdition === 'CALENDAR') {
      this.selectedRadioButton = 'Calendario';
      this.mainLoaderService.isLoaded = true;
      this.service.getTypeOperationImplements$(this.modeEdition, this.initialDrugstoreOption, this.serviceTypeCode)
        .pipe(take(1))
        .subscribe(value => {
          this.mainLoaderService.isLoaded = false;
          console.log(value);
        });

    }

    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = true;
  }

  return() {
    this.router.navigate(['/operaciones/capacidades']);
  }

  private getFormattedDrugstoreOptions(local: ILocal[]) {
    return local.map(this.getFormattedDrugstore);
  }

  private getFormattedDrugstore(local: ILocal) {
    return {
      text: local.name,
      value: local.localCode,
      code: local.localCode,
      fulfillmentCenterCode: local.localCode,
      // channel: local.channel,
      // segmentType: local.segmentType.name,
      // serviceTypeCode: this.getTypeService(local.services),
    } as ICustomSelectOption;
  }

}
