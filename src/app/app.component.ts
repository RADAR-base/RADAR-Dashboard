import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as fromRoot from './shared/store/'
import * as configAction from './shared/store/config/config.actions'
import { AppConfig } from './shared/utils/config'

@Component({
  selector: 'app-root',
  template: `
    <p *ngIf="isLoadingConfig$ | async; else pages">Loading...</p>
    <ng-template #pages>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoadingConfig$: Observable<boolean>

  constructor (
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit () {
    // Load config from firebase
    this.store.dispatch(new configAction.Load())

    // Wait until load is complete
    this.isLoadingConfig$ = this.store.select(fromRoot.getConfigLoading)

    // Set config to global AppConfig
    this.store.select(fromRoot.getConfigState)
      .subscribe(config => AppConfig.config = config)
  }
}
