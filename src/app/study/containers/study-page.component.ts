import { HttpClient } from '@angular/common/http'
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { map, publishReplay, refCount } from 'rxjs/operators'

import { ENV } from '../../../environments/environment'
import { Study } from '../../shared/models/study.model'
import { Subject } from '../../shared/models/subject.model'
import * as fromRoot from '../../store'
import { SubjectService } from '../services/subject.service'
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

  appVersions$: Observable<any>
  appResets$: Observable<any>
  appRemoves$: Observable<any>
  questionnairesFinished$: Observable<any>

  constructor(
    private store: Store<fromRoot.State>,
    private subjectService: SubjectService
  ) {}

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

    this.loadAnalytics()
  }

  loadAnalytics() {
    this.study$.subscribe(study => {
      if (study) {
        const project = study.projectName
        this.appResets$ = this.subjectService.getAppResets(project)
        this.appVersions$ = this.subjectService.getAppVersions(project)
        this.appRemoves$ = this.subjectService.getAppRemoves(project)
        this.questionnairesFinished$ = this.subjectService.getQuestionnairesFinished(
          project
        )
      }
    })
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
