import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as fromRoot from '../../shared/store/index'
import * as studyAction from '../../shared/store/study/study.actions'
import * as subjectAction from '../../shared/store/subject/subject.actions'
import { Subject } from '../../shared/store/subject/subject.model'
import { TakeUntilDestroy } from '../../shared/utils/TakeUntilDestroy'

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

  private takeUntilDestroy // from TakeUntilDestroy

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    // Get `studyId` from route and then get Study by `studyId`
    this.route.params.takeUntil(this.takeUntilDestroy()).subscribe(params => {
      this.studyId = params['studyId']
    })

    // If study is not loaded and not valid then fetch it
    this.isStudyLoadedAndValid$ = this.store
      .select(fromRoot.getStudyIsLoadedAndValid)
      .do(isLoadedAndValid => {
        if (isLoadedAndValid) {
          this.store.dispatch(new subjectAction.GetAll(this.studyId))
        } else {
          this.store.dispatch(new studyAction.GetById(this.studyId))
        }
      })
      .publishReplay()
      .refCount()

    // Check if study is loaded
    this.isLoaded$ = this.store
      .select(fromRoot.getStudyIsLoaded)
      .publishReplay()
      .refCount()

    this.subjects$ = this.store.select(fromRoot.getSubjectAll)
  }
}
