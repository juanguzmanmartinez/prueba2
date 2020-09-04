import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapacityAMPMRoutingModule } from './capacity-express.routing.module';
import { CapacityExpressComponent } from './capacity-express.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CoreComponentsModule } from 'src/app/commons/core-components/core-components.module';

@NgModule({
  declarations: [CapacityExpressComponent],
  imports: [
    CommonModule,
    CapacityAMPMRoutingModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    CoreComponentsModule,
  ]
})
export class CapacityExpressModule { }
