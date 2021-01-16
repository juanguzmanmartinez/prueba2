import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardActionComponent } from './card-action/card-action.component';
import { CardRadioComponent } from './card-radio/card-radio.component';
import { IconsModule } from '@atoms/icons/icons.module';
import { RadioModule } from '@atoms/radio/radio.module';
import { FormsModule } from '@angular/forms';
import { CardStaticInformationComponent } from './card-static-information/card-static-information.component';


@NgModule({
  declarations: [
    CardActionComponent,
    CardRadioComponent,
    CardStaticInformationComponent
  ],
    exports: [
        CardActionComponent,
        CardRadioComponent,
        CardStaticInformationComponent
    ],
  imports: [
    CommonModule,
    IconsModule,
    RadioModule,
    FormsModule
  ]
})
export class CardModule { }
