import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs'
import { filter, map, take, takeUntil } from 'rxjs/operators'

import { ENV } from '../../../environments/environment'
import { Source } from '../../shared/models/source.model'
import * as actions from '../store/sources/sources.actions'

@Injectable()
export class SourcesService {
  private destroy$: Observable<Action>

  constructor(private http: HttpClient, private actions$: Actions) {
    this.destroy$ = this.actions$.pipe(ofType(actions.DESTROY))
  }

  getAll(subjectId): Observable<Source[]> {
    const url = `${ENV.API_URI}/source/getAllSources/${subjectId}`

    return this.http.get<any>(url).pipe(
      filter(d => d !== null),
      map(res => res.sources),
      map(this.removeNonSupportedTypes),
      takeUntil(this.destroy$),
      take(1)
    )
  }

  // TODO: remove filter when API and data are ready
  removeNonSupportedTypes(res) {
    return res.filter((d: Source) => d.type === 'EMPATICA')
  }
}
