import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { IconsModule } from '@atoms/icons/icons.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { DirectivesModule } from '../../../shared/directives/directives.module';
import { StepTabsComponent } from './step-tabs.component';

@NgModule({
  declarations: [StepTabsComponent],
  exports: [StepTabsComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    IconsModule,
    ButtonsModule,
    DirectivesModule,
  ],
})
export class StepTabsModule {}
