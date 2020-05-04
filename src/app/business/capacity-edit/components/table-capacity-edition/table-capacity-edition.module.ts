import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCapacityEditionComponent } from './table-capacity-edition.component';
import { TableBodyCapacityEditionComponent } from './table-body-capacity-edition/table-body-capacity-edition.component';
import { TableItemCapacityEditionComponent } from './table-item-capacity-edition/table-item-capacity-edition.component';
import {
  TableTitleHeaderCapacityEditionComponent
} from './table-title-header-capacity-edition/table-title-header-capacity-edition.component';
import { CoreComponentsModule } from 'src/app/commons/core-components/core-components.module';
import { TableBlockCapacityEditionComponent } from './table-block-capacity-edition/table-block-capacity-edition.component';
import { TableOperationTypeSectionComponent } from './table-operation-type-section/table-operation-type-section.component';

const COMPONENT_CAPACITY = [
  TableCapacityEditionComponent,
  TableBodyCapacityEditionComponent,
  TableItemCapacityEditionComponent,
  TableTitleHeaderCapacityEditionComponent,
  TableBlockCapacityEditionComponent,
  TableOperationTypeSectionComponent
];

@NgModule({
  declarations: [...COMPONENT_CAPACITY],
  exports: [...COMPONENT_CAPACITY],
  imports: [
    CommonModule,
    CoreComponentsModule
  ]
})
export class TableCapacityEditionModule { }
