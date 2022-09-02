import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() fontName: string;
  @Input() fontColor: string;
  @Input() fontSize: '16px' | '24px' | '32px' | '48px' | string = '16px';
  @Input() fontStyle: 'round' | 'outlined' | 'sharp' | 'two-tone' | '' =
    'round';

  @Input() svgName: string;
  @Input() svgNameHover: string;
  @Input() svgWidth: '16px' | '24px' | '32px' | '48px' | string = '16px';
  @Input() svgHeight: '16px' | '24px' | '32px' | '48px' | string;

  @Input() innerClass: string;

  public showSvgIcon: boolean;

  constructor() {
    this.showSvgIcon = true;
  }

  get fontStyleClass() {
    return this.fontStyle
      ? `material-icons-${this.fontStyle}`
      : 'material-icons';
  }

  onMouseEnter(): void {
    this.showSvgIcon = false;
  }

  onMouseLeave(): void {
    this.showSvgIcon = true;
  }

  toogleSvgIconOrHover(): string {
    if (this.showSvgIcon || (!this.showSvgIcon && !this.svgNameHover)) {
      return this.svgName;
    }

    if (!this.showSvgIcon && this.svgNameHover) {
      return this.svgNameHover;
    }
    // return this.showSvgIcon ? this.svgName : this.svgNameHover;
  }
}
