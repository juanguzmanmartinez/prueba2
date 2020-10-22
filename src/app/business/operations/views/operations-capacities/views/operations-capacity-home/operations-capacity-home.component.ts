import {Component} from '@angular/core';
import {OperationsCapacityHomeStoreService} from './store/operations-capacity-home-store.service';
import {OpCapacitiesLocalDefaultCapacityService} from '../../components/op-capacities-local-default-capacity/op-capacities-local-default-capacity.service';

@Component({
  selector: 'app-operations-capacity-home',
  templateUrl: './operations-capacity-home.component.html',
  styleUrls: ['./operations-capacity-home.component.scss'],
  providers: [
    OperationsCapacityHomeStoreService,
    OpCapacitiesLocalDefaultCapacityService
  ]
})
export class OperationsCapacityHomeComponent {

  constructor(
    private _operationsCapacityHomeStoreService: OperationsCapacityHomeStoreService
  ) {
  }
}
