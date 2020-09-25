import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsCapacitiesRoutingModule } from './operations-capacities-routing.module';
import { OperationsCapacitiesComponent } from './operations-capacities.component';
import { OperationsCapacityAmPmComponent } from './views/operations-capacity-am-pm/operations-capacity-am-pm.component';
import { OperationsCapacityScheduledComponent } from './views/operations-capacity-scheduled/operations-capacity-scheduled.component';
import { OperationsCapacityExpressComponent } from './views/operations-capacity-express/operations-capacity-express.component';
import { OperationsCapacityHomeComponent } from './views/operations-capacity-home/operations-capacity-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CoreComponentsModule } from '../../../../commons/core-components/core-components.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CapacityFormsModule } from './views/operations-capacity-am-pm/operations-forms/capacity-am-pm-forms.module';
import { LinksModule } from '../../../../commons/core-components/links/links.module';
import { CapacityExpressFormsModule } from './views/operations-capacity-express/operations-forms/capacity-express-forms.module';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    OperationsCapacitiesComponent,
    OperationsCapacityAmPmComponent,
    OperationsCapacityScheduledComponent,
    OperationsCapacityExpressComponent,
    OperationsCapacityHomeComponent,
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
    CapacityFormsModule,
    LinksModule,
    CapacityExpressFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OperationsCapacitiesModule {
}
