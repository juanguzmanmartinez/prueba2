import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardActionComponent } from './components/card-action/card-action.component';
import { CardRadioComponent } from './components/card-radio/card-radio.component';
import { IconsModule } from '@atoms/icons/icons.module';
import { RadioModule } from '@atoms/radio/radio.module';
import { FormsModule } from '@angular/forms';
import { CardStaticInformationComponent } from './components/card-static-information/card-static-information.component';
import { CardComponent } from '@molecules/cards/components/card/card.component';
import { CardEditButtonDirective } from '@molecules/cards/directives/card-edit-button/card-edit-button.directive';
import { CardAddButtonDirective } from '@molecules/cards/directives/card-add-button/card-add-button.directive';

const DECLARATIONS = [
    CardComponent,
    CardActionComponent,
    CardRadioComponent,
    CardStaticInformationComponent,
    CardEditButtonDirective,
    CardAddButtonDirective
];

@NgModule({
    declarations: [
        ...DECLARATIONS
    ],
    exports: [
        ...DECLARATIONS
    ],
    imports: [
        CommonModule,
        IconsModule,
        RadioModule,
        FormsModule
    ]
})
export class CardModule {
}
