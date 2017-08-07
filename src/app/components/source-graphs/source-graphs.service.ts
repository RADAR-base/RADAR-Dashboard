import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { MultiTimeSeries } from '../../shared/models/multi-time-series.model'
import { TimeSeries } from '../../shared/models/time-series.model'
import { ErrorService } from '../../shared/services/error.service'
import { AppConfig } from '../../shared/utils/config'
import { ParseTimeHoles } from '../../shared/utils/ParseTimeHoles'
import { ParseMultiValueData } from '../../shared/utils/ParseMultiValueData'

@Injectable()
export class SourceGraphsService {

  private URL = `${PARAMS.API_URI}/data`

  constructor (private http: Http) {}

  getSingleValueData (
    type, subject, source, timeHoles = true
  ): Observable<TimeSeries[]> {
    const url = this.parseURL(type, subject, source)

    return this.http.get(url)
      .map(res => {
        return res.status === 200
          ? res.json() || null
          : null
      })
      .map(res => {
        if (res) {
          return timeHoles
            ? ParseTimeHoles(res)
            : this.parseSingleValueData(res)
        } else {
          return null
        }
      })
      .catch(ErrorService.handleError)
  }

  getMultiValueData (
    type, subject, source, keys, timeHoles = true
  ): Observable<MultiTimeSeries> {
    const url = this.parseURL(type, subject, source)

    return this.http.get(url)
      .map(res => {
        return res.status === 200
          ? res.json() || null
          : null
      })
      .map(res => {
        if (res) {
          return timeHoles
            ? ParseMultiValueData(ParseTimeHoles(res, true), keys, timeHoles)
            : ParseMultiValueData(res.dataset, keys, timeHoles)
        } else {
          return null
        }
      })
      .catch(ErrorService.handleError)
  }

  private parseSingleValueData (res) {
    return res.dataset
      .map(data => {
        return {
          value: data.sample.value,
          date: new Date(data.startDateTime)
        }
      })
  }

  // TODO: setup 'AVERAGE' & 'TEN_SECOND'
  private parseURL (type, subject, source, stat = 'AVERAGE', interval = 'TEN_SECOND') {
    const url = `${this.URL}/${type}/${stat}/${interval}/${subject}/${source}`

    return AppConfig.timeFrame && AppConfig.timeFrame.start && AppConfig.timeFrame.end
      ? `${url}/${AppConfig.timeFrame.start}/${AppConfig.timeFrame.end}`
      : url
  }

}
