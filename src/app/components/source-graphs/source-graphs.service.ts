import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { MultiTimeSeries } from '../../shared/models/multi-time-series.model'
import { TimeSeries } from '../../shared/models/time-series.model'
import { ErrorService } from '../../shared/services/error.service'
import { AppConfig } from '../../shared/utils/config'

@Injectable()
export class SourceGraphsService {

  private URL = `${PARAMS.API_URI}/data`

  constructor (private http: Http) {}

  getSingleValueData (type, subject, source, timeHoles = true): Observable<TimeSeries[]> {
    const url = this.parseURL(type, subject, source)

    return this.http.get(url)
      .map(res => res.json() || [])
      .map(res => timeHoles
        ? this.parseTimeHoles(res)
        : this.parseSingleValueData(res)
      )
      .catch(ErrorService.handleError)
  }

  getMultiValueData (type, subject, source, keys, timeHoles = true): Observable<MultiTimeSeries> {
    const url = this.parseURL(type, subject, source)

    return this.http.get(url)
      .map(res => res.json() || [])
      .map(res => timeHoles
        ? this.parseMultiValueData(this.parseTimeHoles(res, true), keys, timeHoles)
        : this.parseMultiValueData(res.dataset, keys, timeHoles)
      )
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

  private parseMultiValueData (dataset, keys, timeHoles) {
    const dates: Date[] = []
    const values: { [key: string]: number[] } = keys.reduce(
      (acc, k) => ({ ...acc, [k.key]: [] }), {}
    )

    dataset.map(data => {
      keys.map(k => values[k.key].push(data.sample && data.sample[k.key] || null))
      dates.push(timeHoles
        ? data.date
        : new Date(data.startDateTime))
    })

    return { keys, values, dates }
  }

  private parseTimeHoles (res, multi = false) {
    const interval = AppConfig.config.timeIntervals[res.header.timeFrame].value
    const timeFrame = res.header.effectiveTimeFrame
    const data = res.dataset

    const dataWithIds = data.reduce((acc, val) => {
      const time = new Date(val.startDateTime).getTime()
      return Object.assign(acc, { [time]: val.sample })
    }, {})

    const startTime = new Date(timeFrame.startDateTime).getTime()
    const endTime = new Date(timeFrame.endDateTime).getTime()
    const iterations = (endTime - startTime) / interval

    const newData = []

    for (let i = 0; i <= iterations; i++) {
      const date = new Date(startTime + interval * i)
      const sample = dataWithIds[date.getTime()] || null

      multi
        ? newData.push({ date, sample })
        : newData.push({ date, value: sample && sample.value })
    }

    return newData
  }

  // TODO: setup 'AVERAGE' & 'TEN_SECOND'
  private parseURL (type, subject, source, stat = 'AVERAGE', interval = 'TEN_SECOND') {
    return `${this.URL}/${type}/${stat}/${interval}/${subject}/${source}`
  }

}
