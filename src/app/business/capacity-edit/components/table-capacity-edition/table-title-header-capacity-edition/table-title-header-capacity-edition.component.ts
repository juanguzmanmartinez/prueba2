import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CapacityEditFormsService } from '../../../capacity-forms/capacity-edit-forms';
import { Subscription } from 'rxjs';
import { CapacityAllEditFormService } from '../../../capacity-forms/capacity-all-edit-form.service';

@Component({
  selector: 'app-table-title-header-capacity-edition',
  templateUrl: './table-title-header-capacity-edition.component.html',
  styleUrls: ['./table-title-header-capacity-edition.component.scss']
})
export class TableTitleHeaderCapacityEditionComponent implements OnInit, OnDestroy {

  @Input()
  type: string;

  public totalCapacity = 0;
  public subscriptions: Subscription[] = [];

  constructor(
    public capacityEditForms: CapacityEditFormsService,
    public capacityAllEditForm: CapacityAllEditFormService,
  ) { }

  ngOnInit() {
    const totalSub = this.capacityEditForms.getTotalCapacitySegment01$()
      .subscribe(total => this.totalCapacity = total);
    this.subscriptions.push(totalSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public updateAllCapacities() {
    const { allCapacitiesControl } = this.capacityAllEditForm;
    const capacity = Number(allCapacitiesControl.value);
    this.capacityEditForms.setAllCapacitiesOfSegment01(capacity);
  }
}
