import { Component, OnInit } from '@angular/core';
import { IBlockSchedule, ITypeOperation, IHeaderCapacity } from '../../models/schedule.model';
import { Capacity, ISegment, ICapacityRequestParams } from 'src/app/shared/services/models/capacity.model';
import { CapacityEditFormsService } from '../../capacity-forms/capacity-edit-forms';
import { CalendarStoreService } from 'src/app/business/operations-admin/store/calendar-store.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CapacityEditImplementService } from '../../services/capacity-edit-implements.service';
import { CompanyDrugstoresStoreService } from 'src/app/commons/business-factories/factories-stores/company-drugstores-store.service';

@Component({
  selector: 'app-table-capacity-edition',
  templateUrl: './table-capacity-edition.component.html',
  styleUrls: ['./table-capacity-edition.component.scss']
})
export class TableCapacityEditionComponent implements OnInit {

  scheduleBlock: IBlockSchedule[] = [] as IBlockSchedule[];
  responseCapacity: Capacity[];
  segements: ISegment[] = [] as ISegment[];
  quantityCapacity: IHeaderCapacity = { capacitiesQuantity: 0, ordersQuantity: 0 } as IHeaderCapacity;
  pageRad: boolean;
  pageRet: boolean;
  quantityOperations: number;
  quantityTotal: number;
  constructor(
    public capacityForms: CapacityEditFormsService,
    public calendarStoreService: CalendarStoreService,
    private router: Router,
    public capacityEditImplementService: CapacityEditImplementService,
    private companyDrugstoresStore: CompanyDrugstoresStoreService,
  ) { }

  ngOnInit() {
    this.pageRad = false;
    this.pageRet = true;
    this.scheduleBlock = [
      {
        block: 'bloque 1',
        schedule: '00:00 am - 06:00 am'
      },
      {
        block: 'bloque 2',
        schedule: '06:00 am - 12:00 pm'
      },
      {
        block: 'bloque 3',
        schedule: '12:00 pm - 06:00 pm'
      },
      {
        block: 'bloque 4',
        schedule: '06:00 pm - 00:00 am'
      },
    ];
    this.loadBlockSchedule();
  }

  private loadBlockSchedule() {
    this.calendarStoreService.capacitiesForDay$.subscribe(capacities => {
      this.responseCapacity = capacities;
      this.quantityOperations = this.responseCapacity.length;
      this.setInfoCheckedSelectedArray1();
      if (this.quantityOperations >= 2) {
        this.setInfoCheckedSelectedArray2();
      }
    });
  }

  private setInfoCheckedSelectedArray1() {
    let i = 0;
    this.segements = [];
    const headerSectionValues = {
      capacitiesQuantity: this.responseCapacity[0].capacitiesQuantity,
      ordersQuantity: this.responseCapacity[0].ordersQuantity
    } as IHeaderCapacity;

    this.quantityCapacity = headerSectionValues;
    this.quantityTotal = this.responseCapacity[0].capacitiesQuantity;

    this.responseCapacity[0].segments.forEach((value, index) => {
      this.capacityForms.timeSegment01Array.removeAt(this.responseCapacity[0].segments.length - index);
      this.segements.push({
        id: i,
        capacity: value.capacity,
        orders: value.orders,
        hour: value.hour,
        scheduleSegment: value.scheduleSegment,
        enabled: value.enabled,
        group: value.group
      });
      i++;

    });
    this.capacityForms.addItemsToBlock01(this.segements);
  }

  private setInfoCheckedSelectedArray2() {
    let i = 0;
    this.segements = [];
    const headerSectionValues = {
      capacitiesQuantity: this.responseCapacity[1].capacitiesQuantity,
      ordersQuantity: this.responseCapacity[1].ordersQuantity
    } as IHeaderCapacity;

    this.quantityCapacity = headerSectionValues;
    this.quantityTotal = this.responseCapacity[1].capacitiesQuantity;
    this.responseCapacity[1].segments.forEach((value, index) => {
      this.capacityForms.timeSegment02Array.removeAt(this.responseCapacity[1].segments.length - index);
      this.segements.push({
        id: i,
        capacity: value.capacity,
        orders: value.orders,
        hour: value.hour,
        scheduleSegment: value.scheduleSegment,
        enabled: value.enabled,
        group: value.group
      });
      i++;

    });
    this.capacityForms.addItemsToBlock02(this.segements);
  }

  valueNumberArray($event: ITypeOperation) {
    if ($event.code === 'RAD' && $event.numberArray === 0) {
      this.pageRad = false;
      this.pageRet = true;
    } else if ($event.code === 'RET' && $event.numberArray === 1) {
      this.pageRad = true;
      this.pageRet = false;

    }
  }

  return() {
    this.router.navigate(['/operations-administrator']);
  }

  save() {
    const formValues = this.capacityForms.getCapacitiesAndHoursFromSegment01();
    const { selectedDrugstore, configForCapacities } = this.companyDrugstoresStore;
    const request = {
      fulfillmentCenterCode: selectedDrugstore.localCode,
      serviceTypeCode: !this.pageRad ? 'RAD' : !this.pageRet ? 'RET' : '',
      segmentType: 'PROGRAMMED',
      day: configForCapacities.selectedDay,
      channel: selectedDrugstore.channel,
      quantities: formValues.capacitiesString,
      hours: formValues.hoursString,
    } as ICapacityRequestParams;
    this.capacityEditImplementService.patchScheduleDetailImplements$(request)
      .pipe(take(1))
      .subscribe(response => {
        console.log(response, 'response');
      });

  }
}
