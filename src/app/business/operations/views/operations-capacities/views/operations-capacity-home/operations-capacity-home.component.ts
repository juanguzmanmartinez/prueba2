import {Component, OnInit} from '@angular/core';
import {CapacityStoreService} from '../../../../../../commons/business-factories/factories-stores/capacity-store.service';

@Component({
  selector: 'app-operations-capacity-home',
  templateUrl: './operations-capacity-home.component.html',
  styleUrls: ['./operations-capacity-home.component.scss']
})
export class OperationsCapacityHomeComponent implements OnInit {

  typeService: string;
  local: string;
  selectedStepOne: string;
  showAlert: boolean;

  constructor(
    private capacityStoreService: CapacityStoreService
  ) {
  }

  ngOnInit(): void {
    this.showAlert = false;
    const {selectedDrugstore} = this.capacityStoreService;
    this.typeService = selectedDrugstore.typeService;
    this.local = selectedDrugstore.nameLocal;
    this.selectedStepOne = selectedDrugstore.selectedStepOne;
    this.showAlert = selectedDrugstore.showAlert;

  }
}
