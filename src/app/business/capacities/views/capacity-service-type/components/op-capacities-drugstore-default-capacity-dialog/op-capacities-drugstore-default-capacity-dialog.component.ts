import { AfterViewInit, Component, Input } from '@angular/core';
import {
  CDeliveryServiceTypeName,
  EDeliveryServiceType,
} from '@models/service-type/delivery-service-type.model';
import {
  CapacitiesDrugstore,
  CapacitiesDrugstoreServiceDefaultCapacity,
  CapacityServiceTypeSegment,
} from '../../models/operations-capacities-responses.model';

@Component({
  selector: 'app-op-capacities-drugstore-default-capacity-dialog',
  templateUrl:
    './op-capacities-drugstore-default-capacity-dialog.component.html',
  styleUrls: [
    './op-capacities-drugstore-default-capacity-dialog.component.scss',
  ],
})
export class OpCapacitiesDrugstoreDefaultCapacityDialogComponent
  implements AfterViewInit
{
  displayedColumns: string[] = ['hour', 'capacity'];

  public capacityServiceTypeName = CDeliveryServiceTypeName;
  public eCapacityServiceType = EDeliveryServiceType;
  public loading = false;

  @Input() capacitiesDrugstore: CapacitiesDrugstore;
  @Input() drugstoreServiceTypeTable: CapacitiesDrugstoreServiceDefaultCapacity;
  @Input() dataSource: CapacityServiceTypeSegment[];

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = true;
    }, 400);
  }
}
