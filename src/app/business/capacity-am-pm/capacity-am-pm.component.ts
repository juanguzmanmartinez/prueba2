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

  defaultStartDate = new Date();
  defaultMaxDate = new Date().setMonth(new Date().getMonth() + 2);

  public currentYear: number = this.defaultStartDate.getFullYear();
  public currentMonth: number = this.defaultStartDate.getMonth();
  public currentDay: number = this.defaultStartDate.getDate();

  // tslint:disable-next-line:ban-types
  public maxDate: Object = new Date(this.currentYear, this.currentMonth + 2, this.currentDay);

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
    this.formService.startDateControl.setValue(this.defaultStartDate);

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
      .subscribe(local => {
        this.initialDrugstoreOption = local;
      });

    this.subscription.push(radioSubs, dropdowSubs);
  }
  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }


  public onValChange(type: string) {
    this.selectedVal = type;
    if (type === 'group') {
      this.selectedStepOne = 'Grupo';
    } else if (type === 'local') {
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
          const startDay = this.setInputValue.startDay;
          const formatterStartDay = new Date(startDay);
          const endDay = this.setInputValue.endDay;
          const formatterEndDay = new Date(endDay);

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
    if (this.modeEdition === 'DEFAULT') {
      const request = {
        fulfillmentCenterCode: this.initialDrugstoreOption.fulfillmentCenterCode,
        serviceTypeCode: this.serviceType,
        channel: 'DIGITAL',
        hours: hours || '',
        quantities: quantitus
      } as ICalendarUpdateRequestParams;
      const endpoint = this.service.patchCalendarUpdateClient$(request)
        .pipe(take(1))
        .subscribe(() => {
          this.mainLoaderService.isLoaded = false;
          this.router.navigate(['/capacity-manager']);
          const alertValues = {
            nameLocal: this.initialDrugstoreOption.text,
            selectedStepOne: this.selectedStepOne,
            typeService: this.serviceType,
            showAlert: true,
          } as IAlert;
          this.capacityStoreService.setSelectedDrugstore(alertValues);
        });
      this.subscription.push(endpoint);

    } else if (this.modeEdition === 'CALENDAR') {
      const request = {
        fulfillmentCenterCode: this.initialDrugstoreOption.fulfillmentCenterCode,
        serviceTypeCode: this.serviceType,
        channel: 'DIGITAL',
        days: '2020-05-20,2020-05-21,2020-05-22',
        hours: hours || '',
        quantities: quantitus
      } as ICalendarUpdateRequestParams;
      const endpoint = this.service.patchCalendarRangeUpdateClient$(request)
        .pipe(take(1))
        .subscribe(() => {
          this.mainLoaderService.isLoaded = false;
          this.router.navigate(['/capacity-manager']);
          const alertValues = {
            nameLocal: this.initialDrugstoreOption.text,
            selectedStepOne: this.selectedStepOne,
            typeService: this.serviceType,
            showAlert: true,
          } as IAlert;
          this.capacityStoreService.setSelectedDrugstore(alertValues);
        });
      this.subscription.push(endpoint);

    }
  }

  showEditStepTwo() {
    this.stepTwo = true;
  }

  return() {
    const alertValues = {
      nameLocal: this.initialDrugstoreOption.text,
      selectedStepOne: this.selectedStepOne,
      typeService: this.serviceType,
      showAlert: false,
    } as IAlert;
    this.capacityStoreService.setSelectedDrugstore(alertValues);
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
