import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {


  @Input() stepTitle = 'Título';
  @Input() stepDescription: string;
  @Input() stepId: number | string = 1;
  @Input() stepDisabled: boolean;
  @Input() stepEdit: boolean;

  @Input() cancelButtonText = 'Cancelar edición';
  @Input() saveButtonText = 'Guardar cambios';
  @Input() saveDisabled = true;
  @Output() cancelStepEvent = new EventEmitter();
  @Output() saveStepEvent = new EventEmitter();

  stepClose = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
