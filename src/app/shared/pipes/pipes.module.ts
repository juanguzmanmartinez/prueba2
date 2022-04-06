import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '@pipes/safe-url.pipe';
import { NombrePipe } from './nombre.pipe';


@NgModule({
    declarations: [
        SafeUrlPipe,
        NombrePipe,
    ],
    exports: [
        SafeUrlPipe,
        NombrePipe
    ],
    imports: [
        CommonModule
    ]
})
export class PipesModule {
}
