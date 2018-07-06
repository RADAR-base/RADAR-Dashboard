import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { ENV } from '../../../environments/environment'
import { DescriptiveStatistic } from '../../shared/enums/descriptive-statistic.enum'
import { Source } from '../../shared/models/source.model'
import { Subject } from '../../shared/models/subject.model'
import * as volumeDataActions from '../store/volume-data/volume-data.actions'

@Injectable()
export class VolumeDataService {
  private url = `${ENV.API_URI}/aggregate`
  private destroy$: Observable<Action>
  private endTime = '2018-04-27T14:00:00Z'
  private startTime = '2017-04-27T12:00:00Z'

  constructor(private http: HttpClient, private actions$: Actions) {
    this.destroy$ = this.actions$.pipe(ofType(volumeDataActions.DESTROY))
  }

  getData(
    studyName,
    subjectId,
    descriptiveStatistic,
    sources: any
  ): Observable<any> {
    const new_sources = new Array()

    for (const key of Object.keys(sources)) {
      const new_sourcedata = new Array()
      for (const data of Object.keys(sources[key].sourceData)) {
        new_sourcedata.push({
          name: sources[key].sourceData[data].sourceDataName
        })
      }
      new_sources.push({
        sourceId: sources[key].sourceId,
        sourceData: new_sourcedata
      })
    }

    return this.http
      .post<any>(
        this.parseURL(studyName, subjectId, descriptiveStatistic),
        JSON.stringify({ sources: new_sources }),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }
      )
      .pipe(takeUntil(this.destroy$))
  }

  private parseURL(studyName, subjectId, descriptiveStatistic): string {
    let url = [
      this.url,
      studyName,
      subjectId,
      DescriptiveStatistic[descriptiveStatistic].toLowerCase()
    ].join('/')

    this.startTime ? (url = `${url}?startTime=${this.startTime}`) : (url = url)
    this.endTime ? (url = `${url}&endTime=${this.endTime}`) : (url = url)

    return url
  }
}
