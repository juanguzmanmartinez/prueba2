import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAlert, ILocal, Local } from '../../../../../../shared/services/models/local.model';
import { ICustomSelectOption } from '../../../../../../commons/interfaces/custom-controls.interface';
import { Subscription } from 'rxjs';
import { ITypeService } from '../../../../../../shared/services/models/type-service.model';
import { MainLoaderService } from '../../../../../../shared/helpers/main-loader.service';
import { CapacityImplementService } from '../../../../../../shared/services/capacity-edition/capacity-implements.service';
import { CapacityAmPmService } from './operations-forms/capacity-am-pm-form.service';
import { Router } from '@angular/router';
import { CapacityStoreService } from '../../../../../../commons/business-factories/factories-stores/capacity-store.service';
import { take, tap } from 'rxjs/operators';
import { ICalendarUpdateRequestParams } from '../../../../../../shared/services/models/capacity.model';

@Component({
  selector: 'app-operations-capacity-am-pm',
  templateUrl: './operations-capacity-am-pm.component.html',
  styleUrls: ['./operations-capacity-am-pm.component.scss']
})
export class OperationsCapacityAmPmComponent implements OnInit, OnDestroy {

  defaultStartDate = new Date();
  defaultMaxDate = new Date().setMonth(new Date().getMonth() + 2);

  public currentYear: number = this.defaultStartDate.getFullYear();
  public currentMonth: number = this.defaultStartDate.getMonth();
  public currentDay: number = this.defaultStartDate.getDate();

  // tslint:disable-next-line:ban-types
  public maxDate: Object = new Date(this.currentYear, this.currentMonth + 2, this.currentDay);

  InfoLocal: Local[] = [] as Local[];
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
  customRequest: ICalendarUpdateRequestParams;

  constructor(
    private mainLoaderService: MainLoaderService,
    private service: CapacityImplementService,
    public formService: CapacityAmPmService,
    private router: Router,
    private capacityStoreService: CapacityStoreService
  ) {
    this.getFormattedDrugstore = this.getFormattedDrugstore.bind(this);
  }

  ngOnInit() {
    this.serviceTypeCode = 'AM_PM';
    this.stepOne = true;
    this.stepTwo = false;
    this.stepThree = false;
    this.mainLoaderService.isLoaded = false;
    this.selectedVal = 'local';
    this.modeEdition = 'default';
    this.settValueDropdowOnInit();
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
    this.formService.dropdowControl.setValue('');
    this.formService.radioControl.setValue('');
    this.formService.startDateControl.setValue('');
    this.formService.endDateControl.setValue('');
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  settValueDropdowOnInit() {
    this.selectedStepOne = 'Local';
    this.serviceType = 'AM_PM';
    this.mainLoaderService.isLoaded = true;
    this.formService.dropdowControl.setValue('');
    this.service.getLocalImplements$(this.serviceType)
      .pipe(tap(value => {
        this.mainLoaderService.isLoaded = false;
        this.InfoLocal = value;
      }))
      .pipe(take(1))
      .subscribe((stores) => {
        this.newInfoDrugstore = this.getFormattedDrugstoreOptions(stores);
        this.initialDrugstoreOption = JSON.parse(JSON.stringify(this.newInfoDrugstore[0])) as ICustomSelectOption;
        this.formService.dropdowControl.setValue(this.initialDrugstoreOption);
      });
  }

  public onValChange(type: string) {
    this.selectedVal = type;
    if (type === 'group') {
      this.selectedStepOne = 'Grupo';
      this.serviceType = 'AM_PM';
      this.mainLoaderService.isLoaded = true;
      this.formService.dropdowControl.setValue('');
      this.service.getGroupLocalImplements$(this.serviceType)
        .pipe(tap(value => {
          this.mainLoaderService.isLoaded = false;
          this.InfoLocal = value;
        }))
        .pipe(take(1))
        .subscribe((stores) => {
          this.newInfoDrugstore = this.getFormattedDrugstoreOptions(stores);
          if (this.newInfoDrugstore.length !== 0) {
            this.initialDrugstoreOption = JSON.parse(JSON.stringify(this.newInfoDrugstore[0])) as ICustomSelectOption;
            this.formService.dropdowControl.setValue(this.initialDrugstoreOption);
          }

        });
    } else if (type === 'local') {
      this.settValueDropdowOnInit();
    }
  }

  nextOne() {
    if (this.formService.dropdowControl.valid === true) {
      this.stepOne = false;
      this.stepTwo = true;
      this.stepThree = false;
    }
  }

  nextTwo() {
    if (this.formService.radioControl.valid === true) {
      if (this.modeEdition === 'DEFAULT') {
        this.selectedRadioButton = 'Defecto';
        this.mainLoaderService.isLoaded = true;
        console.log('dadas');

        if (this.selectedStepOne === 'Local') {
          this.callGetTypeOperationLocalDefault();
        } else if (this.selectedStepOne === 'Grupo') {
          this.callGetTypeOperationGroupDefault();
        }
      } else if (this.modeEdition === 'CALENDAR') {
        console.log(this.selectedStepOne);
        this.selectedRadioButton = 'Calendario';
        this.mainLoaderService.isLoaded = true;

        if (this.selectedStepOne === 'Local') {
          this.callGetTypeOperationLocalCalendar();
        } else if (this.selectedStepOne === 'Grupo') {
          this.callGetTypeOperationGroupCalendar();
        }

      }

      this.stepOne = false;
      this.stepTwo = false;
      this.stepThree = true;
    }
  }

  private callGetTypeOperationLocalDefault() {
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
  }

  private callGetTypeOperationLocalCalendar() {
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

  private callGetTypeOperationGroupDefault() {
    const defaultSubs = this.service.getTypeOperationGroupImplements$(this.modeEdition, this.initialDrugstoreOption, this.serviceTypeCode)
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
  }

  private callGetTypeOperationGroupCalendar() {
    const calendarSubs = this.service.getTypeOperationGroupImplements$(this.modeEdition, this.initialDrugstoreOption, this.serviceTypeCode)
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

  save() {
    const quantitus = this.formService.inputAMControl.value + ',' + this.formService.inputPMControl.value;
    const hours = this.setInputValue.segments[0].hour + ',' + this.setInputValue.segments[1].hour;

    if (this.modeEdition === 'DEFAULT') {
      this.mainLoaderService.isLoaded = true;

      if (this.selectedStepOne === 'Local') {
        this.customRequest = this.requestWithLocalDefault(quantitus, hours);
      } else if (this.selectedStepOne === 'Grupo') {
        this.customRequest = this.requestWithGroupDefault(quantitus, hours);
      }
      const endpoint = this.service.patchCalendarUpdateClient$(this.customRequest)
        .pipe(take(1))
        .subscribe(() => {
          this.mainLoaderService.isLoaded = false;
          this.router.navigate(['/operaciones/capacidades']);
          const alertValues = {
            nameLocal: this.initialDrugstoreOption.text,
            selectedStepOne: this.selectedStepOne,
            typeService: this.serviceType,
            showAlert: true,
          } as IAlert;
          this.capacityStoreService.setSelectedDrugstore(alertValues);
        });
      this.subscription.push(endpoint);

    } else if (this.modeEdition === 'CALENDAR' && this.formService.startDateControl.valid && this.formService.endDateControl.valid) {
      this.mainLoaderService.isLoaded = true;
      if (this.selectedStepOne === 'Local') {
        this.customRequest = this.requestWithLocalCalendar(quantitus, hours);
      } else if (this.selectedStepOne === 'Grupo') {
        this.customRequest = this.requestWithGroupCalendar(quantitus, hours);
      }
      const endpoint = this.service.patchCalendarRangeUpdateClient$(this.customRequest)
        .pipe(take(1))
        .subscribe(() => {
          this.mainLoaderService.isLoaded = false;
          this.router.navigate(['/operaciones/capacidades']);
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

  private requestWithLocalCalendar(quantitus: string, hours: string) {
    return {
      fulfillmentCenterCode: this.initialDrugstoreOption.fulfillmentCenterCode,
      serviceTypeCode: this.serviceType,
      channel: 'DIGITAL',
      days: this.formService.startDateControl.valid ? this.getDaysRange() : '',
      hours: hours || '',
      quantities: quantitus,
    } as ICalendarUpdateRequestParams;
  }


  private requestWithLocalDefault(quantitus: string, hours: string) {
    return {
      fulfillmentCenterCode: this.initialDrugstoreOption.fulfillmentCenterCode,
      serviceTypeCode: this.serviceType,
      channel: 'DIGITAL',
      hours: hours || '',
      quantities: quantitus,
    } as ICalendarUpdateRequestParams;
  }

  private requestWithGroupCalendar(quantitus: string, hours: string) {
    return {
      fulfillmentCenterCode: this.initialDrugstoreOption.fulfillmentCenterCode,
      serviceTypeCode: this.serviceType,
      channel: 'DIGITAL',
      days: this.formService.startDateControl.valid ? this.getDaysRange() : '',
      hours: hours || '',
      quantities: quantitus,
      filter: 'GROUP'
    } as ICalendarUpdateRequestParams;
  }


  private requestWithGroupDefault(quantitus: string, hours: string) {
    return {
      fulfillmentCenterCode: this.initialDrugstoreOption.fulfillmentCenterCode,
      serviceTypeCode: this.serviceType,
      channel: 'DIGITAL',
      hours: hours || '',
      quantities: quantitus,
      filter: 'GROUP'
    } as ICalendarUpdateRequestParams;
  }


  getDaysRange() {
    const dateFrom = new Date(this.formService.startDateControl.value);
    const dateTo = new Date(this.formService.endDateControl.value);
    const MS_PER_DAY: number = 1000 * 60 * 60 * 24;
    const start: number = dateFrom.getTime();
    const end: number = dateTo.getTime();
    const daysBetweenDates: number = Math.ceil((end - start) / MS_PER_DAY);
    const dates: Date[] = Array.from(new Array(daysBetweenDates + 1),
      (v, i) => new Date(start + (i * MS_PER_DAY)));
    const formatDays = dates.map(date => `${date.getFullYear()}-${this.getMonthFormmater(date.getMonth())}-${date.getDate()}`);
    console.log(formatDays);

    return formatDays.join(',');
  }

  getMonthFormmater(date) {
    const month = date;
    return month < 10 ? '0' + month : '' + month;
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
    this.router.navigate(['/operaciones/capacidades']);
  }

  private getFormattedDrugstoreOptions(local: ILocal[]) {
    return local.map(this.getFormattedDrugstore);
  }

  private getFormattedDrugstore(local: ILocal) {
    return {
      text: local.description,
      value: local.localCode,
      code: local.localCode,
      fulfillmentCenterCode: local.localCode,
    } as ICustomSelectOption;
  }
}
