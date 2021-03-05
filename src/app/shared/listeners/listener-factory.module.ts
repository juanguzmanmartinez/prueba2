import { ModuleWithProviders, NgModule } from '@angular/core';
import { DocumentListener } from './document.listener';

@NgModule()
export class ListenerFactoryModule {

    static forRoot(): ModuleWithProviders<any> {

        return {

            ngModule: ListenerFactoryModule,

            providers: [
                {
                    provide: DocumentListener,
                    useClass: DocumentListener
                },
            ]

        };

    }
}
