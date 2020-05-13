import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarItemComponent } from './calendar-item/calendar-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarButtonComponent } from './calendar-button/calendar-button.component';
import { CoreComponentsModule } from 'src/app/commons/core-components/core-components.module';
import { CalendarOperationAdminComponent } from './calendar-operation-admin.component';
import { OperationsFormsModule } from '../../operations-forms/operations-forms.module';
import { CalendarServicesModule } from '../../services/calendar-services.module';

const COMPONENTS_OPERATION_ADMIN = [
  CalendarItemComponent,
  CalendarHeaderComponent,
  CalendarButtonComponent,
  CalendarOperationAdminComponent
];


@NgModule({
  declarations: [...COMPONENTS_OPERATION_ADMIN],
  exports: [...COMPONENTS_OPERATION_ADMIN],
  imports: [
    CommonModule,
    FormsModule,
    CoreComponentsModule,
    OperationsFormsModule,
    ReactiveFormsModule,
    CalendarServicesModule
  ]
})
export class CalendarOperationAdminModule { }
