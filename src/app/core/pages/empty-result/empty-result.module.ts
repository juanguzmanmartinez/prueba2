import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from '@atoms/buttons/buttons.module';
import { IconsModule } from '@atoms/icons/icons.module';
import { EmptyResultComponent } from '@pages/empty-result/empty-result.component';

@NgModule({
    declarations: [
        EmptyResultComponent
    ],
    exports: [
        EmptyResultComponent
    ],
    imports: [
        CommonModule,
        ButtonsModule,
        IconsModule,
    ]
})

export class EmptyResultModule {
}
