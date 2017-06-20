import { Component } from '@angular/core'

@Component({
  selector: 'app-toolbar',
  template: `
    <md-toolbar>
      <ng-content select="[start]"></ng-content>
      <span class="fill"></span>
      <ng-content select="[end]"></ng-content>
    </md-toolbar>
  `,
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {}
