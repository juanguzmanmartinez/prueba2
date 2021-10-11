import { Component, OnInit } from '@angular/core';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Component({
    selector: 'app-sidenav-home',
    templateUrl: './sidenav-home.component.html',
    styleUrls: ['./sidenav-home.component.sass']
})
export class SidenavHomeComponent implements OnInit {

    public routerPath = ROUTER_PATH;

    constructor() {
    }

    ngOnInit(): void {
    }

}
