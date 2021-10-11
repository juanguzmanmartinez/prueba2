import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from '@guards/app.guard';
import { AuthGuard } from '@guards/auth.guard';
import { CORE_ROUTER } from '@parameters/router/routing/core/core-router.parameter';


const routes: Routes = [
    {
        path: '',
        canActivate: [AppGuard],
        children: [
            {
                path: CORE_ROUTER.base.path,
                loadChildren: () => import('./business/business.module').then(m => m.BusinessModule)
            },
            {
                path: CORE_ROUTER.notFound.path.valueOf(),
                canActivate: [AuthGuard],
                loadChildren: () => import('./core/pages/not-found/not-found.module').then(m => m.NotFoundModule)
            },
            {
                path: CORE_ROUTER.notInternetConnection.path.valueOf(),
                canActivate: [AuthGuard],
                loadChildren: () => import('./core/pages/not-internet-connection/not-internet-connection.module').then(m => m.NotInternetConnectionModule)
            },
            {
                path: CORE_ROUTER.wildcard.path.valueOf(),
                redirectTo: CORE_ROUTER.notFound.path.valueOf()
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
