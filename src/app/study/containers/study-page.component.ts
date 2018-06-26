import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { publishReplay, refCount, tap } from 'rxjs/operators'

import { Study } from '../../shared/models/study.model'
import { Subject } from '../../shared/models/subject.model'
import * as fromRoot from '../../store'
import * as fromStudyPage from '../store'
import * as studyAction from '../store/study/study.actions'
import * as subjectsAction from '../store/subjects/subjects.actions'

@Component({
  selector: 'app-study-page',
  templateUrl: './study-page.component.html',
  styleUrls: ['./study-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyPageComponent implements OnInit {
  study$: Observable<Study>
  isLoaded$: Observable<boolean>
  subjects$: Observable<Subject[]>
  subjectsLoaded$: Observable<boolean>

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.study$ = this.store.pipe(
      select(fromStudyPage.getStudy),
      publishReplay(1),
      refCount()
    )

    this.store.dispatch(new studyAction.Load())
    this.store.dispatch(new subjectsAction.Load())

    this.isLoaded$ = this.store.select(fromStudyPage.getStudyIsLoaded)
    this.subjects$ = this.store.select(fromStudyPage.getSubjects)
    this.subjectsLoaded$ = this.store.select(fromStudyPage.getSubjectsLoaded)
  }
}
