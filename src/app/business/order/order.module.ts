import { NgModule } from '@angular/core';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderFilterStore } from '@stores/order-filter-store.service';
import { OrderFormPresenter } from './views/order-records/order-form.presenter';

@NgModule({
  declarations: [OrderComponent],
  imports: [OrderRoutingModule],
  providers: [OrderFilterStore, OrderFormPresenter],
})
export class OrderModule {}
