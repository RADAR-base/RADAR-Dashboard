import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import 'rxjs/add/operator/withLatestFrom'
import { Observable } from 'rxjs/Observable'

import * as fromRoot from '../../shared/store/index'
import * as studyAction from '../../shared/store/study/study.actions'
import * as subjectAction from '../../shared/store/subject/subject.actions'
import { Subject } from '../../shared/store/subject/subject.model'

@Component({
  selector: 'app-study-page',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyPageComponent implements OnInit {

  studyId: string
  isStudyLoadedAndValid$: Observable<boolean>
  isLoaded$: Observable<boolean>
  subjects$: Observable<Subject[]>

  constructor (
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit () {

    // If study is not loaded and not valid then fetch it
    this.isStudyLoadedAndValid$ = this.store.select(fromRoot.getStudyIsLoadedAndValid)
      .withLatestFrom(this.route.params)
      .do(([isLoadedAndValid, params]) => {
        if (isLoadedAndValid) {
          this.store.dispatch(new subjectAction.GetAll(params.studyId))
        } else {
          this.store.dispatch(new studyAction.GetById(params.studyId))
        }
      })
      .map(([isLoadedAndValid, params]) => isLoadedAndValid)
      .publishReplay().refCount()

    // Check if study is loaded
    this.isLoaded$ = this.store.select(fromRoot.getStudyIsLoaded)
      .publishReplay().refCount()

    this.subjects$ = this.store.select(fromRoot.getSubjectAll)
  }

}
