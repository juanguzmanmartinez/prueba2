import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCapacityEditionComponent } from './table-capacity-edition.component';
import { TableItemCapacityEditionComponent } from './table-item-capacity-edition/table-item-capacity-edition.component';
import {
  TableTitleHeaderCapacityEditionComponent
} from './table-title-header-capacity-edition/table-title-header-capacity-edition.component';
import { CoreComponentsModule } from 'src/app/commons/core-components/core-components.module';
import { TableBlockCapacityEditionComponent } from './table-block-capacity-edition/table-block-capacity-edition.component';
import { TableOperationTypeSectionComponent } from './table-operation-type-section/table-operation-type-section.component';
import { CapacityEditServicesModule } from '../../services/capacity-edit-services.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CapacityEditFormsModule } from '../../capacity-forms/capacity-edit-forms.module';

const COMPONENT_CAPACITY = [
  TableCapacityEditionComponent,
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
    CoreComponentsModule,
    CapacityEditServicesModule,
    ReactiveFormsModule,
    FormsModule,
    CapacityEditFormsModule,
  ]
})
export class TableCapacityEditionModule { }
