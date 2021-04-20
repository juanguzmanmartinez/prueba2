import { Component, Input, OnInit } from '@angular/core';
import { ETag, ETagAppearance, TTagAppearance } from '@models/tag/tag.model';

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

    public tagAppearance = ETagAppearance;

    @Input() tagColor: ETag | string;
    @Input() appearance: TTagAppearance = ETagAppearance.transparentPill;

    constructor() {
    }

    ngOnInit(): void {
    }

}
