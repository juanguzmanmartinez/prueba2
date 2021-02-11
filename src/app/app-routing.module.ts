import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { AppGuard } from '@guards/app.guard';
import { BUSINESS_PATH } from '@parameters/router/router-path.parameter';


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
                component: NotFoundComponent,
                pathMatch: 'full'
            },
            {
                path: BUSINESS_PATH.wildcard.valueOf(),
                redirectTo: BUSINESS_PATH.notFound.valueOf()
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
