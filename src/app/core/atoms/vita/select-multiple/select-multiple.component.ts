import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISelectOption } from '@interfaces/vita/select.interface';

@Component({
  selector: 'fp-select-multiple',
  templateUrl: './select-multiple.component.html',
  styleUrls: ['./select-multiple.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectMultipleComponent),
      multi: true,
    },
  ],
})
export class SelectMultipleComponent implements ControlValueAccessor {
  @Input() options: ISelectOption[];
  @Input() error: boolean = false;
  @Input() errorMessage: string;
  @Output() onChangeOption = new EventEmitter<ISelectOption[]>();
  @ContentChild(TemplateRef) optionTemplate: TemplateRef<any>;
  selectedOptionTemplate: TemplateRef<any>;

  selectedOptions: ISelectOption[] | undefined;
  showOptions = false;
  isDisabled = false;
  value: any;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  @HostListener('document:click', ['$event'])
  clickOutside(event: { target: Node | null }) {
    const selectElement = this.elementRef.nativeElement;
    if (!selectElement?.contains(event.target)) {
      this.showOptions = false;
    }
  }

  get textOthersSelected() {
    if (this.selectedOptions.length === 2) {
      return `${this.selectedOptions[0].label} (Otro más)`;
    }

    return `${this.selectedOptions[0].label} (Otros ${
      this.selectedOptions.length - 1
    } más)`;
  }

  constructor(private elementRef: ElementRef) {
    this.selectedOptions = [];
  }

  writeValue(value: any[]): void {
    this.selectedOptions = value || [];
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  // selectOption(option: ISelectOption, optionTemplate: TemplateRef<any>) {
  //   this.selectedOption = option;
  //   this.selectedOptionTemplate = optionTemplate;
  //   this.value = option.value;
  //   this.showOptions = false;
  //   this.onChange(this.value);
  //   this.onTouched();
  //   this.onChangeOption.emit(option);
  // }

  toggleOption(option: any, isChecked: boolean) {
    if (isChecked) {
      this.selectedOptions.push(option);
    } else {
      const index = this.selectedOptions.indexOf(option);
      if (index >= 0) {
        this.selectedOptions.splice(index, 1);
      }
    }
    this.onChangeOption.emit(this.selectedOptions);
    this.onChange(this.selectedOptions);
    this.onTouched();
  }

  isSelected(option: any) {
    return this.selectedOptions.find(
      (optionOfList) => optionOfList.value === option.value
    );
  }
}
