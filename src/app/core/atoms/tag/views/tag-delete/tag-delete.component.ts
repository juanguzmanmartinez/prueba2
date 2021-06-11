import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ETag, ETagAppearance } from '@models/tag/tag.model';

@Component({
    selector: 'app-tag-delete',
    templateUrl: './tag-delete.component.html',
    styleUrls: ['./tag-delete.component.scss']
})
export class TagDeleteComponent implements OnInit {

    public tagAppearance = ETagAppearance;

    @Input() tagColor: ETag | string;
    @Output() delete = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

    deleteTagEvent() {
        this.delete.emit();
    }

    get tagTextColor() {
        return this.tagColor ? `dark-${this.tagColor}` : 'gray-6';
    }

}
