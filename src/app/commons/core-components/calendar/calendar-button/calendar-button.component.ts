import { Component, OnInit, EventEmitter, Input, Output, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-calendar-button',
  templateUrl: './calendar-button.component.html',
  styleUrls: ['./calendar-button.component.scss']
})
export class CalendarButtonComponent implements OnInit {

  @Input() isOutline = false;
  @Input() isFull = false;
  @Input() isContainerFull = false;
  @Input() isDisabled = false;
  @Input() customWidth = '';
  @Input() customColor = '';
  @Input() customBGColor = '';



  @Output() onclick = new EventEmitter();

  constructor(
    private rendered: Renderer2,
  ) { }

  ngOnInit(): void {

    this.settingCustomAttribites();
  }

  private settingCustomAttribites() {
    // if (this.customWidth) {
    //   this.customAttributes.width = this.customWidth;
    // }
    // this.customAttributes.color = this.customColor;
    // this.customAttributes['background-color'] = this.customBGColor;
    // this.customAttributes.border = `1px solid ${this.customColor}`;
  }

  public buttonClick() {
    if (!this.isDisabled) {
      this.onclick.emit();
    }
  }

  public customButtonOver() {
    // this.customAttributes.color = this.customBGColor;
    // this.customAttributes['background-color'] = this.customColor;
    // this.customAttributes.border = `1px solid ${this.customBGColor}`;
  }

  public customButtonOut() {
    this.settingCustomAttribites();
  }
}
