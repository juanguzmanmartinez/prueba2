import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { EDITION_ACCESS } from '@parameters/router/edition-access-parameter';
import { Router } from '@angular/router';
import { DialogEditionAccessService } from '@molecules/dialog/views/dialog-edition-access/dialog-edition-access.service';
import { UserStoreService } from '@stores/user-store.service';

@Directive({
    selector: '[appEditionAccess]'
})
export class EditionAccessDirective implements OnInit {

    private editionAccess = EDITION_ACCESS;
    private hasEditionAccess: boolean;

    @Input() validateAccess = true;

    constructor(
        private _router: Router,
        public elementRef: ElementRef,
        private renderer: Renderer2,
        private _dialogEditionAccess: DialogEditionAccessService,
        private userStore: UserStoreService,
    ) {
    }

    @HostListener('click', ['$event', '$event.target'])
    public onClick(event: any): void {
        if (!this.hasEditionAccess) {
            event.stopPropagation();
            event.preventDefault();
            this._dialogEditionAccess.open();
        }
    }

    ngOnInit() {
        if (this.validateAccess) {
            const route = Object.keys(this.editionAccess)
                .find((concatRoute) => {
                    return this._router.url.includes(concatRoute);
                });
            const userRoles = route ? this.editionAccess[route] : [];
            this.hasEditionAccess = userRoles.some(role => this.userStore.hasRole(role));
            if (!this.hasEditionAccess) {
                this.renderer.addClass(this.elementRef.nativeElement, 'cursor-pointer');
                this.renderer.addClass(this.elementRef.nativeElement.firstChild, 'pointer-events-none');
            }
        } else {
            this.hasEditionAccess = true;
        }
    }

}
