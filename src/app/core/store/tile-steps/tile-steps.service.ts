import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { TimeSeries } from '../../../components/dashboard-tile/models/time-series.model'
import { ErrorService } from '../../../shared/services/error.service'

@Injectable()
export class TileStepsService {

  constructor (private http: Http) {}

  get (): Observable<TimeSeries[]> {
    // TODO: Change when API is ready
    // return this.http.get(`${PARAMS.API_URI}/STEPS/avg/UserID_0/SourceID_0`)
    return this.http.get(`${PARAMS.API_LOCAL}/mock-steps.json`)
      .map(res => res.json().dataset || [])
      .map(this.parseStepsData)
      .catch(ErrorService.handleError)
  }

  parseStepsData (dataset) {
    return dataset
      .map(data => {
        return {
          value: data.steps.value,
          date: new Date(data.effective_time_frame.start_date_time)
        }
      })

  }

}
