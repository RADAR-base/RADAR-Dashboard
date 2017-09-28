import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { Subject } from '../../shared/models/subject.model'
import { TakeUntilDestroy } from '../../shared/utils/take-until-destroy'
import * as complianceDataAction from '../store/compliance-data/compliance-data.actions'
import * as studyAction from '../store/study/study.actions'
import * as subjectAction from '../store/subject/subject.actions'
import * as fromStudyPage from '../store'

@Component({
  selector: 'app-study-page',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@TakeUntilDestroy
export class StudyPageComponent implements OnInit {
  studyId: string
  isStudyLoadedAndValid$: Observable<boolean>
  isLoaded$: Observable<boolean>
  subjects$: Observable<Subject[]>
  isComplianceLoaded$: Observable<boolean>
  complianceData$: Observable<any>
  timeHoles = true

  private takeUntilDestroy // from TakeUntilDestroy

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromStudyPage.State>
  ) {}

  ngOnInit() {
    // Get `studyId` from route and then get Study by `studyId`
    this.route.params.takeUntil(this.takeUntilDestroy()).subscribe(params => {
      this.studyId = params['studyId']
      this.store.dispatch(new studyAction.SetStudyId(this.studyId))
    })

    // If study is not loaded and not valid then fetch it
    this.isStudyLoadedAndValid$ = this.store
      .select(fromStudyPage.getStudyIsLoadedAndValid)
      .do(isLoadedAndValid => {
        if (isLoadedAndValid) {
          this.store.dispatch(new subjectAction.Load(this.studyId))
          // Check if compliance is loaded
          this.isComplianceLoaded$ = this.store
            .select(fromStudyPage.getComplianceDataLoaded)
            .do(isComplianceLoaded => {
              if (!isComplianceLoaded) {
                this.store.dispatch(new complianceDataAction.Load(this.studyId))
              }
            })
        } else {
          this.store.dispatch(new studyAction.LoadStudyById(this.studyId))
        }
      })

    // Check if study is loaded
    this.isLoaded$ = this.store.select(fromStudyPage.getStudyIsLoaded)

    this.subjects$ = this.store.select(fromStudyPage.getSubjects)

    // Get compliance data
    this.complianceData$ = this.store.select(fromStudyPage.getComplianceData)
  }
}
