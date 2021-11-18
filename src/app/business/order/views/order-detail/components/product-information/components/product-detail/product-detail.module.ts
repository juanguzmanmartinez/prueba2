import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './product-detail.component';
import { IconsModule } from '@atoms/icons/icons.module';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ProductDetailComponent
  ],
  imports: [
    IconsModule,
    TooltipModule,
    CommonModule
  ],
  exports: [
    ProductDetailComponent
  ]
})
export class ProductDetailModule { }
