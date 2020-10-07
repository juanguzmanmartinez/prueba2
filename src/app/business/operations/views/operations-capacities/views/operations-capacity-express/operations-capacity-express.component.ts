import {Component, OnDestroy, OnInit} from '@angular/core';
import {Drugstore} from '../../../../../../shared/services/models/drugstore.model';
import {ICustomSelectOption} from '../../../../../../commons/interfaces/custom-controls.interface';
import {ITypeService} from '../../../../../../shared/services/models/type-service.model';
import {Subscription} from 'rxjs';
import {CapacityImplementService} from '../../../../../../shared/services/capacity-edition/capacity-implements.service';
import {Router} from '@angular/router';
import {CapacityStoreService} from '../../../../../../commons/business-factories/factories-stores/capacity-store.service';
import {take} from 'rxjs/operators';
import {ICalendarUpdateRequestParams} from '../../../../../../shared/services/models/capacity.model';
import {IAlert, ILocal} from '../../../../../../shared/services/models/local.model';
import {CapacityExpressService} from './operations-forms/capacity-express-form.service';

@Component({
  selector: 'app-operations-capacity-express',
  templateUrl: './operations-capacity-express.component.html',
  styleUrls: ['./operations-capacity-express.component.scss']
})
export class OperationsCapacityExpressComponent implements OnInit, OnDestroy {


  public groupOrLocalExpanded = true;
  public groupOrLocalTabList: Array<'Grupo' | 'Local'> = ['Grupo', 'Local'];
  public groupOrLocalList: ICustomSelectOption[] = [] as ICustomSelectOption[];
  public groupOrLocalSelection: ICustomSelectOption;

  daterange = null;


  InfoDrugstores: Drugstore[] = [] as Drugstore[];
  selectedVal: string;
  modeEdition: string;
  selectedRadioButton = 'CALENDAR';
  stepOne: boolean;
  stepTwo: boolean;
  stepThree: boolean;
  serviceType: string;
  newInfoDrugstore: ICustomSelectOption[] = [] as ICustomSelectOption[];
  public initialDrugstoreOption: ICustomSelectOption = {} as ICustomSelectOption;
  setInputValue: ITypeService = {} as ITypeService;
  serviceTypeCode: string;
  private subscription: Subscription[] = [];
  selectedStepOne: string;


  constructor(
    private service: CapacityImplementService,
    public formService: CapacityExpressService,
    private router: Router,
    private capacityStoreService: CapacityStoreService
  ) { }

  ngOnInit() {
    this.getGroupOrLocalList(this.groupOrLocalTabList[0]);


    this.serviceTypeCode = 'EXP';
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
      .subscribe(val => {
        console.log(val);
        this.initialDrugstoreOption = val;
      });
    this.subscription.push(radioSubs, dropdowSubs);
  }

  ngOnDestroy() {
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

  public onValChange(val: string) {
    this.selectedVal = val;
    if (val === 'group') {
      this.selectedStepOne = 'Grupo';
      console.log('1');
    } else if (val === 'local') {
      this.selectedStepOne = 'Local';
      this.serviceType = 'EXP';
      this.service.getLocalImplements$(this.serviceType)
        .pipe(take(1))
        .subscribe(value => {
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
      this.service.getTypeOperationImplements$(this.modeEdition, this.initialDrugstoreOption, this.serviceTypeCode)
        .pipe(take(1))
        .subscribe(value => {
          this.setInputValue = value;
          console.log(value);
          console.log(this.setInputValue, 'this.setInputValue');
          this.formService.quantityControl.setValue(this.setInputValue.segments[0].capacity.toString());
        });

    } else if (this.modeEdition === 'CALENDAR') {
      this.selectedRadioButton = 'Calendario';
      this.service.getTypeOperationImplements$(this.modeEdition, this.initialDrugstoreOption, this.serviceTypeCode)
        .pipe(take(1))
        .subscribe(value => {
          console.log(value);
        });

    }

    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = true;
  }

  save() {
    const request = {
      fulfillmentCenterCode: this.initialDrugstoreOption.fulfillmentCenterCode,
      serviceTypeCode: this.serviceType,
      channel: 'DIGITAL',
      quantities: this.formService.quantityControl.value,
    } as ICalendarUpdateRequestParams;
    const endpoint = this.service.patchCalendarUpdateClient$(request)
      .pipe(take(1))
      .subscribe(response => {
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
      // channel: local.channel,
      // segmentType: local.segmentType.name,
      // serviceTypeCode: this.getTypeService(local.services),
    } as ICustomSelectOption;
  }

}
