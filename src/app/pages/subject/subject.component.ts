import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import 'rxjs/add/operator/publishReplay'
import 'rxjs/add/operator/takeUntil'
import { Observable } from 'rxjs/Observable'

import * as fromRoot from '../../shared/store/index'
import * as sourceAction from '../../shared/store/source/source.actions'
import { Source } from '../../shared/store/source/source.model'
import { AppConfig } from '../../shared/utils/config'
import { TakeUntilDestroy } from '../../shared/utils/TakeUntilDestroy'

@Component({
  selector: 'app-patient-page',
  template: `
    <app-toolbar>
      <div start>
        <button [routerLink]="['/study', studyId]" md-icon-button>
          <i class="material-icons">arrow_back</i>
        </button>
        <div class="title">Subject {{subjectId}}</div>
      </div>
      <div end>
        <button md-icon-button><i class="material-icons">more_vert</i></button>
      </div>
    </app-toolbar>
    <div class="content">
      <md-grid-list cols="8" rowHeight="fit">
        <md-grid-tile colspan="2">
          <app-tile title="Sources">
            <app-source-list
              [sources]="sources$ | async" tile-content></app-source-list>
          </app-tile>
        </md-grid-tile>
        <md-grid-tile colspan="6">
          <app-tile title="Graphs">
            <app-source-graphs
              [sources]="sources$ | async"
              [subjectId]="subjectId" tile-content></app-source-graphs>
          </app-tile>
        </md-grid-tile>
      </md-grid-list>
    </div>
  `,
  styleUrls: ['./subject.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@TakeUntilDestroy
export class SubjectPageComponent implements OnInit {

  studyId: string
  subjectId: string
  sources$: Observable<Source[]>
  sourceIsLoaded$: Observable<boolean>

  private takeUntilDestroy

  constructor (
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit () {
    this.route.params
      .takeUntil(this.takeUntilDestroy())
      .subscribe(params => {
        this.studyId = params.studyId
        this.subjectId = params.subjectId
        AppConfig.timeFrame.start = +params.startTime || null
        AppConfig.timeFrame.end = +params.endTime || null
      })

    // Get sources from server
    this.store.dispatch(new sourceAction.GetAll(this.subjectId))
    this.sourceIsLoaded$ = this.store.select(fromRoot.getSourceIsLoaded)
    this.sources$ = this.store.select(fromRoot.getSourceAllWithSensors)
      .publishReplay().refCount()
  }

}
