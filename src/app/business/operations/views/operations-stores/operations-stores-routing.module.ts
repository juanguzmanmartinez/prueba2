import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsStoresComponent } from './operations-stores.component';
import { OperationsStoresHomeComponent } from './views/operations-stores-home/operations-stores-home.component';

const routes: Routes = [
    {
        path: '', component: OperationsStoresComponent, children: [
            {path: '', component: OperationsStoresHomeComponent, pathMatch: 'full'}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OperationsStoresRoutingModule {
}
