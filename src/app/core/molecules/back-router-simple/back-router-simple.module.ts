import { NgModule } from '@angular/core';
import { BackRouterSimpleComponent } from '@molecules/back-router-simple/back-router-simple.component';
import { IconsModule } from '@atoms/icons/icons.module';
import { LinksModule } from '@atoms/links/links.module';

@NgModule({
  declarations: [
    BackRouterSimpleComponent
  ],
  exports: [
    BackRouterSimpleComponent
  ],
  imports: [
    IconsModule,
    LinksModule
  ]
})
export class BackRouterSimpleModule { }
