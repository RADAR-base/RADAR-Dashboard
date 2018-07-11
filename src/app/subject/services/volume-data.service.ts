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

  // NOTE: Temporary values are used to get data from volume API. Time window is automatically specified (ONE_WEEK) by API.
  private endTime = new Date()
  private startTime = new Date(
    this.endTime.getFullYear() - 1,
    this.endTime.getMonth(),
    this.endTime.getDate()
  )

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

    if (sources) {
      for (const key of Object.keys(sources)) {
        const new_sourcedata = new Array()
        if (sources[key].sourceData) {
          for (const data of Object.keys(sources[key].sourceData)) {
            new_sourcedata.push({
              name: sources[key].sourceData[data].sourceDataName
            })
          }
        }
        new_sources.push({
          sourceId: sources[key].sourceId,
          sourceData: new_sourcedata
        })
      }
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

    this.startTime
      ? (url = `${url}?startTime=${this.startTime.toISOString()}`)
      : (url = url)
    this.endTime
      ? (url = `${url}&endTime=${this.endTime.toISOString()}`)
      : (url = url)

    return url
  }
}
