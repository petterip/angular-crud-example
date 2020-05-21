import { Component, ViewChild, OnInit } from '@angular/core';
import { ToastComponent as SyncFusionToastComponent } from '@syncfusion/ej2-angular-notifications';

@Component({
  selector: 'app-root',
  template: `<ejs-toast #element (created)="onCreate($event)">
    <ng-template #title>
      <div>Sample Toast Title</div>
    </ng-template>
    <ng-template #content>
      <div>Sample Toast Content</div>
    </ng-template>
  </ejs-toast>`,
})
export class ToastComponent {
  @ViewChild('element') element: SyncFusionToastComponent;

  onCreate(event) {
    this.element.show();
  }

  constructor() {}
}
