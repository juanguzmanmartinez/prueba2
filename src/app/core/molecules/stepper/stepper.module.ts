import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepComponent } from './step/step.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { IconsModule } from '@atoms/icons/icons.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';


@NgModule({
  declarations: [
    StepComponent
  ],
  exports: [
    StepComponent,
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    IconsModule,
    ButtonsModule
  ]
})
export class StepperModule {
}
