import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardActionComponent } from './card-action/card-action.component';
import {CardRadioComponent} from './card-radio/card-radio.component';
import {IconsModule} from '../../core-components/icons/icons.module';
import {RadioModule} from '../../core-components/radio/radio.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    CardActionComponent,
    CardRadioComponent
  ],
  exports: [
    CardActionComponent,
    CardRadioComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    RadioModule,
    FormsModule
  ]
})
export class CardModule { }
