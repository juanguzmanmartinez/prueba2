import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DialogOneActionService } from '@molecules/dialog/views/dialog-one-action/dialog-one-action.service';
import { UserStoreService } from '@stores/user-store.service';
import { Role } from '@parameters/auth/role.parameter';
import { ROUTER_PERMISSIONS } from '@parameters/router/router-permissions.parameter';
import { PathPermissions } from '@models/auth/permissions.model';

@Directive({
    selector: '[editionAccess][pathAccess]'
})
export class EditionAccessDirective implements AfterViewInit {

    @Input() enableAccess = true;
    private hasEditionAccess: boolean;
    @Input() pathAccess: string;
    @Output() editionAccess = new EventEmitter();
    private editorRole = Role.Editor;
    private pathPermissions = ROUTER_PERMISSIONS;

    constructor(
        private _router: Router,
        public elementRef: ElementRef,
        private renderer: Renderer2,
        private _dialogOneAction: DialogOneActionService,
        private userStore: UserStoreService,
    ) {
    }

    @HostListener('click', ['$event', '$event.target'])
    public onClick(event: any): void {
        if (!this.hasEditionAccess) {
            event.stopPropagation();
            event.preventDefault();
            this._dialogOneAction.openWarning({
                    title: 'Lo sentimos, no tienes permiso para editar',
                    description: 'Por favor, pídele a un administrador permisos para editar esta configuración.',
                    action: 'Entendido'
                }
            );
        } else {
            this.editionAccess.emit(event);
        }
    }

    ngAfterViewInit() {
        if (this.enableAccess) {
            const pathPermissions: PathPermissions = this.pathAccess ? this.pathPermissions[this.pathAccess] : null;
            const hasAccessByRole = this.userStore.hasAccessByRole(this.editorRole, pathPermissions?.access);
            const pathPermissionCanEdit = !!pathPermissions.roles.find((role) => role === this.editorRole);

            this.hasEditionAccess = !!hasAccessByRole && !!pathPermissionCanEdit;
            if (!this.hasEditionAccess) {
                this.renderer.addClass(this.elementRef.nativeElement, 'cursor-pointer');
                this.renderer.addClass(this.elementRef.nativeElement, 'd-inline-block');
            }
        } else {
            this.hasEditionAccess = true;
        }
    }

}
