import { Component, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import '@ngrx/core/add/operator/select'
import { Store } from '@ngrx/store'
import 'rxjs/add/operator/switchMap'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

import * as fromRoot from '../../shared/store/index'
import * as studyAction from '../../shared/store/study/study.actions'
import { Study } from '../../shared/store/study/study.model'
import * as subjectAction from '../../shared/store/subject/subject.actions'
import { Subject } from '../../shared/store/subject/subject.model'

@Component({
  selector: 'app-study-page',
  template: `
    <p>Study Page</p>

    <p *ngIf="!isLoaded">Loading...</p>
    <p *ngIf="!isStudyLoadedAndValid && isLoaded">
      Study with ID {{studyId}} not found.
    </p>

    <p *ngIf="isStudyLoadedAndValid && isLoaded">{{ study$ | async | json}}</p>

    <ul *ngIf="isStudyLoadedAndValid && isLoaded">
      <li *ngFor="let subject of (subjects$ | async)">
        <button (click)="navigateToSubject(subject.subjectId)">
          ID: {{ subject.subjectId }} | Active: {{ subject.active }}
        </button>
      </li>
    </ul>
  `,
  styleUrls: ['./study.component.scss']
})
export class StudyPageComponent implements OnDestroy {

  studyId: string
  study$: Observable<Study>
  isStudyLoadedAndValid = false
  isStudyLoadedAndValid$: Subscription
  isLoaded = false
  isLoaded$: Subscription
  subjects$: Observable<Subject[]>

  private route$: Subscription

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>
  ) {
    // Get `studyId` from route and then get Study by `studyId`
    this.route$ = route.params
      .subscribe(params => {
        this.studyId = params['studyId']
      })

    // If study is not loaded and not valid then fetch it
    this.isStudyLoadedAndValid$ = store.select(fromRoot.getStudyIsLoadedAndValid)
      .subscribe(
        (isLoadedAndValid) => {
          this.isStudyLoadedAndValid = isLoadedAndValid
          if (isLoadedAndValid) {
            this.store.dispatch(new subjectAction.GetAll(this.studyId))
          } else {
            this.store.dispatch(new studyAction.GetById(this.studyId))
          }
        }
      )

    // Check if study is loaded
    this.isLoaded$ = store.select(fromRoot.getStudyIsLoaded)
      .subscribe(isLoaded => this.isLoaded = isLoaded)

    // Get selected study
    this.study$ = store.select(fromRoot.getStudySelected)

    // Get subjects
    this.subjects$ = store.select(fromRoot.getSubjectAll)
  }

  navigateToSubject (id) {
    this.router.navigate(['subject', id], { relativeTo: this.route })
  }

  ngOnDestroy () {
    this.route$.unsubscribe()
    this.isStudyLoadedAndValid$.unsubscribe()
    this.isLoaded$.unsubscribe()
  }

}
