import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-not-search-result',
    templateUrl: './not-search-result.component.html',
    styleUrls: ['./not-search-result.component.scss']
})
export class NotSearchResultComponent implements OnInit {
    @Input() keyword: string;

    constructor() {
    }

    ngOnInit(): void {
    }

}
