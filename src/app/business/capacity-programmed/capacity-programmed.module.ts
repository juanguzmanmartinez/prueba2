import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponentsModule } from 'src/app/commons/core-components/core-components.module';
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
import { CapacityProgrammedComponent } from './capacity-programmed.component';
import { CapacityProgrammedRoutingModule } from './capacity-programmed.routing.module';

@NgModule({
  declarations: [CapacityProgrammedComponent],
  imports: [
    CommonModule,
    CapacityProgrammedRoutingModule,
    CoreComponentsModule,
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
    MatSlideToggleModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CapacityProgrammedModule { }
