import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import '@ngrx/core/add/operator/select'
import { Store } from '@ngrx/store'
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
    <p>Study Page</p>

    <p *ngIf="!isLoaded">Loading...</p>

    <ng-container *ngIf="isStudyLoadedAndValid && isLoaded">
      <p>{{ study$ | async | json}}</p>
      <ul>
        <li *ngFor="let subject of (subjects$ | async)">
          <button (click)="navigateToSubject(subject.subjectId)">
            ID: {{ subject.subjectId }} | Active: {{ subject.active }}
          </button>
        </li>
      </ul>
    </ng-container>

    <p *ngIf="!isStudyLoadedAndValid && isLoaded">
      Study with ID {{studyId}} not found.
    </p>
  `,
  styleUrls: ['./study.component.scss']
})
@TakeUntilDestroy
export class StudyPageComponent implements OnInit {

  takeUntilDestroy // from TakeUntilDestroy
  studyId: string
  study$: Observable<Study>
  isStudyLoadedAndValid = false
  isLoaded = false
  subjects$: Observable<Subject[]>

  constructor (
    private router: Router,
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
    this.store.select(fromRoot.getStudyIsLoadedAndValid)
      .takeUntil(this.takeUntilDestroy())
      .subscribe(
        (isLoadedAndValid) => {
          this.isStudyLoadedAndValid = !!isLoadedAndValid
          if (isLoadedAndValid) {
            this.store.dispatch(new subjectAction.GetAll(this.studyId))
          } else {
            this.store.dispatch(new studyAction.GetById(this.studyId))
          }
        }
      )

    // Check if study is loaded
    this.store.select(fromRoot.getStudyIsLoaded)
      .takeUntil(this.takeUntilDestroy())
      .subscribe(isLoaded => this.isLoaded = !!isLoaded)

    this.study$ = this.store.select(fromRoot.getStudySelected)
    this.subjects$ = this.store.select(fromRoot.getSubjectAll)
  }

  navigateToSubject (id) {
    this.router.navigate(['subject', id], { relativeTo: this.route })
  }

}
