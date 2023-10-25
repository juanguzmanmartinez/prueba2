import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { IconsModule } from '@atoms/icons/icons.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { DirectivesModule } from '../../../shared/directives/directives.module';
import { CardStepComponent } from './card-step.component';

@NgModule({
  declarations: [CardStepComponent],
  exports: [CardStepComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    IconsModule,
    ButtonsModule,
    DirectivesModule,
  ],
})
export class CardStepModule {}
