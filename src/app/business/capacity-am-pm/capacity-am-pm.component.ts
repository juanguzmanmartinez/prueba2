import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainLoaderService } from 'src/app/shared/helpers/main-loader.service';
import { tap, take } from 'rxjs/operators';
import { Drugstore, IServices } from 'src/app/shared/services/models/drugstore.model';
import { CapacityAmPmService } from './operations-forms/capacity-am-pm-form.service';
import { Router } from '@angular/router';
import { ICustomSelectOption } from 'src/app/commons/interfaces/custom-controls.interface';
import { IAlert, ILocal } from 'src/app/shared/services/models/local.model';
import { Subscription } from 'rxjs';
import { CapacityImplementService } from 'src/app/shared/services/capacity-edition/capacity-implements.service';
import { ICalendarUpdateRequestParams } from 'src/app/shared/services/models/capacity.model';
import { ITypeService } from 'src/app/shared/services/models/type-service.model';
import { CapacityStoreService } from 'src/app/commons/business-factories/factories-stores/capacity-store.service';

@Component({
  selector: 'app-capacity-am-pm',
  templateUrl: './capacity-am-pm.component.html',
  styleUrls: ['./capacity-am-pm.component.scss']
})
export class CapacityAmPmComponent implements OnInit, OnDestroy {

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
  setInputValue: ITypeService = {} as ITypeService;
  segmentOne: string;
  segmentTwo: string;
  selectedStepOne: string;

  constructor(
    private mainLoaderService: MainLoaderService,
    private service: CapacityImplementService,
    public formService: CapacityAmPmService,
    private router: Router,
    private capacityStoreService: CapacityStoreService
  ) { }

  ngOnInit() {
    this.serviceTypeCode = 'AM_PM';
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
      this.selectedStepOne = 'Grupo';
    } else if (val === 'local') {
      this.selectedStepOne = 'Local';
      this.serviceType = 'AM_PM';
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
      const defaultSubs = this.service.getTypeOperationImplements$(this.modeEdition, this.initialDrugstoreOption, this.serviceTypeCode)
        .pipe(take(1))
        .subscribe(value => {
          this.mainLoaderService.isLoaded = false;
          this.setInputValue = value;
          this.formService.inputAMControl.setValue(this.setInputValue.segments[0].capacity.toString());
          this.formService.inputPMControl.setValue(this.setInputValue.segments[1].capacity.toString());
          this.segmentOne = this.setInputValue.segments[0].hour || '';
          this.segmentTwo = this.setInputValue.segments[1].hour || '';
        });
      this.subscription.push(defaultSubs);

    } else if (this.modeEdition === 'CALENDAR') {
      this.selectedRadioButton = 'Calendario';
      this.mainLoaderService.isLoaded = true;
      const calendarSubs = this.service.getTypeOperationImplements$(this.modeEdition, this.initialDrugstoreOption, this.serviceTypeCode)
        .pipe(take(1))
        .subscribe(value => {
          this.mainLoaderService.isLoaded = false;
          this.setInputValue = value;
          this.formService.inputAMControl.setValue(this.setInputValue.segments[0].capacity.toString());
          this.formService.inputPMControl.setValue(this.setInputValue.segments[1].capacity.toString());
          this.segmentOne = this.setInputValue.segments[0].hour || '';
          this.segmentTwo = this.setInputValue.segments[1].hour || '';
        });
      this.subscription.push(calendarSubs);


    }

    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = true;
  }

  save() {
    this.mainLoaderService.isLoaded = true;
    const quantitus = this.formService.inputAMControl.value + ',' + this.formService.inputPMControl.value;
    const hours = this.setInputValue.segments[0].hour + ',' + this.setInputValue.segments[0].hour;
    // debugger;
    const request = {
      fulfillmentCenterCode: this.initialDrugstoreOption.fulfillmentCenterCode,
      serviceTypeCode: this.serviceType,
      channel: 'DIGITAL',
      hours: hours || '',
      quantities: quantitus
    } as ICalendarUpdateRequestParams;
    const endpoint = this.service.patchCalendarUpdateClient$(request)
      .pipe(take(1))
      .subscribe(response => {
        this.mainLoaderService.isLoaded = false;
        this.router.navigate(['/capacity-manager']);
        const alertValues =  {
          nameLocal: this.initialDrugstoreOption.text,
          selectedStepOne: this.selectedStepOne,
          typeService: this.serviceType,
          showAlert: true,
        } as IAlert;
        this.capacityStoreService.setSelectedDrugstore(alertValues);
      });
    this.subscription.push(endpoint);
  }

  return() {
    this.router.navigate(['/capacity-manager']);
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

  // getTypeService(type: IServices[]) {
  //   if (type.length === 1) {
  //     return type[0].code;
  //   } else if (type.length === 2) {
  //     return type[0].code + ',' + type[1].code;
  //   }
  // }

}
