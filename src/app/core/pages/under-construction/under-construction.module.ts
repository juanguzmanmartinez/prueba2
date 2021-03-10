import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnderConstructionComponent } from './under-construction.component';
import { IconsModule } from '@atoms/icons/icons.module';


@NgModule({
    declarations: [
        UnderConstructionComponent
    ],
    exports: [
        UnderConstructionComponent
    ],
    imports: [
        CommonModule,
        IconsModule,
    ]
})
export class UnderConstructionModule {
}
