import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackRouterComponent } from './back-router.component';
import { IconsModule } from '@atoms/icons/icons.module';
import { LinksModule } from '@atoms/links/links.module';


@NgModule({
  declarations: [BackRouterComponent],
  exports: [
    BackRouterComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    LinksModule
  ]
})
export class BackRouterModule { }
