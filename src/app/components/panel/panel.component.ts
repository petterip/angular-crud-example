import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PanelComponent {
  @ViewChild('sidebarTreeviewInstance')
  public sidebarTreeviewInstance: SidebarComponent;
  public width: string = '290px';
  mediaQuery: string = ('(min-width: 600px)');
  target: string = '.main-content';
  constructor() {
  }

  public data: Object[] = [
    {
      nodeId: '01', nodeText: 'Installation', iconCss: 'icon-microchip icon',
    },
    {
      nodeId: '02', nodeText: 'Deployment', iconCss: 'icon-thumbs-up-alt icon',
    },
    {
      nodeId: '03', nodeText: 'Quick Start', iconCss: 'icon-docs icon',
    },
    {
      nodeId: '09', nodeText: 'FAQ', iconCss: 'icon-help-circled icon'
    },
    {
      nodeId: '10', nodeText: 'License', iconCss: 'icon-doc-text icon'
    }
  ];
  public field: Object = { dataSource: this.data, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'iconCss' };

  // open new tab
  newTabClick(): void {
    let URL = location.href.replace(location.search, '');
    document.getElementById('newTab').setAttribute('href', URL.split('#')[0] + 'sidebar/panel.component');
  }

  openClick() {
    this.sidebarTreeviewInstance.toggle();
  }
};
// open new tab
