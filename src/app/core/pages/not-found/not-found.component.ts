import { Component, OnInit } from '@angular/core';
import { ROUTER_PATH } from '@parameters/router/router-path.parameter';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

    public concatPath = ROUTER_PATH;

    constructor() {
    }

    ngOnInit(): void {
    }

}
