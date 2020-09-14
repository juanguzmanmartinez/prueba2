import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapacityProgrammedRoutingModule } from './capacity-programmed.routing.module';
import { CapacityProgrammedComponent } from './capacity-programmed.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CoreComponentsModule } from 'src/app/commons/core-components/core-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CapacityProgrammedComponent],
  imports: [
    CommonModule,
    CapacityProgrammedRoutingModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    CoreComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CapacityProgrammedModule { }
