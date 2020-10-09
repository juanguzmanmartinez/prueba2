import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepsComponent } from './steps.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {IconsModule} from '../../core-components/icons/icons.module';
import {ButtonsModule} from '../../core-components/buttons/buttons.module';



@NgModule({
    declarations: [StepsComponent],
    exports: [
        StepsComponent
    ],
  imports: [
    CommonModule,
    MatExpansionModule,
    IconsModule,
    ButtonsModule
  ]
})
export class StepsModule { }
