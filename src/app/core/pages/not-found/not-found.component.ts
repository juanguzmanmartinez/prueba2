import { Component, OnInit } from '@angular/core';
import { CONCAT_PATH } from '@parameters/router/concat-path.parameter';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

    public concatPath = CONCAT_PATH;

    constructor() {
    }

    ngOnInit(): void {
    }

}
