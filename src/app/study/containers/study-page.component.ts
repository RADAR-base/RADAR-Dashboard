import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { publishReplay, refCount } from 'rxjs/operators'

import { Study } from '../../shared/models/study.model'
import { Subject } from '../../shared/models/subject.model'
import * as fromRoot from '../../store'
import * as fromStudyPage from '../store'
import * as complianceDataActions from '../store/compliance-data/compliance-data.actions'
import * as studyActions from '../store/study/study.actions'
import * as subjectsActions from '../store/subjects/subjects.actions'

@Component({
  selector: 'app-study-page',
  templateUrl: './study-page.component.html',
  styleUrls: ['./study-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyPageComponent implements OnInit, OnDestroy {
  subject: Subject = null
  study$: Observable<Study>
  isLoaded$: Observable<boolean>
  subjects$: Observable<Subject[]>
  subjectsLoaded$: Observable<boolean>
  complianceData$: Observable<any>
  isComplianceLoaded$: Observable<boolean>

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.study$ = this.store.pipe(
      select(fromStudyPage.getStudy),
      publishReplay(1),
      refCount()
    )

    this.store.dispatch(new studyActions.Load())
    this.store.dispatch(new subjectsActions.Load())

    this.isLoaded$ = this.store.select(fromStudyPage.getStudyIsLoaded)
    this.subjects$ = this.store.select(fromStudyPage.getSubjects)
    this.subjectsLoaded$ = this.store.select(fromStudyPage.getSubjectsLoaded)
    this.complianceData$ = this.store.select(fromStudyPage.getComplianceData)
    this.isComplianceLoaded$ = this.store.select(
      fromStudyPage.getComplianceDataLoaded
    )
  }

  ngOnDestroy() {
    this.store.dispatch(new complianceDataActions.Destroy())
    this.store.dispatch(new subjectsActions.Destroy())
  }

  openSubjectHandler(subject) {
    this.subject = subject
  }

  closeSubjectHandler() {
    this.subject = null
  }

  refreshSubjectTable() {
    this.store.dispatch(new subjectsActions.Load())
    this.closeSubjectHandler()
  }
}
