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
import { LinksModule } from '@atoms/links/links.module';
import { RadioModule } from '@atoms/radio/radio.module';
import { CardModule } from '@molecules/cards/card.module';
import { BackRouterModule } from '@molecules/back-router/back-router.module';
import { StepperModule } from '@molecules/stepper/stepper.module';
import { SelectTabModule } from '@atoms/select-tab/select-tab.module';
import { InputDatepickerModule } from '@atoms/input-datepicker/input-datepicker.module';
import { InputsModule } from '@atoms/inputs/inputs.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { OpCapacitiesStepGroupOrDrugstoreComponent } from './components/op-capacities-step-group-or-drugstore/op-capacities-step-group-or-drugstore.component';
import { OpCapacitiesStepEditionModeComponent } from './components/op-capacities-step-edition-mode/op-capacities-step-edition-mode.component';
import { OpCapacitiesStepCapacityTableComponent } from './components/op-capacities-step-capacity-table/op-capacities-step-capacity-table.component';
import { OpCapacitiesStepExpressResourceComponent } from './components/op-capacities-step-express-resource/op-capacities-step-express-resource.component';
import { AlertModule } from '@molecules/alert/alert.module';
import { OpCapacitiesStepCapacityTableFormComponent } from './components/op-capacities-step-capacity-table-form/op-capacities-step-capacity-table-form.component';
import { MatTableModule } from '@angular/material/table';
import { CheckboxModule } from '@atoms/checkbox/checkbox.module';
import { OpCapacitiesDrugstoreDefaultCapacityComponent } from './components/op-capacities-drugstore-default-capacity/op-capacities-drugstore-default-capacity.component';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';
import { OpCapacitiesDrugstoreDefaultCapacityCardComponent } from './components/op-capacities-drugstore-default-capacity-card/op-capacities-drugstore-default-capacity-card.component';
import { OperationsCapacitiesImplementService } from './implements/operations-capacities-implement.service';
import { OperationsCapacityRetComponent } from './views/operations-capacity-ret/operations-capacity-ret.component';
import { OpCapacitiesDrugstoreDefaultCapacityDialogComponent } from './components/op-capacities-drugstore-default-capacity-dialog/op-capacities-drugstore-default-capacity-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { IconsModule } from '@atoms/icons/icons.module';
import { TabModule } from '@molecules/tab/tab.module';
import { SelectSearchModule } from '@atoms/select-search/select-search.module';
import { DirectivesModule } from '../../../../shared/directives/directives.module';
import { TableModule } from '@molecules/table/table.module';
import { DialogModule } from '@molecules/dialog/dialog.module';
import { OperationsCapacityReportComponent } from './views/operations-capacity-report/operations-capacity-report.component';
import { PipesModule } from '@pipes/pipes.module';
import { DropOptionsModule } from '@molecules/drop-options/drop-options.module';
import { OperationsIntervalExpressComponent } from './views/operations-interval-express/operations-interval-express.component';
import { OpIntervalsStepSetExpressComponent } from './components/op-intervals-step-set-express/op-intervals-step-set-express.component';
import { CardStepModule } from '@molecules/card-step/card-step.module';
import { SwitchModule } from '@atoms/switch/switch.module';
import { OperationsCapacityIntervalExpressListComponent } from './views/operations-capacity-interval-express-list/operations-capacity-interval-express-list.component';
import { OperationsCapacityIntervalExpressUploadComponent } from './views/operations-capacity-interval-express-upload/operations-capacity-interval-express-upload.component';
import { OperationsCapacityIntervalComponent } from './views/operations-capacity-interval/operations-capacity-interval.component';
import { SelectModule } from '@atoms/select/select.module';
import { OperationsCapacityIntervalUploadComponent } from './views/operations-capacity-interval-upload/operations-capacity-interval-upload.component';
import { StepTabsModule } from '@molecules/step-tabs/step-tabs.module';
import { OpCapacitiesIntervalStepUploadComponent } from './components/op-capacities-interval-step-upload/op-capacities-interval-step-upload.component';
import { OpCapacitiesIntervalStepConfirmationComponent } from './components/op-capacities-interval-step-confirmation/op-capacities-interval-step-confirmation.component';

@NgModule({
  declarations: [
    OperationsCapacitiesComponent,
    OperationsCapacityHomeComponent,
    OperationsCapacityAmPmComponent,
    OperationsCapacityScheduledComponent,
    OperationsCapacityExpressComponent,
    OperationsCapacityRetComponent,
    OperationsCapacityReportComponent,
    OpCapacitiesStepGroupOrDrugstoreComponent,
    OpCapacitiesStepEditionModeComponent,
    OpCapacitiesStepCapacityTableComponent,
    OpCapacitiesStepExpressResourceComponent,
    OpCapacitiesStepCapacityTableFormComponent,
    OpCapacitiesDrugstoreDefaultCapacityComponent,
    OpCapacitiesDrugstoreDefaultCapacityCardComponent,
    OpCapacitiesDrugstoreDefaultCapacityDialogComponent,
    OperationsIntervalExpressComponent,
    OpIntervalsStepSetExpressComponent,
    OperationsCapacityIntervalExpressListComponent,
    OperationsCapacityIntervalExpressUploadComponent,
    OperationsCapacityIntervalComponent,
    OperationsCapacityIntervalUploadComponent,
    OpCapacitiesIntervalStepUploadComponent,
    OpCapacitiesIntervalStepConfirmationComponent,
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
    TabModule,
    SelectSearchModule,
    DirectivesModule,
    TableModule,
    DialogModule,
    PipesModule,
    DropOptionsModule,
    CardStepModule,
    SwitchModule,
    SelectModule,
    StepTabsModule,
  ],
  providers: [OperationsCapacitiesImplementService],
})
export class OperationsCapacitiesModule {}
