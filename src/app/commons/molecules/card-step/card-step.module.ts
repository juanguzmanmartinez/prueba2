import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardStepComponent } from './card-step.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {IconsModule} from '../../core-components/icons/icons.module';
import {ButtonsModule} from '../../core-components/buttons/buttons.module';



@NgModule({
    declarations: [CardStepComponent],
    exports: [
        CardStepComponent
    ],
  imports: [
    CommonModule,
    MatExpansionModule,
    IconsModule,
    ButtonsModule
  ]
})
export class CardStepModule { }
