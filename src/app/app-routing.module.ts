import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from '@guards/app.guard';
import { BUSINESS_PATH } from '@parameters/router/routing-module-path.parameter';


const routes: Routes = [
    {
        path: '',
        canActivate: [AppGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('./business/business.module').then(m => m.BusinessModule)
            },
            {
                path: BUSINESS_PATH.notFound.valueOf(),
                loadChildren: () => import('./core/pages/not-found/not-found.module').then(m => m.NotFoundModule)
            },
            {
                path: BUSINESS_PATH.notInternetConnection.valueOf(),
                loadChildren: () => import('./core/pages/not-internet-connection/not-internet-connection.module').then(m => m.NotInternetConnectionModule)
            },
            {
                path: BUSINESS_PATH.wildcard.valueOf(),
                redirectTo: BUSINESS_PATH.notFound.valueOf()
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
