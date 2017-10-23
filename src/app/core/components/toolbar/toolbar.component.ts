import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-toolbar',
  template: `
    <mat-toolbar>
      <ng-content select="[start]"></ng-content>
      <span class="fill"></span>
      <ng-content select="[end]"></ng-content>
    </mat-toolbar>
  `,
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {}
