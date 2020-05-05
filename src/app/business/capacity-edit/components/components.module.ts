import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCapacityEditionModule } from './table-capacity-edition/table-capacity-edition.module';
import { CoreComponentsModule } from 'src/app/commons/core-components/core-components.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableCapacityEditionModule,
    CoreComponentsModule
  ]
})
export class ComponentsModule { }
