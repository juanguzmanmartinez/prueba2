import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '@pipes/safe-url.pipe';


@NgModule({
    declarations: [
        SafeUrlPipe,
    ],
    exports: [
        SafeUrlPipe
    ],
    imports: [
        CommonModule
    ]
})
export class PipesModule {
}
