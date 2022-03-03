import { NgModule } from '@angular/core';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderFilterStore } from '@stores/order-filter-store.service';

@NgModule({
  declarations: [OrderComponent],
  imports: [OrderRoutingModule],
  providers: [OrderFilterStore]
})
export class OrderModule {}
