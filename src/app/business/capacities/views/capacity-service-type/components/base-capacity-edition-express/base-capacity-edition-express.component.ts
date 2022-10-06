import { Component, Input, Optional, SkipSelf } from '@angular/core';
import { DialogTwoActionsService } from '@molecules/dialog/views/dialog-two-actions/dialog-two-actions.service';
import { OpCapacitiesStepExpressResourceFormService } from '../op-capacities-step-express-resource/form/op-capacities-step-express-resource-form.service';
import { OpCapacitiesStepExpressResourceService } from '../op-capacities-step-express-resource/op-capacities-step-express-resource.service';

@Component({
  selector: 'app-base-capacity-edition-express',
  templateUrl: './base-capacity-edition-express.component.html',
  providers: [
    OpCapacitiesStepExpressResourceService,
    OpCapacitiesStepExpressResourceFormService,
  ],
})
export class BaseCapacityEditionExpress {
  @Input() drugStoreName: string;
  constructor(
    @Optional()
    @SkipSelf()
    private _opCapacitiesStepExpressResource: OpCapacitiesStepExpressResourceService,
    public _opCapacitiesStepExpressResourceForm: OpCapacitiesStepExpressResourceFormService,
    private _dialogTwoActions: DialogTwoActionsService
  ) {}
}
