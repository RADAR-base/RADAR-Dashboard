import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Dictionary } from '@ngrx/entity/src/models'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { SensorsData } from '../../shared/models/sensors-data.model'
import { Source } from '../../shared/models/source.model'
import { Subject } from '../../shared/models/subject.model'
import * as fromRoot from '../../store'
import * as fromSubject from '../store/index'
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
  dates$: Observable<Date[]>
  sensorsIsDataLoaded$: any
  sensorsData$: Observable<Dictionary<SensorsData>>

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

    // Dates for Volume Graph

    this.dates$ = this.store.select(fromSubject.getSensorsDataDates)

    // TODO: move whole block to Volume||Brush component -->
    // this.store.dispatch(
    //   new sensorsDataActions.SetTimeInterval(TimeInterval.TEN_SECOND)
    // )
    // this.store.dispatch(
    //   new sensorsDataActions.SetDescriptiveStatistic(
    //     DescriptiveStatistic.AVERAGE
    //   )
    // )
    // const endTimeFrame = 1497628000000
    // const endMinusOneday = new Date(endTimeFrame).setDate(
    //   new Date(endTimeFrame).getDate() - 0.45
    // )
    // this.store.dispatch(
    //   new sensorsDataActions.SetTimeFrame({
    //     start: endMinusOneday,
    //     end: endTimeFrame
    //   })
    // )
    // <-- end
  }
}
