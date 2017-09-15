import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as complianceAction from '../../shared/store/compliance/compliance.actions'
import * as studyAction from '../../shared/store/study/study.actions'
import * as subjectAction from '../../shared/store/subject/subject.actions'
import { Subject } from '../../shared/store/subject/subject.model'
import * as fromRoot from '../../shared/store/index'
import { TakeUntilDestroy } from '../../shared/utils/take-until-destroy'

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
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    // Get `studyId` from route and then get Study by `studyId`
    this.route.params.takeUntil(this.takeUntilDestroy()).subscribe(params => {
      this.studyId = params['studyId']
      this.store.dispatch(new studyAction.SetSelectedId(this.studyId))
    })

    // If study is not loaded and not valid then fetch it
    this.isStudyLoadedAndValid$ = this.store
      .select(fromRoot.getStudyIsLoadedAndValid)
      .do(isLoadedAndValid => {
        if (isLoadedAndValid) {
          this.store.dispatch(new subjectAction.GetAll(this.studyId))
          this.store.dispatch(new complianceAction.GetAll(this.studyId))
        } else {
          this.store.dispatch(new studyAction.GetById(this.studyId))
        }
      })

    // Check if study is loaded
    this.isLoaded$ = this.store.select(fromRoot.getStudyIsLoaded)

    this.subjects$ = this.store.select(fromRoot.getSubjectAll)

    // Check if compliance is loaded
    this.isComplianceLoaded$ = this.store.select(fromRoot.getComplianceIsLoaded)

    this.complianceData$ = this.store.select(fromRoot.getComplianceData)
  }
}
