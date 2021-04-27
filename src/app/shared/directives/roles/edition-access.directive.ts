import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { EDITION_ACCESS } from '@parameters/router/edition-access-parameter';
import { Router } from '@angular/router';
import { DialogWarningService } from '@molecules/dialog/views/dialog-warning/dialog-warning.service';
import { UserStoreService } from '@stores/user-store.service';

@Directive({
    selector: '[appEditionAccess]'
})
export class EditionAccessDirective implements AfterViewInit {

    private editionAccess = EDITION_ACCESS;
    private hasEditionAccess: boolean;

    @Input() validateAccess = true;
    @Output() access = new EventEmitter();

    constructor(
        private _router: Router,
        public elementRef: ElementRef,
        private renderer: Renderer2,
        private _dialogWarning: DialogWarningService,
        private userStore: UserStoreService,
    ) {
    }

    @HostListener('click', ['$event', '$event.target'])
    public onClick(event: any): void {
        if (!this.hasEditionAccess) {
            event.stopPropagation();
            event.preventDefault();
            this._dialogWarning.open(
                'Lo sentimos, no tienes permiso para editar',
                'Por favor, pídele a un administrador permisos para editar esta configuración.',
                'Entendido'
            );
        } else {
            this.access.emit(event);
        }
    }

    ngAfterViewInit() {
        if (this.validateAccess) {
            const route = Object.keys(this.editionAccess)
                .find((concatRoute) => {
                    return this._router.url.includes(concatRoute);
                });
            const userRoles = route ? this.editionAccess[route] : [];
            this.hasEditionAccess = userRoles.some(role => this.userStore.hasRole(role));
            if (!this.hasEditionAccess) {
                this.renderer.addClass(this.elementRef.nativeElement, 'cursor-pointer');
                this.renderer.addClass(this.elementRef.nativeElement, 'd-inline-block');
            }
        } else {
            this.hasEditionAccess = true;
        }
    }

}
