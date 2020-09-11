import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapacityAMPMRoutingModule } from './capacity-express.routing.module';
import { CapacityExpressComponent } from './capacity-express.component';
import { CoreComponentsModule } from 'src/app/commons/core-components/core-components.module';
import { CapacityServicesModule } from '../capacity-am-pm/services/capacity-services.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CapacityFormsModule } from '../capacity-am-pm/operations-forms/capacity-am-pm-forms.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [CapacityExpressComponent],
  imports: [
    CommonModule,
    CapacityAMPMRoutingModule,
    CoreComponentsModule,
    CoreComponentsModule,
    CapacityServicesModule,
    SharedModule,
    FormsModule,
    CapacityFormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CapacityExpressModule { }
