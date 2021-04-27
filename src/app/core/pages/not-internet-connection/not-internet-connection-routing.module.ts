import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotInternetConnectionComponent } from '@pages/not-internet-connection/not-internet-connection.component';

const routes: Routes = [
    {path: '', component: NotInternetConnectionComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotInternetConnectionRoutingModule {
}
