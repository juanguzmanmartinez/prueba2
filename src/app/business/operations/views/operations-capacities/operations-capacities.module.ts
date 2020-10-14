import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OperationsCapacitiesRoutingModule} from './operations-capacities-routing.module';
import {OperationsCapacitiesComponent} from './operations-capacities.component';
import {OperationsCapacityAmPmComponent} from './views/operations-capacity-am-pm/operations-capacity-am-pm.component';
import {OperationsCapacityScheduledComponent} from './views/operations-capacity-scheduled/operations-capacity-scheduled.component';
import {OperationsCapacityExpressComponent} from './views/operations-capacity-express/operations-capacity-express.component';
import {OperationsCapacityHomeComponent} from './views/operations-capacity-home/operations-capacity-home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {LinksModule} from '../../../../commons/core-components/links/links.module';
import {RadioModule} from '../../../../commons/core-components/radio/radio.module';
import {CardModule} from '../../../../commons/molecules/cards/card.module';
import {BackRouterModule} from '../../../../commons/molecules/back-router/back-router.module';
import {StepperModule} from '../../../../commons/molecules/stepper/stepper.module';
import {SelectTabModule} from '../../../../commons/core-components/select-tab/select-tab.module';
import {SelectModule} from '../../../../commons/core-components/select/select.module';
import {InputDatepickerModule} from '../../../../commons/core-components/input-datepicker/input-datepicker.module';
import {InputsModule} from '../../../../commons/core-components/inputs/inputs.module';
import {ButtonsModule} from '../../../../commons/core-components/buttons/buttons.module';
import {OperationsCapacitiesStepGroupOrLocalComponent} from './components/operations-capacities-step-group-or-local/operations-capacities-step-group-or-local.component';
import {OperationsCapacitiesStepEditionModeComponent} from './components/operations-capacities-step-edition-mode/operations-capacities-step-edition-mode.component';
import {OperationsCapacitiesStepAmPmCapacityComponent} from './components/operations-capacities-step-am-pm-capacity/operations-capacities-step-am-pm-capacity.component';
import {OperationsCapacitiesStepScheduledCapacityComponent} from './components/operations-capacities-step-scheduled-capacity/operations-capacities-step-scheduled-capacity.component';
import {OperationsCapacitiesStepExpressResourceComponent} from './components/operations-capacities-step-express-resource/operations-capacities-step-express-resource.component';
import {AlertModule} from '../../../../commons/molecules/alert/alert.module';
import {
  OperationsCapacitiesStepScheduledCapacityTableFormComponent
} from './components/operations-capacities-step-scheduled-capacity/operations-capacities-step-scheduled-capacity-table-form/operations-capacities-step-scheduled-capacity-table-form.component';
import {MatTableModule} from '@angular/material/table';
import {CheckboxModule} from '../../../../commons/core-components/checkox/checkbox.module';

@NgModule({
  declarations: [
    OperationsCapacitiesComponent,
    OperationsCapacityAmPmComponent,
    OperationsCapacityScheduledComponent,
    OperationsCapacityExpressComponent,
    OperationsCapacityHomeComponent,
    OperationsCapacitiesStepGroupOrLocalComponent,
    OperationsCapacitiesStepEditionModeComponent,
    OperationsCapacitiesStepAmPmCapacityComponent,
    OperationsCapacitiesStepScheduledCapacityComponent,
    OperationsCapacitiesStepExpressResourceComponent,
    OperationsCapacitiesStepScheduledCapacityTableFormComponent,
  ],
  imports: [
    CommonModule,
    OperationsCapacitiesRoutingModule,
    ReactiveFormsModule,
    MatExpansionModule,
    LinksModule,
    RadioModule,
    CardModule,
    BackRouterModule,
    StepperModule,
    SelectTabModule,
    SelectModule,
    FormsModule,
    InputDatepickerModule,
    InputsModule,
    ButtonsModule,
    AlertModule,
    MatTableModule,
    CheckboxModule
  ]
})
export class OperationsCapacitiesModule {
}
