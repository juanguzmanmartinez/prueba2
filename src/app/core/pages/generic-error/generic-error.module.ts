import { NgModule } from '@angular/core';
import { GenericErrorComponent } from './generic-error.component';
import { IconsModule } from '@atoms/icons/icons.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { LinksModule } from '@atoms/links/links.module';


@NgModule({
  declarations: [
    GenericErrorComponent
  ],
  exports: [
    GenericErrorComponent
  ],
  imports: [
    IconsModule,
    ButtonsModule,
    LinksModule,
  ]
})
export class GenericErrorModule {
}
