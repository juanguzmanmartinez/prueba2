import { Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { DOCUMENT } from '@angular/common';
import { DocumentListener } from '../../../shared/listeners/document.listener';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.sass'],
    encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnDestroy {
    @Input() backdropClass: string;
    @Input() hasBackdrop = true;
    @Input() panelClass: string;
    @Input() actions: 'click' | 'hover' = 'click';
    @Output() menuOpened: EventEmitter<void> = new EventEmitter<void>();
    @Output() menuClosed: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild('menu', {static: true}) public menu: MatMenu;
    @ViewChild('menuTrigger', {static: true}) public menuTrigger: MatMenuTrigger;
    private documentSubscription: Subscription;
    @ViewChild('menuContainer', {read: ElementRef, static: true}) private menuElement: ElementRef;
    @ViewChild('menuTrigger', {read: ElementRef, static: true}) private menuTriggerElement: ElementRef;


    constructor(
        @Inject(DOCUMENT) private document: Document,
        private _documentListener: DocumentListener
    ) {
    }

    menuOpenedEvent() {
        this.menuOpened.emit();
        if (this.actions === 'hover') {
            this.detectMouseoverOutside();
        }
    }

    menuClosedEvent() {
        this.menuClosed.emit();
        if (this.actions === 'hover' && !this.documentSubscription?.closed) {
            this.documentSubscription?.unsubscribe();
        }
    }


    mouseEnterEvent() {
        if (this.actions === 'hover') {
            this.menuTrigger.openMenu();
        }
    }


    detectMouseoverOutside() {
        this.documentSubscription = this._documentListener.mouseover$.subscribe((eventTarget) => {
            const menuContainer = this.menuElement?.nativeElement?.parentElement?.parentElement;
            const menuTriggerContainer = this.menuTriggerElement?.nativeElement;
            if (!menuContainer.contains(eventTarget) && !menuTriggerContainer.contains(eventTarget)) {
                this.menuTrigger.closeMenu();
            }
        });
    }


    ngOnDestroy(): void {
        if (!this.documentSubscription?.closed) {
            this.documentSubscription?.unsubscribe();
        }
    }
}
