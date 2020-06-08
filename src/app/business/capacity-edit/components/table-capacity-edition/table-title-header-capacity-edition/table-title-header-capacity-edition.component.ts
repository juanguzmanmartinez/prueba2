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
  @Input()
  order: number;
  @Input()
  totalCapacity: number;

  public subscriptions: Subscription[] = [];

  constructor(
    public capacityEditForms: CapacityEditFormsService,
    public capacityAllEditForm: CapacityAllEditFormService,
  ) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.capacityAllEditForm.allCapacitiesControl.setValue('');
  }

  public updateAllCapacities1() {
    if (this.capacityAllEditForm.form.status === 'VALID') {
      const { allCapacitiesControl } = this.capacityAllEditForm;
      const capacity = Number(allCapacitiesControl.value);
      this.capacityEditForms.setAllCapacitiesOfSegment01(capacity);
    } else if (this.capacityAllEditForm.form.status === 'INVALID') {
      alert('La capacidad mínima  es 0, recuerda que al aplicar a todos afectara a todas las capacidades');
    }

  }

  public updateAllCapacities2() {
    if (this.capacityAllEditForm.form.status === 'VALID') {
      const { allCapacitiesControl } = this.capacityAllEditForm;
      const capacity = Number(allCapacitiesControl.value);
      this.capacityEditForms.setAllCapacitiesOfSegment02(capacity);
    } else if (this.capacityAllEditForm.form.status === 'INVALID') {
      alert('La capacidad mínima es 0, recuerda que al aplicar a todos afectara a todas las capacidades');
    }
  }
}
