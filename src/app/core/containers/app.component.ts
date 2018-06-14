import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'

import { ConfigService } from '../services/config.service'

@Component({
  selector: 'app-root',
  template: `
    <div class="loading"
      *ngIf="(isLoadedConfig$ | async) === false; else pages">Loading...</div>
    <ng-template #pages>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoadedConfig$: Observable<boolean>

  constructor(private config: ConfigService) {}

  ngOnInit() {
    this.config.load()
    this.isLoadedConfig$ = this.config.isLoaded$
  }
}
