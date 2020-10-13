import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OperationsCapacitiesRoutingModule} from './operations-capacities-routing.module';
import {OperationsCapacitiesComponent} from './operations-capacities.component';
import {OperationsCapacityAmPmComponent} from './views/operations-capacity-am-pm/operations-capacity-am-pm.component';
import {OperationsCapacityScheduledComponent} from './views/operations-capacity-scheduled/operations-capacity-scheduled.component';
import {OperationsCapacityExpressComponent} from './views/operations-capacity-express/operations-capacity-express.component';
import {OperationsCapacityHomeComponent} from './views/operations-capacity-home/operations-capacity-home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {CoreComponentsModule} from '../../../../commons/core-components/core-components.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {LinksModule} from '../../../../commons/core-components/links/links.module';
import {CapacityExpressFormsModule} from './views/operations-capacity-express/operations-forms/capacity-express-forms.module';
import {RadioModule} from '../../../../commons/core-components/radio/radio.module';
import {CardModule} from '../../../../commons/molecules/cards/card.module';
import {BackRouterModule} from '../../../../commons/molecules/back-router/back-router.module';
import {CardStepModule} from '../../../../commons/molecules/card-step/card-step.module';
import {SelectTabModule} from '../../../../commons/core-components/select-tab/select-tab.module';
import {SelectModule} from '../../../../commons/core-components/select/select.module';
import {InputDatepickerModule} from '../../../../commons/core-components/input-datepicker/input-datepicker.module';
import {InputsModule} from '../../../../commons/core-components/inputs/inputs.module';
import {ButtonsModule} from '../../../../commons/core-components/buttons/buttons.module';
import {OperationsCapacitiesStepGroupOrLocalComponent} from './components/operations-capacities-step-group-or-local/operations-capacities-step-group-or-local.component';
import {OperationsCapacitiesStepEditionModeComponent} from './components/operations-capacities-step-edition-mode/operations-capacities-step-edition-mode.component';
import {MatNativeDateModule} from '@angular/material/core';
import {OperationsCapacityAmPmImplementService} from './views/operations-capacity-am-pm/services/operations-capacity-am-pm-implement.service';
import {OperationsCapacitiesStepAmPmCapacityComponent} from './components/operations-capacities-step-am-pm-capacity/operations-capacities-step-am-pm-capacity.component';
import {OperationsCapacitiesStepScheduledCapacityComponent} from './components/operations-capacities-step-scheduled-capacity/operations-capacities-step-scheduled-capacity.component';
import {OperationsCapacitiesStepExpressResourcesComponent} from './components/operations-capacities-step-express-resources/operations-capacities-step-express-resources.component';
import {AlertModule} from '../../../../commons/molecules/alert/alert.module';

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
    OperationsCapacitiesStepExpressResourcesComponent,
  ],
  imports: [
    CommonModule,
    OperationsCapacitiesRoutingModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    CoreComponentsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    LinksModule,
    CapacityExpressFormsModule,
    RadioModule,
    CardModule,
    BackRouterModule,
    CardStepModule,
    SelectTabModule,
    SelectModule,
    FormsModule,
    InputDatepickerModule,
    InputsModule,
    ButtonsModule,
    AlertModule
  ],
  providers: [
    OperationsCapacityAmPmImplementService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OperationsCapacitiesModule {
}
