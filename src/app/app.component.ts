import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import * as fromRoot from './shared/store/'
import * as configAction from './shared/store/config/config.actions'

@Component({
  selector: 'app-root',
  template: `
    <app-toolbar></app-toolbar>
    <div class="app-content">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor (
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit () {
    this.store.dispatch(new configAction.Load())
  }
}
