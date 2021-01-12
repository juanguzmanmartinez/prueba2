import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-form-field-label',
    templateUrl: './form-field-label.component.html',
    styleUrls: ['./form-field-label.component.scss']
})
export class FormFieldLabelComponent {

    constructor(
        public elementRef: ElementRef,
        private renderer: Renderer2
    ) {
    }

    errorField(): void {
        this.renderer.addClass(this.elementRef.nativeElement, 'text-danger');
    }

    removeErrorField(): void {
        this.renderer.removeClass(this.elementRef.nativeElement, 'text-danger');

    }
}
