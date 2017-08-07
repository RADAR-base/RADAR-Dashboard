import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { ErrorService } from '../../../shared/services/error.service'
import { AppConfig } from '../../../shared/utils/config'

@Injectable()
export class ComplianceService {

  constructor (private http: Http) {}

  getAll (studyId, keys, timeHoles = true): Observable<any> {
    // TODO: Change when API is ready
    return this.http.get(`${PARAMS.API_LOCAL}/mock-compliance.json`)
      .delay(1000)
      .map(res => {
        return res.status === 200
          ? res.json() || null
          : null
      })
      .map(res => {
        if (res) {
          return timeHoles
            ? this.parseComplianceData(this.parseTimeHoles(res, true), keys, timeHoles)
            : this.parseComplianceData(res.dataset, keys, timeHoles)
        } else {
          return null
        }
      })
      .catch(ErrorService.handleError)
  }

  private parseComplianceData (dataset, keys, timeHoles) {
    const dates: Date[] = []
    const values: { [key: string]: number[] } = keys.reduce(
      (acc, k) => ({ ...acc, [k.key]: [] }), {}
    )

    dataset.map(data => {
      keys.map(k => values[k.key].push(data.sample && data.sample[k.key]))
      dates.push(
        timeHoles
        ? data.date
        :
        new Date(data.startDateTime))
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

}
