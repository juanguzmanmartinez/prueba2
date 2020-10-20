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
import {OpCapacitiesStepGroupOrLocalComponent} from './components/op-capacities-step-group-or-local/op-capacities-step-group-or-local.component';
import {OpCapacitiesStepEditionModeComponent} from './components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.component';
import {OpCapacitiesStepAmPmCapacityComponent} from './components/op-capacities-step-am-pm-capacity/op-capacities-step-am-pm-capacity.component';
import {OpCapacitiesStepCapacityTableComponent} from './components/op-capacities-step-capacity-table/op-capacities-step-capacity-table.component';
import {OpCapacitiesStepExpressResourceComponent} from './components/op-capacities-step-express-resource/op-capacities-step-express-resource.component';
import {AlertModule} from '../../../../commons/molecules/alert/alert.module';
import {
  OpCapacitiesStepCapacityTableFormComponent
} from './components/op-capacities-step-capacity-table-form/op-capacities-step-capacity-table-form.component';
import {MatTableModule} from '@angular/material/table';
import {CheckboxModule} from '../../../../commons/core-components/checkox/checkbox.module';
import {OpCapacitiesLocalDefaultCapacityComponent} from './components/op-capacities-local-default-capacity/op-capacities-local-default-capacity.component';
import {TooltipModule} from '../../../../commons/core-components/tooltip/tooltip.module';
import { OpCapacitiesLocalDefaultCapacityCardComponent } from './components/op-capacities-local-default-capacity-card/op-capacities-local-default-capacity-card.component';
import {OperationsCapacitiesImplementService} from './services/operations-capacities-implement.service';
import { OperationsCapacityRetComponent } from './views/operations-capacity-ret/operations-capacity-ret.component';

@NgModule({
  declarations: [
    OperationsCapacitiesComponent,
    OperationsCapacityAmPmComponent,
    OperationsCapacityScheduledComponent,
    OperationsCapacityExpressComponent,
    OperationsCapacityHomeComponent,
    OpCapacitiesStepGroupOrLocalComponent,
    OpCapacitiesStepEditionModeComponent,
    OpCapacitiesStepAmPmCapacityComponent,
    OpCapacitiesStepCapacityTableComponent,
    OpCapacitiesStepExpressResourceComponent,
    OpCapacitiesStepCapacityTableFormComponent,
    OpCapacitiesLocalDefaultCapacityComponent,
    OpCapacitiesLocalDefaultCapacityCardComponent,
    OperationsCapacityRetComponent
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
    CheckboxModule,
    TooltipModule
  ],
  providers: [
    OperationsCapacitiesImplementService
  ]
})
export class OperationsCapacitiesModule {
}
