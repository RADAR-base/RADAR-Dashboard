import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import '@ngrx/core/add/operator/select'
import { Store } from '@ngrx/store'
import 'rxjs/add/operator/publishReplay'
import 'rxjs/add/operator/share'
import 'rxjs/add/operator/takeUntil'
import { Observable } from 'rxjs/Observable'

import * as fromRoot from '../../shared/store/index'
import * as studyAction from '../../shared/store/study/study.actions'
import { Study } from '../../shared/store/study/study.model'
import * as subjectAction from '../../shared/store/subject/subject.actions'
import { Subject } from '../../shared/store/subject/subject.model'
import { TakeUntilDestroy } from '../../shared/utils/TakeUntilDestroy'

@Component({
  selector: 'app-study-page',
  template: `
    <app-toolbar>
      <div start>
        <button [routerLink]="['/']" md-icon-button>
          <i class="material-icons">arrow_back</i>
        </button>
        <div class="title">Study {{studyId}}</div>
      </div>
      <div end>
        <button md-icon-button><i class="material-icons">more_vert</i></button>
      </div>
    </app-toolbar>
    <div class="content">
      <p *ngIf="!(isLoaded$ | async)">Loading...</p>
      <ng-container *ngIf="isStudyLoadedAndValid$ && isLoaded$ | async">
        <p>{{ study$ | async | json}}</p>
        <p *ngFor="let subject of (subjects$ | async)">
          <button [routerLink]="['subject', subject.subjectId]" md-raised-button>
            ID: {{ subject.subjectId }} | Active: {{ subject.active }}
          </button>
        </p>
      </ng-container>
      <div *ngIf="!(isStudyLoadedAndValid$ | async) && (isLoaded$ | async)">
        <p>Study "{{studyId}}" not found.</p>
        <p>
          <button [routerLink]="['/']">Go to the overview page</button>
        </p>
      </div>
    </div>
  `,
  styleUrls: ['./study.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@TakeUntilDestroy
export class StudyPageComponent implements OnInit {

  studyId: string
  study$: Observable<Study>
  isStudyLoadedAndValid$: Observable<boolean>
  isLoaded$: Observable<boolean>
  subjects$: Observable<Subject[]>

  private takeUntilDestroy // from TakeUntilDestroy

  constructor (
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit () {
    // Get `studyId` from route and then get Study by `studyId`
    this.route.params
      .takeUntil(this.takeUntilDestroy())
      .subscribe(params => {
        this.studyId = params['studyId']
      })

    // If study is not loaded and not valid then fetch it
    this.isStudyLoadedAndValid$ = this.store.select(fromRoot.getStudyIsLoadedAndValid)
      .do(isLoadedAndValid => {
        if (isLoadedAndValid) {
          this.store.dispatch(new subjectAction.GetAll(this.studyId))
        } else {
          this.store.dispatch(new studyAction.GetById(this.studyId))
        }
      })
      .publishReplay().refCount()

    // Check if study is loaded
    this.isLoaded$ = this.store.select(fromRoot.getStudyIsLoaded)
      .publishReplay().refCount()

    this.study$ = this.store.select(fromRoot.getStudySelected)
    this.subjects$ = this.store.select(fromRoot.getSubjectAll)
  }

}
