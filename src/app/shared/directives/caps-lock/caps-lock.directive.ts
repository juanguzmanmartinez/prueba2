import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[appCapsLock]'
})
export class CapsLockDirective {

    @Output() appCapsLock = new EventEmitter<boolean>();

    @HostListener('window:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        const capsOn = event.getModifierState && event.getModifierState('CapsLock');
        this.appCapsLock.emit(capsOn);
    }

    @HostListener('window:keyup', ['$event'])
    onKeyUp(event: KeyboardEvent): void {
        const capsOn = event.getModifierState && event.getModifierState('CapsLock');
        this.appCapsLock.emit(capsOn);
    }

}
