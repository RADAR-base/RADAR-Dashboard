import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { MultiTimeSeries } from '../../../shared/models/multi-time-series.model'
import { TimeSeries } from '../../../shared/models/time-series.model'
import { ErrorService } from '../../../shared/services/error.service'
import { ParseMultiValueData } from '../../../shared/utils/ParseMultiValueData'
import { ParseTimeHoles } from '../../../shared/utils/ParseTimeHoles'
import { AppConfig } from '../../utils/config'
import { Source } from '../source/source.model'

@Injectable()
export class SensorsService {
  private URL = `${PARAMS.API_URI}/data`
  config = AppConfig.config

  constructor(private http: Http) {}

  getAll(sources): Observable<Source[]> {
    return Observable.of(
      sources.map((d: Source) => {
        const sensorList = AppConfig.config.specs[d.type]
        const sensors = sensorList.map(sensor => ({
          ...AppConfig.config.sensors[sensor],
          type: sensor
        }))
        return sensors ? { ...d, sensors } : d
      })
    )
  }

  getDataSingle(payload) {
    const sensor = payload.data
    const subjectId = payload.subjectId
    const endTime = 1497689980000
    const startTime = new Date(endTime).setDate(new Date(endTime).getDate() - 1)

    return this.getSingleValueDataWithDate(
      sensor.type,
      subjectId,
      sensor.source,
      true,
      startTime,
      endTime
    )
  }

  getDataMulti(payload) {
    if (!this.config) this.config = AppConfig.config
    const sensor = payload.data
    const subjectId = payload.subjectId
    const endTime = 1497689980000
    const startTime = new Date(endTime).setDate(new Date(endTime).getDate() - 1)

    return this.getMultiValueDataWithDate(
      sensor.type,
      subjectId,
      sensor.source,
      this.config.sensors[sensor.type].keys,
      true,
      startTime,
      endTime
    )
  }

  getSingleValueData(
    type,
    subject,
    source,
    timeHoles = true
  ): Observable<TimeSeries[]> {
    const url = this.parseURL(type, subject, source)
    return this.http
      .get(url)
      .map(res => {
        return res.status === 200 ? res.json() || null : null
      })
      .map(res => {
        if (res) {
          return timeHoles
            ? ParseTimeHoles(res, this.config)
            : this.parseSingleValueData(res)
        } else {
          return null
        }
      })
      .catch(ErrorService.handleError)
  }

  getSingleValueDataWithDate(
    type,
    subject,
    source,
    timeHoles = true,
    startTime,
    endTime
  ): Observable<TimeSeries[]> {
    const url = `${this
      .URL}/${type}/AVERAGE/TEN_SECOND/${subject}/${source}/${startTime}/${endTime}`

    return this.http
      .get(url)
      .map(res => {
        return res.status === 200 ? res.json() || null : null
      })
      .map(res => {
        if (res) {
          res.header.effectiveTimeFrame.startDateTime =
            new Date(startTime).toISOString().split('.')[0] + 'Z'
          res.header.effectiveTimeFrame.endDateTime =
            new Date(endTime).toISOString().split('.')[0] + 'Z'
          return ParseTimeHoles(res, this.config)
        } else {
          return null
        }
      })
      .catch(ErrorService.handleError)
  }

  getMultiValueData(
    type,
    subject,
    source,
    keys,
    timeHoles = true
  ): Observable<MultiTimeSeries> {
    const url = this.parseURL(type, subject, source)

    return this.http
      .get(url)
      .map(res => {
        return res.status === 200 ? res.json() || null : null
      })
      .map(res => {
        if (res) {
          return timeHoles
            ? ParseMultiValueData(
                ParseTimeHoles(res, this.config, true),
                keys,
                timeHoles
              )
            : ParseMultiValueData(res.dataset, keys, timeHoles)
        } else {
          return null
        }
      })
      .catch(ErrorService.handleError)
  }

  getMultiValueDataWithDate(
    type,
    subject,
    source,
    keys,
    timeHoles = true,
    startTime,
    endTime
  ): Observable<MultiTimeSeries> {
    const url = `${this
      .URL}/${type}/AVERAGE/TEN_SECOND/${subject}/${source}/${startTime}/${endTime}`

    return this.http
      .get(url)
      .map(res => {
        return res.status === 200 ? res.json() || null : null
      })
      .map(res => {
        if (res) {
          res.header.effectiveTimeFrame.startDateTime =
            new Date(startTime).toISOString().split('.')[0] + 'Z'
          res.header.effectiveTimeFrame.endDateTime =
            new Date(endTime).toISOString().split('.')[0] + 'Z'
          return ParseMultiValueData(
            ParseTimeHoles(res, this.config, true),
            keys,
            timeHoles
          )
        } else {
          return null
        }
      })
      .catch(ErrorService.handleError)
  }

  getAggregateMessagesWithDate(
    type,
    subject,
    source,
    timeHoles = true,
    startTime,
    endTime
  ): Observable<TimeSeries[]> {
    // TODO: Change when API is ready
    const url = `${PARAMS.API_LOCAL}/mock-aggregate-messages.json`

    return this.http
      .get(url)
      .map(res => {
        return res.status === 200 ? res.json() || null : null
      })
      .map(res => {
        if (res) {
          res.header.effectiveTimeFrame.startDateTime =
            new Date(startTime).toISOString().split('.')[0] + 'Z'
          res.header.effectiveTimeFrame.endDateTime =
            new Date(endTime).toISOString().split('.')[0] + 'Z'
          return ParseTimeHoles(res, this.config)
        } else {
          return null
        }
      })
      .catch(ErrorService.handleError)
  }

  private parseSingleValueData(res) {
    return res.dataset.map(data => {
      return {
        value: data.sample.value,
        date: new Date(data.startDateTime)
      }
    })
  }

  // TODO: setup 'AVERAGE' & 'TEN_SECOND'
  private parseURL(
    type,
    subject,
    source,
    stat = 'AVERAGE',
    interval = 'TEN_SECOND'
  ) {
    const url = `${this.URL}/${type}/${stat}/${interval}/${subject}/${source}`

    return AppConfig.timeFrame &&
    AppConfig.timeFrame.start &&
    AppConfig.timeFrame.end
      ? `${url}/${AppConfig.timeFrame.start}/${AppConfig.timeFrame.end}`
      : url
  }
}
