import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SidebarComponent, NodeClickEventArgs, TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PanelComponent {
  @ViewChild('tree') tree: TreeViewComponent;
  @ViewChild('sidebarTreeviewInstance')
  public sidebarTreeviewInstance: SidebarComponent;
  public width = '290px';
  mediaQuery: string = ('(min-width: 600px)');
  target = '.main-content';
  constructor() {
  }

  public data: Object[] = [
    { nodeId: 1, nodeText: 'Home', iconCss: 'icon-th icon', url: '/' },
    { nodeId: 2, nodeText: 'Project GitHub', iconCss: 'icon-code icon', url: 'https://github.com/petterip/angular-crud-example' },
    { nodeId: 3, nodeText: 'API Docs', iconCss: 'icon-doc-text icon', url: 'https://patient-repository-api.herokuapp.com' },
    { nodeId: 4, nodeText: 'API GitHub', iconCss: 'icon-microchip icon', url: 'https://github.com/petterip/patient-repository-api' },
    { nodeId: 5, nodeText: 'Author', iconCss: 'icon-help-circled icon', url: 'http://linkedin.com/in/petterip' },
    { nodeId: 6, nodeText: 'License', iconCss: 'icon-doc-text icon', url: 'http://github.com' }
  ];
  public field: Object = { dataSource: this.data, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'iconCss', selected: 'selected' };

  // Open in new tab
  newTabClick(): void {
    const URL = location.href.replace(location.search, '');
    document.getElementById('newTab').setAttribute('href', URL.split('#')[0] + 'sidebar/panel.component');
  }

  // Open a link in new tab based on the seleced node
  nodeSelected(args: NodeClickEventArgs): void {
    const data: any = this.tree.getTreeData(args.node);
    const url = data[0].url;

    if (url.indexOf('http') === 0) {
      // If a node has a prefix of 'http', open it in a new tab
      window.open(url, '_blank');
    } else {
      // .. otherwise open it in the current window
      window.location.href = url;
    }
  }

  // Toggle sidebar between opened and closed
  openClick() {
    this.sidebarTreeviewInstance.toggle();
  }
}
