import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { ENV } from '../../../../environments/environment'
import { Source } from '../models/subject.model'
import * as actions from '../store/sources/sources.actions'

@Injectable()
export class SourcesService {
  private destroy$: Observable<Action>

  constructor(private http: HttpClient, private actions$: Actions) {
    this.destroy$ = this.actions$.ofType(actions.DESTROY)
  }

  getAll(subjectId): Observable<Source[]> {
    const url = `${ENV.PARAMS.API_URI}/source/getAllSources/${subjectId}`

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
