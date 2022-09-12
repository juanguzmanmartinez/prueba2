import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-step',
  templateUrl: './card-step.component.html',
  styleUrls: ['./card-step.component.scss'],
})
export class CardStepComponent implements OnInit {
  @Input() title: string = '';
  @Input() icon: string = 'stores';
  @Input() hiddenHeader: boolean = false;
  @Input() innerClass: string = 'w-70';

  @Input() textButtonNext: string = 'Continuar';
  @Input() textButtonCancel: string = 'Cancelar';
  @Input() disableNext: boolean = true;

  @Output() cancel = new EventEmitter<any>();
  @Output() next = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
