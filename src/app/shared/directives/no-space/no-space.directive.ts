import { Directive, EventEmitter, HostListener, Input, Output, Self } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { SPACE } from '@angular/cdk/keycodes';

@Directive({
  selector: '[appNoSpace]'
})
export class NoSpaceDirective {

  @Input() enableNoSpace = false;

  @Output() spacekeydown = new EventEmitter<any>();

  @HostListener('window:keyup', ['$event'])
  onKeyUp(): void {
    this.listenSpace();
  }

  constructor(
    @Self() private select: MatSelect
  ) { }

  private listenSpace(): void {
    if (this.enableNoSpace) {
      this.select._handleKeydown = (event: KeyboardEvent) => {
        if (event.keyCode === SPACE) {
          const active = this.select.panelOpen ?
            this.select.options.filter(x => x.active)[0] || null :
            null;
          this.spacekeydown.emit(active ? active.value : null);
        } else {
          if (!this.select.disabled) {
            this.select.panelOpen
              ? (this.select as any)._handleOpenKeydown(event)
              : (this.select as any)._handleClosedKeydown(event);
          }
        }
      };
    }
  }

}
