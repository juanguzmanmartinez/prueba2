import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion-information',
  templateUrl: './accordion-information.component.html',
  styleUrls: ['./accordion-information.component.scss']
})
export class AccordionInformationComponent {
  @Input() svgName: string;
  @Input() svgSize: '16px' | '24px' | '32px' | '48px' = '24px';
  @Input() title: string;

  @Input() expanded = false;

  constructor() { }

}
