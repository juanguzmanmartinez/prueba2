import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotSupportedComponent } from './not-supported/not-supported.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { IconsModule } from '../atoms/icons/icons.module';


@NgModule({
  declarations: [
    NotSupportedComponent,
    UnderConstructionComponent,
  ],
  exports: [
    UnderConstructionComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class PagesModule {
}
