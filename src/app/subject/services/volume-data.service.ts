import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { ENV } from '../../../environments/environment'
import { Source } from '../../shared/models/source.model'
import { Subject } from '../../shared/models/subject.model'
import * as actions from '../store/sources/sources.actions'

@Injectable()
export class VolumeDataService {
  private destroy$: Observable<Action>
  private temp_timeWindow = 'ONE_DAY'
  private endTime = '2018-02-27T14:00:00Z'
  private startTime = '2017-02-27T12:00:00Z'

  constructor(private http: HttpClient, private actions$: Actions) {
    this.destroy$ = this.actions$.pipe(ofType(actions.DESTROY))
  }

  getData(sources: any, studyName, subjectId): Observable<any> {
    const url = `${
      ENV.API_URI
    }/aggregate/${studyName}/${subjectId}/distinct?endTime=${
      this.endTime
    }&startTime=${this.startTime}`

    const source_arr = new Array()

    for (const key of Object.keys(sources)) {
      const k = new Array()
      for (const data of Object.keys(sources[key].sourceData)) {
        k.push({ name: sources[key].sourceData[data].sourceDataName })
      }
      source_arr.push({ sourceId: sources[key].sourceId, sourceData: k })
    }

    return this.http
      .post<any>(url, JSON.stringify({ sources: source_arr }), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(takeUntil(this.destroy$))
  }
}
