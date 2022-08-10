import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-static-information',
  templateUrl: './card-static-information.component.html',
  styleUrls: ['./card-static-information.component.scss'],
})
export class CardStaticInformationComponent implements OnInit {
  @Input() iconName: string;
  @Input() svgName: string;
  @Input() svgWidth: string;
  @Input() disabled: boolean;
  @Input() truncate: boolean;

  constructor() {}

  ngOnInit(): void {}
}
