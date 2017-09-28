import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { Study } from '../../shared/models/study.model'
import * as studyAction from '../store/studies/studies.actions'
import * as fromOverview from '../store/index'

@Component({
  selector: 'app-overview-page',
  template: `
    <app-toolbar>
      <div start>
        <img class="logo" src="assets/radar-logo.svg" alt="RADAR-CNS Logo" >
        <div class="label">
          <div class="font-body-light">RADAR-CNS</div>
          <div class="font-title">Mental Health</div>
        </div>
      </div>
      <div end>
        <button md-icon-button>
          <i class="material-icons">more_vert</i>
        </button>
      </div>
    </app-toolbar>
    <div
      class="content"
      *ngIf="studiesIsLoaded$ | async"
    >
      <div *ngFor="let study of (studies$ | async)">
        <p>
          <button
            md-raised-button
            [routerLink]="['study', study.id]"
          >
            {{ study.name }} - {{ study.id }}
          </button>
        </p>
      </div>
    </div>
  `,
  styleUrls: ['./overview-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewPageComponent implements OnInit {
  studies$: Observable<Study[]>
  studiesIsLoaded$: Observable<boolean>

  constructor(private store: Store<fromOverview.State>) {}

  ngOnInit() {
    this.store.dispatch(new studyAction.Load())
    this.studies$ = this.store.select(fromOverview.getStudies)
    this.studiesIsLoaded$ = this.store.select(fromOverview.getStudiesIsLoaded)
  }
}
