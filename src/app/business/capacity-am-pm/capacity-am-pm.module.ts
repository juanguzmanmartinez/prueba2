import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapacityAMPMRoutingModule } from './capacity-am-pm.routing.module';
import { CapacityAmPmComponent } from './capacity-am-pm.component';

import { CoreComponentsModule } from 'src/app/commons/core-components/core-components.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CapacityFormsModule } from './operations-forms/capacity-am-pm-forms.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [CapacityAmPmComponent],
  imports: [
    CommonModule,
    CapacityAMPMRoutingModule,
    CoreComponentsModule,
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CapacityAmPmModule { }
