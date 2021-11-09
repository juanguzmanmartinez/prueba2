import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-sidenav-route',
    templateUrl: './sidenav-route.component.html',
    styleUrls: ['./sidenav-route.component.sass'],
    encapsulation: ViewEncapsulation.None
})
export class SidenavRouteComponent implements OnInit {


    @Input() routeText: string;
    @Input() routePath: string[] | string;
    @Input() routeIcon: string;
    @Input() routePathOptions: { exact: boolean } = {exact: true};


    constructor() {
    }

    ngOnInit(): void {
    }

}
