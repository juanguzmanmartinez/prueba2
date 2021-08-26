import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from '@guards/app.guard';
import { ROUTING } from '@parameters/router/routing.parameter';
import { AuthGuard } from '@guards/auth.guard';


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
                path: ROUTING.notFound.valueOf(),
                canActivate: [AuthGuard],
                loadChildren: () => import('./core/pages/not-found/not-found.module').then(m => m.NotFoundModule)
            },
            {
                path: ROUTING.notInternetConnection.valueOf(),
                canActivate: [AuthGuard],
                loadChildren: () => import('./core/pages/not-internet-connection/not-internet-connection.module').then(m => m.NotInternetConnectionModule)
            },
            {
                path: ROUTING.wildcard.valueOf(),
                redirectTo: ROUTING.notFound.valueOf()
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
