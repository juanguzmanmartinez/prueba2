import { NgModule } from '@angular/core';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderFilterStore } from '@stores/order-filter-store.service';
import { OrderFormPresenter } from './views/order-records/order-form.presenter';
import { OrderCancelDialogComponent } from './views/order-cancel-dialog/order-cancel-dialog.component';
import { OrderCancelDialogService } from './views/order-cancel-dialog/order-cancel-dialog.service';
import { DialogModule } from '@molecules/dialog/dialog.module';
import { IconsModule } from '@atoms/icons/icons.module';
import { SelectModule } from '@atoms/select/select.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';

@NgModule({
  declarations: [OrderComponent, OrderCancelDialogComponent],
  imports: [OrderRoutingModule,DialogModule,IconsModule,SelectModule,ButtonsModule],
  providers: [OrderFilterStore, OrderFormPresenter,OrderCancelDialogService],
})
export class OrderModule {}
