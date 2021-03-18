import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appDigitsOnly]'
})
export class DigitsOnlyDirective implements AfterViewInit {
    @Input() decimal ? = false;

    private decimalCounter = 0;
    private navigationKeys = [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        'Home',
        'End',
        'ArrowLeft',
        'ArrowRight',
        'Clear',
        'Copy',
        'Paste'
    ];
    private inputElement: HTMLInputElement;

    constructor(public elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        if (this.elementRef.nativeElement.tagName === 'INPUT') {
            this.inputElement = this.elementRef.nativeElement;
        } else {
            const input = this.elementRef.nativeElement.querySelector('input');
            if (input) {
                this.inputElement = input;
            }
        }
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(e: KeyboardEvent) {
        if (
            this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
            (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
            (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
            (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
            (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
            (e.key === 'a' && e.metaKey === true) || // Allow: Cmd+A (Mac)
            (e.key === 'c' && e.metaKey === true) || // Allow: Cmd+C (Mac)
            (e.key === 'v' && e.metaKey === true) || // Allow: Cmd+V (Mac)
            (e.key === 'x' && e.metaKey === true) || // Allow: Cmd+X (Mac)
            (this.decimal && e.key === '.' && this.decimalCounter < 1) // Allow: only one decimal point
        ) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if (e.key === ' ' || isNaN(Number(e.key))) {
            e.preventDefault();
        }
    }

    @HostListener('keyup', ['$event'])
    onKeyUp() {
        if (!this.decimal) {
            return;
        }
        this.decimalCounter = this.elementRef.nativeElement.value.split('.').length - 1;
    }

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent) {
        const textData: string = event.clipboardData.getData('text/plain');
        this.validateTextOnEvent(event, textData);

    }

    @HostListener('drop', ['$event'])
    onDrop(event: any) {
        const textData = event.dataTransfer.getData('text');
        this.inputElement.focus();

        this.validateTextOnEvent(event, textData);
    }

    validateTextOnEvent(event: any, textData: string): void {
        let pasted = false;
        if (!this.decimal) {
            pasted = document.execCommand(
                'insertText',
                false,
                textData.replace(/[^0-9]/g, '')
            );
        } else if (this.isValidDecimal(textData)) {
            pasted = document.execCommand(
                'insertText',
                false,
                textData.replace(/[^0-9.]/g, '')
            );
        }
        if (pasted) {
            event.preventDefault();
        } else {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textData);
                document.execCommand('paste');
            }
        }
    }

    isValidDecimal(decimal: string): boolean {
        return decimal.split('.').length <= 2;
    }
}
