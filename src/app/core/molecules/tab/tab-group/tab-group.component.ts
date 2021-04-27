import { AfterViewInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ViewEncapsulation } from '@angular/core';
import { TabComponent } from '@molecules/tab/tab/tab.component';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';

@Component({
    selector: 'app-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrls: ['./tab-group.component.sass'],
    encapsulation: ViewEncapsulation.None
})
export class TabGroupComponent implements OnInit, AfterViewInit {

    @ContentChildren(TabComponent) tabComponentList: QueryList<TabComponent>;

    @Input() selectedIndex = 0;
    @Output() selectTabChange = new EventEmitter<MatTabChangeEvent>();
    @Output() selectIndexChange = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
    }

    selectTabChangeEvent(event: MatTabChangeEvent) {
        this.selectTabChange.emit(event);
    }

    selectIndexChangeEvent(event: number) {
        this.selectIndexChange.emit(event);
    }

}
