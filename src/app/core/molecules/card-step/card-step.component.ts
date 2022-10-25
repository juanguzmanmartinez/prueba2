import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-step',
  templateUrl: './card-step.component.html',
  styleUrls: ['./card-step.component.scss'],
})
export class CardStepComponent implements OnInit {
  @Input() title: string = '';
  @Input() titleCard: string = '';
  @Input() icon: string = 'stores';
  @Input() hiddenHeader: boolean = false;
  @Input() innerClass: string = 'w-70';

  @Input() disableCancel: boolean = false;
  @Input() disableNext: boolean = false;

  @Input() textButtonNext: string = 'Continuar';
  @Input() textButtonCancel: string = 'Cancelar';

  @Output() cancel = new EventEmitter<any>();
  @Output() next = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
