import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'

import * as AuthActions from '../../../auth/store/auth.actions'
import * as fromAuth from '../../../auth/store/auth.reducer'

@Component({
  selector: 'app-toolbar',
  template: `
    <mat-toolbar>
      <ng-content select="[start]"></ng-content>
      <span class="fill"></span>
      <ng-content select="[end]"></ng-content>

      <button mat-icon-button [matMenuTriggerFor]="menu">
        <i class="material-icons">more_vert</i>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item (click)="logout()">Logout</button>
        <button mat-menu-item (click)="gotoHelp()">RADAR-base.org</button>
      </mat-menu>
    </mat-toolbar>
  `,
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  constructor(private store: Store<fromAuth.State>) {}

  logout() {
    this.store.dispatch(new AuthActions.Logout())
  }

  gotoHelp() {
    window.open('https://radar-base.org/', '_blank')
  }
}
