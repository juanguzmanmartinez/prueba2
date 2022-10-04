import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
// import { DrugStoreServiceStore } from 'app/business/operations/views/operations-capacities/store/drug-store.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class StepComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  private responsiveStep: boolean;
  public collapsedHeight = '72px';

  @Input() stepTitle = 'Título';
  @Input() _stepDescription: string;
  @Input() stepId: number | string = 1;
  @Input() stepDisabled: boolean;
  @Input() stepReadonly: boolean;
  @Input() stepEdit: boolean;

  @Input() cancelButtonText = 'Cancelar edición';
  @Input() saveButtonText = 'Guardar cambios';
  @Input() saveButtonDisabled = true;

  // Edition Access Directive
  @Input() enableAccess = false;
  @Input() pathAccess: string;

  @Output() stepOpenEvent = new EventEmitter();
  @Output() stepCloseEvent = new EventEmitter();

  @Output() cancelButtonEvent = new EventEmitter();
  @Output() saveButtonEvent = new EventEmitter();

  @Input('stepDescription')
  set stepDescription(stepDescription: string) {
    this._stepDescription = stepDescription;
    this.validateCollapsedHeight();
  }

  @Input('stepExpandedToggle')
  set stepExpandedToggle(expandedToggle: boolean) {
    if (expandedToggle) {
      this.matExpansionPanel.open();
    } else {
      this.matExpansionPanel.close();
    }
  }

  stepExpanded = false;

  @ViewChild(MatExpansionPanel, { static: true })
  matExpansionPanel: MatExpansionPanel;

  constructor(
    private _breakpointObserver: BreakpointObserver,
    // public _drugStoreServiceStore: DrugStoreServiceStore
  ) {
    const subscription = this._breakpointObserver
      .observe([`(min-width: 768px)`])
      .subscribe((state) => {
        this.responsiveStep = !state.matches;
        this.validateCollapsedHeight();
      });

    this.subscriptions.push(subscription);
  }

  validateCollapsedHeight() {
    this.collapsedHeight =
      this.responsiveStep && this._stepDescription ? '105px' : '72px';
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
