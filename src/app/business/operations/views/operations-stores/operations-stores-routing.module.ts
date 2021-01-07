import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationsStoresComponent } from './operations-stores.component';

const routes: Routes = [
    {path: '', component: OperationsStoresComponent, pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OperationsStoresRoutingModule {
}
