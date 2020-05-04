import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarItemComponent } from './calendar-item/calendar-item.component';
import { CalendarBodyComponent } from './calendar-body/calendar-body.component';
import { FormsModule } from '@angular/forms';
import { CalendarButtonComponent } from './calendar-button/calendar-button.component';
import { CoreComponentsModule } from 'src/app/commons/core-components/core-components.module';
import { CalendarOperationAdminComponent } from './calendar-operation-admin.component';

const COMPONENTS_OPERATION_ADMIN = [
  CalendarBodyComponent,
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
    CoreComponentsModule
  ]
})
export class CalendarOperationAdminModule { }
