import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotSupportedComponent } from '@pages/not-supported/not-supported.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { AppGuard } from '@guards/app.guard';


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
                path: 'sin-soporte',
                component: NotSupportedComponent,
                pathMatch: 'full'
            },
            {
                path: '**',
                component: NotFoundComponent,
                pathMatch: 'full'
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
