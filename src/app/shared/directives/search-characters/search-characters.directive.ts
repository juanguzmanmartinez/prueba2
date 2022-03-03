import { AfterViewInit, Directive, ElementRef, HostListener, Input, } from '@angular/core';

@Directive({
  selector: '[appSearchCharacters]',
})
export class SearchCharactersDirective implements AfterViewInit {

  @Input() alphanumeric = false;

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
    'Paste',
    'Alt',
    'AltLeft',
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
      (e.key === 'x' && e.metaKey === true)    // Allow: Cmd+X (Mac)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (!this.alphanumeric && (e.key === ' ' || isNaN(Number(e.key)))) {
      e.preventDefault();
    }
    // Ensure that it is a number and stop the keypress
    if (
      this.alphanumeric &&
      (
        e.key === ' ' ||
        /[^0-9ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz]/g.test(e.key) ||
        (e.key === 'a' && e.shiftKey === true) ||
        (e.key === 'b' && e.shiftKey === true) ||
        (e.key === 'c' && e.shiftKey === true) ||
        (e.key === 'd' && e.shiftKey === true) ||
        (e.key === 'e' && e.shiftKey === true) ||
        (e.key === 'f' && e.shiftKey === true) ||
        (e.key === 'g' && e.shiftKey === true) ||
        (e.key === 'h' && e.shiftKey === true) ||
        (e.key === 'i' && e.shiftKey === true) ||
        (e.key === 'j' && e.shiftKey === true) ||
        (e.key === 'k' && e.shiftKey === true) ||
        (e.key === 'l' && e.shiftKey === true) ||
        (e.key === 'm' && e.shiftKey === true) ||
        (e.key === 'n' && e.shiftKey === true) ||
        (e.key === 'o' && e.shiftKey === true) ||
        (e.key === 'p' && e.shiftKey === true) ||
        (e.key === 'q' && e.shiftKey === true) ||
        (e.key === 'r' && e.shiftKey === true) ||
        (e.key === 's' && e.shiftKey === true) ||
        (e.key === 't' && e.shiftKey === true) ||
        (e.key === 'u' && e.shiftKey === true) ||
        (e.key === 'v' && e.shiftKey === true) ||
        (e.key === 'w' && e.shiftKey === true) ||
        (e.key === 'x' && e.shiftKey === true) ||
        (e.key === 'y' && e.shiftKey === true) ||
        (e.key === 'z' && e.shiftKey === true)
      )
    ) {
      e.preventDefault();
    }
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(e: KeyboardEvent) {
    if (
      this.navigationKeys.indexOf(e.code) > -1 // Allow: navigation keys: backspace, delete, arrows etc.
    ) {
      // let it happen, don't do anything
      return false;
    }
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
    const regexNumber = /[^0-9]/g;
    const regexAlphanumeric = /[^0-9ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz]/g;

    if (this.alphanumeric) {
      pasted = document.execCommand(
        'insertText',
        false,
        textData.replace(regexAlphanumeric, '')
      );
    } else {
      pasted = document.execCommand(
        'insertText',
        false,
        textData.replace(regexNumber, '')
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

}
