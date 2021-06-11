import { NgModule } from '@angular/core';
import { SkeletonCardDirective } from '@molecules/skeleton/directives/skeleton-card/skeleton-card.directive';

@NgModule({
    declarations: [
        SkeletonCardDirective
    ],
    exports: [
        SkeletonCardDirective
    ]
})

export class SkeletonModule {
}
