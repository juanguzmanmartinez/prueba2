import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';

@Component({
  selector: 'app-card-step',
  templateUrl: './card-step.component.html',
  styleUrls: ['./card-step.component.scss']
})
export class CardStepComponent implements OnInit {

  @Input() stepTitle = 'Título';
  @Input() stepDescription: string;
  @Input() stepId: number | string = 1;
  @Input() stepDisabled: boolean;
  @Input() stepEdit: boolean;

  @Input() cancelButtonText = 'Cancelar edición';
  @Input() saveButtonText = 'Guardar cambios';
  @Input() saveButtonDisabled = true;

  @Output() cancelButtonEvent = new EventEmitter();
  @Output() saveButtonEvent = new EventEmitter();

  @Input() stepExpandedToggle: boolean;

  stepClose = true;

  @ViewChild(MatExpansionPanel) matExpansionPanel: MatExpansionPanel;

  constructor() {
  }

  ngOnInit(): void {
  }

}
