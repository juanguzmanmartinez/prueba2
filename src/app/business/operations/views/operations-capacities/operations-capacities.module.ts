import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsCapacitiesRoutingModule } from './operations-capacities-routing.module';
import { OperationsCapacitiesComponent } from './operations-capacities.component';
import { OperationsCapacityAmPmComponent } from './views/operations-capacity-am-pm/operations-capacity-am-pm.component';
import { OperationsCapacityScheduledComponent } from './views/operations-capacity-scheduled/operations-capacity-scheduled.component';
import { OperationsCapacityExpressComponent } from './views/operations-capacity-express/operations-capacity-express.component';
import { OperationsCapacityHomeComponent } from './views/operations-capacity-home/operations-capacity-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { LinksModule } from '../../../../core/atoms/links/links.module';
import { RadioModule } from '../../../../core/atoms/radio/radio.module';
import { CardModule } from '../../../../core/molecules/cards/card.module';
import { BackRouterModule } from '../../../../core/molecules/back-router/back-router.module';
import { StepperModule } from '../../../../core/molecules/stepper/stepper.module';
import { SelectTabModule } from '../../../../core/atoms/select-tab/select-tab.module';
import { InputDatepickerModule } from '../../../../core/atoms/input-datepicker/input-datepicker.module';
import { InputsModule } from '../../../../core/atoms/inputs/inputs.module';
import { ButtonsModule } from '../../../../core/atoms/buttons/buttons.module';
import { OpCapacitiesStepGroupOrLocalComponent } from './components/op-capacities-step-group-or-local/op-capacities-step-group-or-local.component';
import { OpCapacitiesStepEditionModeComponent } from './components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.component';
import { OpCapacitiesStepCapacityTableComponent } from './components/op-capacities-step-capacity-table/op-capacities-step-capacity-table.component';
import { OpCapacitiesStepExpressResourceComponent } from './components/op-capacities-step-express-resource/op-capacities-step-express-resource.component';
import { AlertModule } from '../../../../core/molecules/alert/alert.module';
import {
  OpCapacitiesStepCapacityTableFormComponent
} from './components/op-capacities-step-capacity-table-form/op-capacities-step-capacity-table-form.component';
import { MatTableModule } from '@angular/material/table';
import { CheckboxModule } from '../../../../core/atoms/checkox/checkbox.module';
import { OpCapacitiesLocalDefaultCapacityComponent } from './components/op-capacities-local-default-capacity/op-capacities-local-default-capacity.component';
import { TooltipModule } from '../../../../core/atoms/tooltip/tooltip.module';
import { OpCapacitiesLocalDefaultCapacityCardComponent } from './components/op-capacities-local-default-capacity-card/op-capacities-local-default-capacity-card.component';
import { OperationsCapacitiesImplementService } from './services/operations-capacities-implement.service';
import { OperationsCapacityRetComponent } from './views/operations-capacity-ret/operations-capacity-ret.component';
import { OpCapacitiesLocalDefaultCapacityDialogComponent } from './components/op-capacities-local-default-capacity-dialog/op-capacities-local-default-capacity-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { IconsModule } from '../../../../core/atoms/icons/icons.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SelectSearchModule } from '../../../../core/atoms/select-search/select-search.module';

@NgModule({
  declarations: [
    OperationsCapacitiesComponent,
    OperationsCapacityAmPmComponent,
    OperationsCapacityScheduledComponent,
    OperationsCapacityExpressComponent,
    OperationsCapacityHomeComponent,
    OpCapacitiesStepGroupOrLocalComponent,
    OpCapacitiesStepEditionModeComponent,
    OpCapacitiesStepCapacityTableComponent,
    OpCapacitiesStepExpressResourceComponent,
    OpCapacitiesStepCapacityTableFormComponent,
    OpCapacitiesLocalDefaultCapacityComponent,
    OpCapacitiesLocalDefaultCapacityCardComponent,
    OperationsCapacityRetComponent,
    OpCapacitiesLocalDefaultCapacityDialogComponent
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
    FormsModule,
    InputDatepickerModule,
    InputsModule,
    ButtonsModule,
    AlertModule,
    MatTableModule,
    CheckboxModule,
    TooltipModule,
    MatDialogModule,
    IconsModule,
    MatTabsModule,
    SelectSearchModule,
  ],
  providers: [
    OperationsCapacitiesImplementService
  ]
})
export class OperationsCapacitiesModule {
}
