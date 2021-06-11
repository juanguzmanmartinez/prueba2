import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorViewerComponent } from './http-error-viewer.component';
import { GenericErrorModule } from '@pages/generic-error/generic-error.module';
import { TimeoutErrorModule } from '@pages/timeout-error/timeout-error.module';


@NgModule({
    declarations: [
        HttpErrorViewerComponent
    ],
    exports: [
        HttpErrorViewerComponent
    ],
    imports: [
        CommonModule,
        GenericErrorModule,
        TimeoutErrorModule,
    ]
})
export class HttpErrorViewerModule {
}
