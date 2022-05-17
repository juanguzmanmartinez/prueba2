import { Component, Input, OnInit } from '@angular/core';
import { ADMINISTRATOR_ROUTER } from '@parameters/router/routing/administrator/administrator-router.parameter';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-sidenav-administrator',
    templateUrl: './sidenav-administrator.component.html',
    styleUrls: ['./sidenav-administrator.component.sass']
})
export class SidenavAdministratorComponent implements OnInit {

    public routerPath = ROUTER_PATH;
    public sidenavRouting = ADMINISTRATOR_ROUTER;
    @Input() sidenav: MatSidenav;

    constructor() {
    }

    ngOnInit(): void {
    }

}
