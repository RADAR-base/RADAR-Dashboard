import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { Dictionary } from '@ngrx/entity/src/models'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { SensorsData } from '../../shared/models/sensors-data.model'
import { Source } from '../../shared/models/source.model'
import { Subject } from '../../shared/models/subject.model'
import { TimeFrame } from '../../shared/models/time.model'
import * as fromRoot from '../../store'
import * as fromSubject from '../store'
import * as sourceTypeActions from '../store/source-types/source-types.actions'
import * as sourcesActions from '../store/sources/sources.actions'

@Component({
  selector: 'app-subject-page',
  templateUrl: './subject-page.component.html',
  styleUrls: ['./subject-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectPageComponent implements OnInit, OnDestroy {
  studyName$: Observable<string>
  subjectId$: Observable<string>
  subject$: Observable<Subject>
  sources$: Observable<Source[]>
  sourceIsLoaded$: Observable<boolean>
  sensorsIsDataLoaded$: Observable<Dictionary<boolean>>
  sensorsData$: Observable<Dictionary<SensorsData>>
  sensorsDataTimeFrame$: Observable<TimeFrame>
  sensorsDataTimeInterval$: Observable<any>
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
    this.sensorsDataTimeInterval$ = this.store.select(
      fromSubject.getSensorsDataTimeInterval
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

  ngOnDestroy() {
    this.store.dispatch(new sourcesActions.Destroy())
    this.store.dispatch(new sourceTypeActions.Destroy())
  }
}
