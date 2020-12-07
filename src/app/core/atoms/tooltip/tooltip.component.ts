import {Component, Input, OnInit} from '@angular/core';
import {TooltipPosition, TooltipTouchGestures} from '@angular/material/tooltip';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  @Input() tooltipValue = 'tooltip';
  @Input() tooltipClass = '';
  @Input() tooltipPosition: TooltipPosition = 'right';
  @Input() tooltipTouchGestures: TooltipTouchGestures;
  @Input() tooltipShowDelay: number;
  @Input() tooltipHideDelay: number;
  @Input() tooltipDisabled: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
