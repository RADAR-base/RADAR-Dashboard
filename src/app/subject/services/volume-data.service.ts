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
  private options: any = {}

  constructor(private http: HttpClient, private actions$: Actions) {
    this.destroy$ = this.actions$.pipe(ofType(volumeDataActions.DESTROY))
  }

  getData(sources, options): Observable<any> {
    this.options = options

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
      .post<any>(this.parseURL(), JSON.stringify({ sources: new_sources }), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(takeUntil(this.destroy$))
  }

  private parseURL(): string {
    let url = [
      this.url,
      this.options.studyName,
      this.options.subjectId,
      DescriptiveStatistic[this.options.descriptiveStatistic].toLowerCase()
    ].join('/')

    url = url + '?'
    url = `${url}timeWindow=${this.options.timeWindow}`

    const startTime = new Date(this.options.timeFrame.startDateTime)
    const endTime = new Date(this.options.timeFrame.endDateTime)

    startTime
      ? (url = `${url}&startTime=${startTime.toISOString()}`)
      : (url = url)

    endTime ? (url = `${url}&endTime=${endTime.toISOString()}`) : (url = url)

    return url
  }
}
