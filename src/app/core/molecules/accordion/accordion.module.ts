import { NgModule } from '@angular/core';
import { AccordionInformationComponent } from './accordion-information/accordion-information.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { IconsModule } from '@atoms/icons/icons.module';
import { TooltipModule } from '@atoms/tooltip/tooltip.module';
import { ButtonsModule } from '@atoms/buttons/buttons.module';

const DECLARATIONS = [
  AccordionInformationComponent
];

@NgModule({
  declarations: [
    ...DECLARATIONS
  ],
  imports: [
    MatExpansionModule,
    IconsModule,
    TooltipModule,
    ButtonsModule
  ],
  exports: [
    ...DECLARATIONS
  ]
})
export class AccordionModule {
}
