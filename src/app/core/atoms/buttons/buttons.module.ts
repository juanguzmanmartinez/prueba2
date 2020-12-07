import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ButtonIconComponent } from './button-icon/button-icon.component';
import { IconsModule } from '../icons/icons.module';
import { ButtonActionIconComponent } from './button-action-icon/button-action-icon.component';
import { ButtonActionTextComponent } from './button-action-text/button-action-text.component';


const COMPONENTS = [
  ButtonComponent,
  ButtonIconComponent,
  ButtonActionIconComponent,
  ButtonActionTextComponent
];


@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    IconsModule,
  ]
})
export class ButtonsModule {
}
