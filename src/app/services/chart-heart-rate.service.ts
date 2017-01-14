import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { TimeSeries } from '../models/time-series.model';
import { ErrorService } from './error.service';

@Injectable()
export class ChartHeartRateService {

  constructor(private http: Http) {}

  get(): Observable<TimeSeries[]> {
    // TODO: Change when API is ready
    return this.http.get(`${PARAMS.API_URI}/HR/avg/user`)
      .map(res => res.json().dataset || [])
      .map(this.parseHeartRateData)
      .catch(ErrorService.handleError);
  }

  parseHeartRateData(dataset) {
    return dataset
      .map(data => {
        return {
          value: data.heart_rate.value,
          date: new Date(data.effective_time_frame.start_date_time)
        };
      });
  }

}
