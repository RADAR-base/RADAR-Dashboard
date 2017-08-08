import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as configAction from './shared/store/config/config.actions'
import * as fromRoot from './shared/store/'
import { AppConfig } from './shared/utils/config'

@Component({
  selector: 'app-root',
  template: `
    <p *ngIf="!(isLoadedConfig$ | async); else pages">Loading...</p>
    <ng-template #pages>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoadedConfig$: Observable<boolean>

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    // Load config from firebase
    this.store.dispatch(new configAction.Load())

    // Wait until load is complete
    this.isLoadedConfig$ = this.store.select(fromRoot.getConfigIsLoaded)

    // Set config to global AppConfig
    this.store
      .select(fromRoot.getConfigState)
      .filter(d => d.isLoaded && d.isValid)
      .take(1)
      .subscribe(config => (AppConfig.config = config))
  }
}
