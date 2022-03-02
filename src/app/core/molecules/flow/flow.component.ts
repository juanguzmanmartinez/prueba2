import { AfterContentInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

export interface Flow {
  flow: 'done' | 'pending' | 'cancel';
  status: string;
  isCall: boolean;
  info: string;
  infoDetail: string;
  date: string;
  name: string;
}

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements AfterContentInit {

  @Input() data: Flow[] = [];

  @ViewChild('steps') steps: ElementRef;

  private totalWidth;
  private scrollLeft = 0;

  get disablePrevious(): boolean {
    return this.scrollLeft <= 0 || this.totalWidth === 0;
  }

  get disableNext(): boolean {
    return this.scrollLeft >= this.totalWidth;
  }

  @HostListener('window:resize', ['$event']) changeSizeWindow() {
    this.totalWidth = this.steps.nativeElement.scrollWidth - this.steps.nativeElement.offsetWidth;
  }

  constructor() { }

  ngAfterContentInit() {
    setTimeout(() => {
      this.totalWidth = this.steps.nativeElement?.scrollWidth - this.steps.nativeElement.offsetWidth;
    });
  }

  previousStep(): void {
    if (this.scrollLeft >= 0 ) {
      this.steps.nativeElement.scrollLeft -= 190;
      this.scrollLeft -= 190;
    }
  }

  nextStep(): void {
    if (this.scrollLeft <= this.totalWidth) {
      this.steps.nativeElement.scrollLeft += 190;
      this.scrollLeft += 190;
    }
  }

}
