import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

    @Input() tagStatus: 'error' | 'warning' | 'success';
    @Input() noSpace: boolean;

    constructor() {
    }

    ngOnInit(): void {
    }

}
