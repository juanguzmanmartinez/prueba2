import {Component, Input} from '@angular/core';
import {CCapacitiesServiceTypeName, ECapacitiesServiceType} from '../../../../../../shared/models/capacities/capacities-service-type.model';
import {CapacitiesLocal, CapacitiesLocalServiceDefaultCapacity, CapacityServiceTypeSegment} from '../../models/operations-capacities-responses.model';

@Component({
  selector: 'app-op-capacities-local-default-capacity-dialog',
  templateUrl: './op-capacities-local-default-capacity-dialog.component.html',
  styleUrls: ['./op-capacities-local-default-capacity-dialog.component.scss']
})
export class OpCapacitiesLocalDefaultCapacityDialogComponent {
  defaultCapacityTableDisplayedColumns: string[] = ['hour', 'capacity'];

  public capacityServiceTypeName = CCapacitiesServiceTypeName;
  public eCapacityServiceType = ECapacitiesServiceType;

  @Input() capacitiesLocal: CapacitiesLocal;
  @Input() localServiceTypeTable: CapacitiesLocalServiceDefaultCapacity;
  @Input() defaultCapacityTableDataSource: CapacityServiceTypeSegment[];

  constructor() {
  }

}
