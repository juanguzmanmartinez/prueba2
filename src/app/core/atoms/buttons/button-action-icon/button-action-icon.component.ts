import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-action-icon[iconName]',
  templateUrl: './button-action-icon.component.html',
  styleUrls: ['./button-action-icon.component.scss'],
})
export class ButtonActionIconComponent {
  @Input() iconName: string;
  @Input() svgName: string;
  @Input() svgWidth: '16px' | '24px' | '32px' | '48px' | string = '16px';
  @Input() svgHeight: '16px' | '24px' | '32px' | '48px' | string;
  @Input() iconStyle: 'whole' | 'edge' | 'edge-table' = 'whole';
  @Input() innerClass = '';
  @Input() inlineStyle: { [klass: string]: any } | null;
  @Input() disabled = false;
  @Output() clicked = new EventEmitter();
}
