import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CapacityStoreService } from 'src/app/commons/business-factories/factories-stores/capacity-store.service';

@Component({
  selector: 'app-capacity-manager',
  templateUrl: './capacity-manager.component.html',
  styleUrls: ['./capacity-manager.component.scss']
})
export class CapacityManagerComponent implements OnInit {

  typeService: string;
  local: string;
  selectedStepOne: string;
  showAlert: boolean;

  constructor(
    private router: Router,
    private capacityStoreService: CapacityStoreService
  ) { }

  ngOnInit(): void {
    this.showAlert = false;
    const { selectedDrugstore } = this.capacityStoreService;
    this.typeService = selectedDrugstore.typeService;
    this.local = selectedDrugstore.nameLocal;
    this.selectedStepOne = selectedDrugstore.selectedStepOne;
    this.showAlert = selectedDrugstore.showAlert;
    console.log(selectedDrugstore);

  }

  redirect() {
    this.router.navigate(['/capacity-am-pm']);
  }

  redirectExpress() {
    this.router.navigate(['/capacity-express']);
  }

  redirectProgrammed() {
    this.router.navigate(['/capacity-programmed']);
  }
}
