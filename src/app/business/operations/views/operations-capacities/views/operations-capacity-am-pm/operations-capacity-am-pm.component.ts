import {Component, OnDestroy, OnInit} from '@angular/core';
import {IAlert, ILocal, Local} from '../../../../../../shared/services/models/local.model';
import {ICustomSelectOption} from '../../../../../../commons/interfaces/custom-controls.interface';
import {Subscription} from 'rxjs';
import {ITypeService} from '../../../../../../shared/services/models/type-service.model';
import {CapacityImplementService} from '../../../../../../shared/services/capacity-edition/capacity-implements.service';
import {CapacityAmPmService} from './operations-forms/capacity-am-pm-form.service';
import {Router} from '@angular/router';
import {CapacityStoreService} from '../../../../../../commons/business-factories/factories-stores/capacity-store.service';
import {take, tap} from 'rxjs/operators';
import {ICalendarUpdateRequestParams} from '../../../../../../shared/services/models/capacity.model';

@Component({
  selector: 'app-operations-capacity-am-pm',
  templateUrl: './operations-capacity-am-pm.component.html',
  styleUrls: ['./operations-capacity-am-pm.component.scss']
})
export class OperationsCapacityAmPmComponent implements OnInit, OnDestroy {

  public groupOrLocalExpanded = true;
  public groupOrLocalTabList: Array<'Grupo' | 'Local'> = ['Grupo', 'Local'];
  public groupOrLocalList: ICustomSelectOption[] = [] as ICustomSelectOption[];
  public groupOrLocalSelection: ICustomSelectOption;

  daterange = null;


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
  selectedRadioButton = 'CALENDAR';
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
    private service: CapacityImplementService,
    public formService: CapacityAmPmService,
    private router: Router,
    private capacityStoreService: CapacityStoreService
  ) {
    this.getFormattedDrugstore = this.getFormattedDrugstore.bind(this);
  }

  ngOnInit() {
    this.getGroupOrLocalList(this.groupOrLocalTabList[0]);

    this.serviceTypeCode = 'AM_PM';
    this.stepOne = true;
    this.stepTwo = false;
    this.stepThree = false;
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
      .subscribe(local => {
        this.initialDrugstoreOption = local;
      });

    this.subscription.push(radioSubs, dropdowSubs);
  }

  ngOnDestroy() {
    this.formService.dropdowControl.setValue('');
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  saveGroupOrLocal() {
    this.groupOrLocalExpanded = false;
  }

  changeGroupOrLocal(event) {
    this.getGroupOrLocalList(event.target.value);
  }

  getGroupOrLocalList(groupOrLocalTabSelected: 'Grupo' | 'Local') {
    switch (groupOrLocalTabSelected) {
      case 'Grupo':
        console.log('Group tab');
        break;
      case 'Local':
        this.getLocalList();
        break;
    }
  }

  getLocalList() {
    this.service.getLocalImplements$('AM_PM')
      .pipe(take(1))
      .subscribe((stores) => {
        console.log(stores);
        this.newInfoDrugstore = this.getFormattedDrugstoreOptions(stores);
        this.groupOrLocalList = this.getFormattedDrugstoreOptions(stores);
        this.initialDrugstoreOption = JSON.parse(JSON.stringify(this.newInfoDrugstore[0])) as ICustomSelectOption;
        this.formService.dropdowControl.setValue(this.initialDrugstoreOption);
      });
  }

  groupOrLocalSelected(value: ICustomSelectOption) {
    console.log(value);
    this.groupOrLocalSelection = value;
  }

  public onValChange(type: string) {
    this.selectedVal = type;
    if (type === 'group') {
      this.selectedStepOne = 'Grupo';
    } else if (type === 'local') {
      this.selectedStepOne = 'Local';
      this.serviceType = 'AM_PM';
      this.formService.dropdowControl.setValue('');
      this.service.getLocalImplements$(this.serviceType)
        .pipe(tap(value => {
          this.InfoLocal = value;
        }))
        .pipe(take(1))
        .subscribe((stores) => {
          this.newInfoDrugstore = this.getFormattedDrugstoreOptions(stores);
          this.groupOrLocalList = this.getFormattedDrugstoreOptions(stores);
          this.initialDrugstoreOption = JSON.parse(JSON.stringify(this.newInfoDrugstore[0])) as ICustomSelectOption;
          this.formService.dropdowControl.setValue(this.initialDrugstoreOption);
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
      const defaultSubs = this.service.getTypeOperationImplements$(this.modeEdition, this.initialDrugstoreOption, this.serviceTypeCode)
        .pipe(take(1))
        .subscribe(value => {
          this.setInputValue = value;
          this.formService.inputAMControl.setValue(this.setInputValue.segments[0].capacity.toString());
          this.formService.inputPMControl.setValue(this.setInputValue.segments[1].capacity.toString());
          this.segmentOne = this.setInputValue.segments[0].hour || '';
          this.segmentTwo = this.setInputValue.segments[1].hour || '';
        });
      this.subscription.push(defaultSubs);

    } else if (this.modeEdition === 'CALENDAR') {
      this.selectedRadioButton = 'Calendario';
      const calendarSubs = this.service.getTypeOperationImplements$(this.modeEdition, this.initialDrugstoreOption, this.serviceTypeCode)
        .pipe(take(1))
        .subscribe(value => {
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
    const quantitus = this.formService.inputAMControl.value + ',' + this.formService.inputPMControl.value;
    const hours = this.setInputValue.segments[0].hour + ',' + this.setInputValue.segments[1].hour;
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
          this.router.navigate(['../']);
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
        days: this.getDaysRange(),
        hours: hours || '',
        quantities: quantitus
      } as ICalendarUpdateRequestParams;
      const endpoint = this.service.patchCalendarRangeUpdateClient$(request)
        .pipe(take(1))
        .subscribe(() => {
          this.router.navigate(['../']);
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
    const month = date + 1;
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
      text: local.name,
      value: local.localCode,
      code: local.localCode,
      fulfillmentCenterCode: local.localCode,
    } as ICustomSelectOption;
  }
}
