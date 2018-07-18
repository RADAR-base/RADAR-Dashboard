import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Dictionary } from '@ngrx/entity/src/models'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { SensorsData } from '../../shared/models/sensors-data.model'
import { Source } from '../../shared/models/source.model'
import { Subject } from '../../shared/models/subject.model'
import { TimeFrame } from '../../shared/models/time.model'
import * as fromRoot from '../../store'
import * as fromSubject from '../store'
import * as sourcesActions from '../store/sources/sources.actions'

@Component({
  selector: 'app-subject-page',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectComponent implements OnInit {
  studyName$: Observable<string>
  subjectId$: Observable<string>
  subject$: Observable<Subject>
  sources$: Observable<Source[]>
  sourceIsLoaded$: Observable<boolean>
  sensorsIsDataLoaded$: Observable<any>
  sensorsData$: Observable<Dictionary<SensorsData>>
  sensorsDataTimeFrame$: Observable<TimeFrame>
  volumeData$: Observable<Dictionary<any>>
  volumeIsDataLoaded$: Observable<boolean>
  volumeTimeFrame$: Observable<any>

  constructor(private store: Store<fromSubject.State>) {}

  ngOnInit() {
    this.studyName$ = this.store.select(fromRoot.getRouterParamsStudyName)
    this.subjectId$ = this.store.select(fromRoot.getRouterParamsSubjectId)

    this.subject$ = this.store.select(fromSubject.getSourcesSubject)

    // Get sources from server
    this.store.dispatch(new sourcesActions.Load())

    this.sourceIsLoaded$ = this.store.select(fromSubject.getSourcesLoaded)
    this.sources$ = this.store.select(fromSubject.getSources)

    // Get sensor data from server
    this.sensorsData$ = this.store.select(fromSubject.getSensorsDataEntities)
    this.sensorsIsDataLoaded$ = this.store.select(
      fromSubject.getSensorsDataLoaded
    )
    this.sensorsDataTimeFrame$ = this.store.select(
      fromSubject.getSensorsDataTimeFrame
    )

    // Get volume data from server
    this.volumeData$ = this.store.select(fromSubject.getVolumeDataFormatted)
    this.volumeIsDataLoaded$ = this.store.select(
      fromSubject.getVolumeDataLoaded
    )
    this.volumeTimeFrame$ = this.store.select(
      fromSubject.getVolumeDataTimeFrame
    )
  }
}
