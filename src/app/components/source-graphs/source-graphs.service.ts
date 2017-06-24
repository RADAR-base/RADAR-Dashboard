import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { TimeSeries } from '../../shared/models/time-series.model'
import { ErrorService } from '../../shared/services/error.service'

@Injectable()
export class SourceGraphsService {

  private URL = `${PARAMS.API_URI}/data`

  constructor (private http: Http) {}

  getHRData (type, stat, interval, subject, source): Observable<TimeSeries[]> {
    const url = this.parseURL(type, stat, interval, subject, source)
    console.log(url)

    return this.http.get(url)
      .map(res => res.json() || [])
      .map(this.parseHRData)
      .do(console.log)
      .catch(ErrorService.handleError)
  }

  private parseHRData (res) {
    return res.dataset
      .map(data => {
        return {
          value: data.sample.value,
          date: new Date(data.startDateTime)
        }
      })
  }

  private parseURL (type, stat, interval, subject, source) {
    return `${this.URL}/${type}/${stat}/${interval}/${subject}/${source}`
  }

}
