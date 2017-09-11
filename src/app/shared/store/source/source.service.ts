import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as actions from './source.actions'
import { Source } from './source.model'

@Injectable()
export class SourceService {
  private destroy$: Observable<Action>

  constructor(private http: HttpClient, private actions$: Actions) {
    this.destroy$ = this.actions$.ofType(actions.DESTROY)
  }

  getAll(subjectId): Observable<Source[]> {
    const url = `${PARAMS.API_URI}/source/getAllSources/${subjectId}`

    return this.http
      .get<any>(url)
      .take(1)
      .takeUntil(this.destroy$)
      .filter(d => d !== null)
      .map(res => res.sources)
      .map(this.removeNonSupportedTypes)
  }

  // TODO: remove filter when API and data are ready
  removeNonSupportedTypes(res) {
    return res.filter((d: Source) => d.type === 'EMPATICA')
  }
}
