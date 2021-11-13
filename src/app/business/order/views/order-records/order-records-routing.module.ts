import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderRecordsComponent } from './order-records.component';

const routes: Routes = [
  {
    path: '',
    component: OrderRecordsComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRecordsRoutingModule { }
