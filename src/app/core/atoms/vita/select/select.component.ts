import { Component, ContentChild, EventEmitter, forwardRef, HostListener, Input, Output, TemplateRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ISelectOption } from "@interfaces/vita/select.interface";

@Component({
  selector: "fp-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: ISelectOption[];
  @Output() onChangeOption = new EventEmitter<ISelectOption>();
  @ContentChild(TemplateRef) optionTemplate: TemplateRef<any>;
  selectedOptionTemplate: TemplateRef<any>;

  selectedOption: ISelectOption | undefined;
  showOptions = false;
  isError = false;
  isDisabled = false;
  value: any;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  @HostListener("document:click", ["$event"])
  clickOutside(event: { target: Node | null }) {
    const selectElement = document.querySelector(".custom-select");
    if (!selectElement?.contains(event.target)) {
      this.showOptions = false;
    }
  }

  constructor() {}

  writeValue(value: any): void {
    this.selectedOption = this.options.find((option) => option.value === value);
    this.value = value;
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

  selectOption(option: ISelectOption, optionTemplate: TemplateRef<any>) {
    this.selectedOption = option;
    this.selectedOptionTemplate = optionTemplate;
    this.value = option.value;
    this.showOptions = false;
    this.onChange(this.value);
    this.onTouched();
    this.onChangeOption.emit(option);
  }
}
