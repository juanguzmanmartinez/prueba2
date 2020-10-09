import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';

@Component({
  selector: 'app-card-step',
  templateUrl: './card-step.component.html',
  styleUrls: ['./card-step.component.scss']
})
export class CardStepComponent {

  @Input() stepTitle = 'Título';
  @Input() stepDescription: string;
  @Input() stepId: number | string = 1;
  @Input() stepDisabled: boolean;
  @Input() stepEdit: boolean;

  @Input() cancelButtonText = 'Cancelar edición';
  @Input() saveButtonText = 'Guardar cambios';
  @Input() saveButtonDisabled = true;

  @Output() stepOpenEvent = new EventEmitter();
  @Output() stepCloseEvent = new EventEmitter();

  @Output() cancelButtonEvent = new EventEmitter();
  @Output() saveButtonEvent = new EventEmitter();

  @Input('stepExpandedToggle')
  set stepExpandedToggle(expandedToggle: boolean) {
    if (expandedToggle) {
      this.matExpansionPanel.open();
    } else {
      this.matExpansionPanel.close();
    }
  }

  stepExpanded = false;

  @ViewChild(MatExpansionPanel, {static: true}) matExpansionPanel: MatExpansionPanel;

  constructor() {
  }
}
