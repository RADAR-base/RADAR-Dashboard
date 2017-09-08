import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

import * as fromRoot from '../../shared/store/index'
import * as sensorsAction from '../../shared/store/sensors/sensors.actions'
import {
  DescriptiveStatistic,
  TimeInterval
} from '../../shared/store/sensors/sensors.model'
import * as sourceAction from '../../shared/store/source/source.actions'
import { Source } from '../../shared/store/source/source.model'
import * as studyAction from '../../shared/store/study/study.actions'
import * as subjectAction from '../../shared/store/subject/subject.actions'
import { TakeUntilDestroy } from '../../shared/utils/TakeUntilDestroy'

@Component({
  selector: 'app-patient-page',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@TakeUntilDestroy
export class SubjectPageComponent implements OnInit, OnDestroy {
  sources: Source[]
  studyId: string
  subjectId: string
  sources$: Subscription
  sourceIsLoaded$: Observable<boolean>
  dates$: Observable<Date[]>
  sensorsIsDataLoaded$: any
  sensorsData$: any

  private takeUntilDestroy

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.route.params.takeUntil(this.takeUntilDestroy()).subscribe(params => {
      this.studyId = params.studyId
      this.subjectId = params.subjectId

      this.store.dispatch(new studyAction.SetSelectedId(this.studyId))
      this.store.dispatch(new subjectAction.SetSelectedId(this.subjectId))
    })

    // TODO: move whole block to Volume||Brush component -->
    this.store.dispatch(
      new sensorsAction.SetTimeInterval(TimeInterval.TEN_SECOND)
    )
    this.store.dispatch(
      new sensorsAction.SetDescriptiveStatistic(DescriptiveStatistic.AVERAGE)
    )
    const endTimeFrame = 1497689980000
    const endMinusOneday = new Date(endTimeFrame).setDate(
      new Date(endTimeFrame).getDate() - 1
    )
    this.store.dispatch(
      new sensorsAction.SetTimeFrame({
        start: endMinusOneday,
        end: endTimeFrame
      })
    )
    // <-- end

    // Get sources from server
    this.store.dispatch(new sourceAction.GetAll(this.subjectId))
    this.sourceIsLoaded$ = this.store.select(fromRoot.getSourceIsLoaded)
    this.sources$ = this.store
      .select(fromRoot.getSourceAllWithSensors)
      .takeUntil(this.takeUntilDestroy())
      .subscribe(sources => (this.sources = sources))

    // Get sensor data from server
    this.sensorsIsDataLoaded$ = this.store.select(
      fromRoot.getSensorsIsDataLoaded
    )
    this.sensorsData$ = this.store.select(fromRoot.getSensorsData)

    this.dates$ = this.store
      .select(fromRoot.getSensorsDates)
  }

  ngOnDestroy() {
    this.store.dispatch(new sensorsAction.Destroy())
  }
}
