import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() optionList: Array<any>;
  @Output() optionSelected = new EventEmitter();

  @Input() selectPlaceholder: string;
  @Input() selectClearValue: string;


  @Input() selectFormGroup: FormGroup = new FormGroup({});
  @Input() selectFormControlName = 'select';
  @Input() selectValueControl: any = '';
  @Input() selectRequired: boolean;

  public selectFormControl: FormControl;
  private selectDisabledControl: boolean;


  @Input()
  set selectValue(value: string) {
    if (value && this.selectFormControl) {
      this.selectFormControl.setValue(value);
      this.selectValueControl = value;
    }
  }

  @Input()
  set selectDisabled(condition: boolean) {
    this.selectDisabledControl = !!condition;
    const action = condition ? 'disable' : 'enable';
    if (this.selectFormControl) {
      this.selectFormControl[action]();
    }
  }


  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;
  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    const controlValue = this.setControlValues();
    const controlValidations = this.setControlValidations();
    this.selectFormControl = this._formBuilder.control(
      controlValue,
      controlValidations
    );
    this.selectFormGroup.addControl(this.selectFormControlName, this.selectFormControl);

  }

  get formGroup() {
    return this.selectFormGroup.controls;
  }

  setControlValidations() {
    let controlValidation = [];
    if (this.selectRequired) {
      controlValidation = [...controlValidation, Validators.required];
    }
    return controlValidation;
  }

  setControlValues() {
    let controlValue: any = this.selectValueControl;
    if (this.selectDisabledControl) {
      controlValue = {value: this.selectValueControl, disabled: this.selectDisabledControl};
    }

    return controlValue;
  }

  selectionChange() {
    this.optionSelected.emit(this.selectFormGroup.value[this.selectFormControlName]);
  }
}
