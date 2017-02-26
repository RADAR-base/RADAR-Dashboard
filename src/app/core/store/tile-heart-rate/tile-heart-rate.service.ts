import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { TimeSeries } from '../../../components/dashboard-tile/models/time-series.model'
import { ErrorService } from '../../../shared/services/error.service'

@Injectable()
export class TileHeartRateService {

  constructor (private http: Http) {}

  get (): Observable<TimeSeries[]> {
    // TODO: Change when API is ready
    return this.http.get(`${PARAMS.API_URI}/HR/avg/UserID_0/SourceID_0`)
      .map(res => res.json().dataset || [])
      .map(this.parseHeartRateData)
      .catch(ErrorService.handleError)
  }

  parseHeartRateData (dataset) {
    return dataset
      .map(data => {
        return {
          value: data.heart_rate.value,
          date: new Date(data.effective_time_frame.start_date_time)
        }
      })
  }

}
