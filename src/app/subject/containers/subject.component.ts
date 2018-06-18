import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Dictionary } from '@ngrx/entity/src/models'
import { Store, select } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { DescriptiveStatistic } from '../../shared/enums/descriptive-statistic.enum'
import { TimeInterval } from '../../shared/enums/time-interval.enum'
import { Source } from '../../shared/models/source.model'
import { TakeUntilDestroy } from '../../shared/utils/take-until-destroy'
import * as pagesActions from '../../store/pages/pages.actions'
import { SensorsData } from '../models/sensors-data.model'
import * as fromSubjectPage from '../store/index'
import * as sensorsDataActions from '../store/sensors-data/sensors-data.actions'
import * as sourcesActions from '../store/sources/sources.actions'
import * as subjectActions from '../store/subject/subject.actions'

@Component({
  selector: 'app-subject-page',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@TakeUntilDestroy
export class SubjectComponent implements OnInit, OnDestroy {
  sources: Source[]
  studyId: string
  subjectId: string
  sources$: Subscription
  sourceIsLoaded$: Observable<boolean>
  dates$: Observable<Date[]>
  sensorsIsDataLoaded$: any
  sensorsData$: Observable<Dictionary<SensorsData>>

  private takeUntilDestroy

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromSubjectPage.State>
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.takeUntilDestroy()))
      .subscribe(params => {
        this.studyId = params.studyId
        this.subjectId = params.subjectId

        this.store.dispatch(new subjectActions.SetStudyId(this.studyId))
        this.store.dispatch(new subjectActions.SetId(this.subjectId))
      })

    // TODO: move whole block to Volume||Brush component -->
    this.store.dispatch(
      new sensorsDataActions.SetTimeInterval(TimeInterval.TEN_SECOND)
    )
    this.store.dispatch(
      new sensorsDataActions.SetDescriptiveStatistic(
        DescriptiveStatistic.AVERAGE
      )
    )
    const endTimeFrame = 1497628000000
    const endMinusOneday = new Date(endTimeFrame).setDate(
      new Date(endTimeFrame).getDate() - 0.45
    )
    this.store.dispatch(
      new sensorsDataActions.SetTimeFrame({
        start: endMinusOneday,
        end: endTimeFrame
      })
    )
    // <-- end

    // Get sources from server
    this.store.dispatch(new sourcesActions.Load(this.subjectId))
    this.sourceIsLoaded$ = this.store.select(fromSubjectPage.getSourcesLoaded)
    this.sources$ = this.store
      .pipe(
        select(fromSubjectPage.getSourcesWithSensors),
        takeUntil(this.takeUntilDestroy())
      )
      .subscribe(sources => (this.sources = sources))

    // Get sensor data from server
    this.sensorsIsDataLoaded$ = this.store.select(
      fromSubjectPage.getSensorsDataLoaded
    )
    this.sensorsData$ = this.store.select(
      fromSubjectPage.getSensorsDataEntities
    )

    // Dates for Volume Graph
    this.dates$ = this.store.select(fromSubjectPage.getSensorsDates)
  }

  ngOnDestroy() {
    this.store.dispatch(new pagesActions.SubjectDestroy())
  }
}
