import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as sensorsAction from '../../shared/store/sensors/sensors.actions'
import * as sourceAction from '../../shared/store/source/source.actions'
import { Source } from '../../shared/store/source/source.model'
import * as fromRoot from '../../shared/store/index'
import { AppConfig } from '../../shared/utils/config'
import { TakeUntilDestroy } from '../../shared/utils/TakeUntilDestroy'

@Component({
  selector: 'app-patient-page',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@TakeUntilDestroy
export class SubjectPageComponent implements OnInit, OnDestroy {
  studyId: string
  subjectId: string
  sources$: Observable<Source[]>
  sourceIsLoaded$: Observable<boolean>
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
      AppConfig.timeFrame.start = +params.startTime || null
      AppConfig.timeFrame.end = +params.endTime || null
    })

    // Get sources from server
    this.store.dispatch(new sourceAction.GetAll(this.subjectId))
    this.sourceIsLoaded$ = this.store.select(fromRoot.getSourceIsLoaded)
    this.sources$ = this.store.select(fromRoot.getSourceAllWithSensors)

    // Get sensor data from server
    this.sensorsIsDataLoaded$ = this.store.select(
      fromRoot.getSensorsIsDataLoaded
    )
    this.sensorsData$ = this.store.select(fromRoot.getSensorsData)
  }

  ngOnDestroy() {
    this.store.dispatch(new sensorsAction.Destroy())
  }
}
