import { Component, OnInit } from '@angular/core';
import { IBlockSchedule } from '../../models/schedule.model';
import { CapacityEditImplementService } from '../../services/capacity-edit-implements.service';
import { tap, switchMap, take } from 'rxjs/operators';
import { ICapacityRequestParams, Capacity, ISegment } from 'src/app/shared/services/models/capacity.model';
import { CapacityEditFormsService } from '../../capacity-forms/capacity-edit-forms';
import { ITypeOperation } from './table-operation-type-section/table-operation-type-section.component';

@Component({
  selector: 'app-table-capacity-edition',
  templateUrl: './table-capacity-edition.component.html',
  styleUrls: ['./table-capacity-edition.component.scss']
})
export class TableCapacityEditionComponent implements OnInit {

  scheduleBlock: IBlockSchedule[] = [] as IBlockSchedule[];
  responseCapacity: Capacity[];
  segements: ISegment[] = [] as ISegment[];
  pageRad: boolean;
  pageRet: boolean;
  quantityOperations: number;
  constructor(
    private capacityEditImplementService: CapacityEditImplementService,
    public capacityForms: CapacityEditFormsService,
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
    const requestParams = {
      segmentType: 'PROGRAMMED',
      day: '2020-04-27',
      fulfillmentCenterCode: '533',
      channel: 'DIGITAL'
    } as ICapacityRequestParams;

    this.capacityEditImplementService.getBlockScheduleImplements$(requestParams)
      .pipe(take(1))
      .subscribe(response => {
        this.responseCapacity = response;
        this.quantityOperations = this.responseCapacity.length;
        this.setInfoCheckedSelectedArray1();
        this.setInfoCheckedSelectedArray2();
      });
  }

  private setInfoCheckedSelectedArray1() {
    let i = 0;
    this.segements = [];
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
}
