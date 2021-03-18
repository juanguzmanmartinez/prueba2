import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserStoreService } from '@stores/user-store.service';
import { TokenStoreService } from '@stores/token-store.service';

@NgModule()
export class StoreFactoryModule {

    static forRoot(): ModuleWithProviders<any> {

        return {

            ngModule: StoreFactoryModule,

            providers: [
                {
                    provide: UserStoreService,
                    useClass: UserStoreService
                },
                {
                    provide: TokenStoreService,
                    useClass: TokenStoreService
                }
            ]

        };

    }
}
