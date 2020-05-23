import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @ViewChild('spinner') spinner: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    createSpinner({
      // Specify the target for the spinner to show
      target: this.spinner.nativeElement,
      cssClass: "spinner-wrapper",
      label: "Fetching data ...",
      type: "Bootstrap4"
    });
    showSpinner(this.spinner.nativeElement);
  }

  public hide() {
    hideSpinner(this.spinner.nativeElement)
  }
}
