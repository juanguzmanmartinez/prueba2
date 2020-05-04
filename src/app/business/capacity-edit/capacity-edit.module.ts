import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapacityEditComponent } from './capacity-edit.component';
import { CapacityEditRoutingModule } from './capacity-edit.routing.module';
import { CoreComponentsModule } from 'src/app/commons/core-components/core-components.module';
import { TableCapacityEditionModule } from './components/table-capacity-edition/table-capacity-edition.module';



@NgModule({
  declarations: [CapacityEditComponent],
  imports: [
    CommonModule,
    CapacityEditRoutingModule,
    CoreComponentsModule,
    TableCapacityEditionModule
  ]
})
export class CapacityEditModule { }
