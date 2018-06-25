import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { ENV } from '../../../environments/environment'
import { Subject } from '../../shared/models/subject.model'
import * as actions from '../store/sources/sources.actions'

@Injectable()
export class SourcesService {
  private destroy$: Observable<Action>

  constructor(private http: HttpClient, private actions$: Actions) {
    this.destroy$ = this.actions$.pipe(ofType(actions.DESTROY))
  }

  getAll(studyName, subjectId): Observable<Subject> {
    const url = `${ENV.API_URI}/projects/${studyName}/subjects/${subjectId}`

    return this.http.get<Subject>(url).pipe(takeUntil(this.destroy$))
  }
}
