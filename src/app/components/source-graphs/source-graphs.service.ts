import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { TimeSeries } from '../../shared/models/time-series.model'
import { ErrorService } from '../../shared/services/error.service'

@Injectable()
export class SourceGraphsService {

  private URL = `${PARAMS.API_URI}/data`

  constructor (private http: Http) {}

  getHRData (type, subject, source): Observable<TimeSeries[]> {
    const url = this.parseURL(type, subject, source)

    return this.http.get(url)
      .map(res => res.json() || [])
      .map(this.parseHRData)
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

  // TODO: setup 'AVERAGE' & 'TEN_SECOND'
  private parseURL (type, subject, source, stat = 'AVERAGE', interval = 'TEN_SECOND') {
    return `${this.URL}/${type}/${stat}/${interval}/${subject}/${source}`
  }

}
