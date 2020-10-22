import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button/button.component';
import {ButtonPrimaryComponent} from './button-primary/button-primary.component';
import {ButtonSecondaryComponent} from './button-secondary/button-secondary.component';
import {ButtonGhostComponent} from './button-ghost/button-ghost.component';
import {ButtonOutlineComponent} from './button-outline/button-outline.component';
import {ButtonIconComponent} from './button-icon/button-icon.component';
import {IconsModule} from '../icons/icons.module';
import {ButtonActionComponent} from './button-action/button-action.component';


const COMPONENTS = [
  ButtonComponent,
  ButtonPrimaryComponent,
  ButtonSecondaryComponent,
  ButtonGhostComponent,
  ButtonOutlineComponent,
  ButtonIconComponent,
  ButtonActionComponent,
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
