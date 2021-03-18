import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
    declarations: [
        TooltipComponent
    ],
    exports: [
        TooltipComponent
    ],
    imports: [
        CommonModule,
        MatTooltipModule
    ]
})
export class TooltipModule {
}
