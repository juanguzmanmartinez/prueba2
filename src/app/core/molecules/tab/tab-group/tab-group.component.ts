import { AfterViewInit, Component, ContentChildren, OnInit, QueryList, ViewEncapsulation } from '@angular/core';
import { TabComponent } from '@molecules/tab/tab/tab.component';

@Component({
    selector: 'app-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrls: ['./tab-group.component.sass'],
    encapsulation: ViewEncapsulation.None
})
export class TabGroupComponent implements OnInit, AfterViewInit {

    @ContentChildren(TabComponent) tabComponentList: QueryList<TabComponent>;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
    }

}
