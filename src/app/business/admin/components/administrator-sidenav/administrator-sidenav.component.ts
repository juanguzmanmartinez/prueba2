import { Component } from '@angular/core';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Component({
    selector: 'app-administrator-sidenav',
    templateUrl: './administrator-sidenav.component.html',
    styleUrls: ['./administrator-sidenav.component.scss']
})
export class AdministratorSidenavComponent {

    _sidenavTitle = 'Administrador';
    innerSidenavExpanded: boolean;
    public routerPath = ROUTER_PATH;

    constructor() {
    }

    operationsInnerSidenavOpened(expanded: boolean) {
        this.innerSidenavExpanded = expanded;
    }

    get sidenavTitle() {
        return this.innerSidenavExpanded ?
            this._sidenavTitle : this._sidenavTitle.slice(0, 2);
    }
}
