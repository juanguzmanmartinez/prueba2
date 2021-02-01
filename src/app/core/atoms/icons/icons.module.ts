import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from './icons.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    declarations: [IconsComponent],
    imports: [
        CommonModule,
        MatIconModule,
    ],
    exports: [
        IconsComponent
    ]
})
export class IconsModule {
}
