import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationsAdminComponent } from './operations-admin.component';
import { OperationsAdminRoutingModule } from './operations-admin.routing.module';
import { CoreComponentsModule } from 'src/app/commons/core-components/core-components.module';
import { FormsModule } from '@angular/forms';
import { CalendarOperationAdminModule } from './components/calendar-operation-admin/calendar-operation-admin.module';



@NgModule({
  declarations: [OperationsAdminComponent],
  imports: [
    CommonModule,
    OperationsAdminRoutingModule,
    CoreComponentsModule,
    FormsModule,
    CalendarOperationAdminModule
  ]
})
export class OperationsAdminModule { }
