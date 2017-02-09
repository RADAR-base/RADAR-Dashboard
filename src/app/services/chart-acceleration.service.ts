import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { MultiTimeSeries } from '../models/multi-time-series.model';
import { ErrorService } from './error.service';

@Injectable()
export class ChartAccelerationService {

  constructor(private http: Http) {}

  get(): Observable<MultiTimeSeries[]> {
    // TODO: Change when API is ready
    return this.http.get(`${PARAMS.API_LOCAL}/mock-acceleration.json`)
      .map(res => res.json().dataset || [])
      .map(this.parseAccelerationData)
      .catch(ErrorService.handleError);
  }

  parseAccelerationData(dataset) {

    // Reshaping the data as to have date value info
    // for each of the measurements (e.g. x, y, z)

    const coords = ['x', 'y', 'z'];
    const dataParsed = [];

    coords.map(id => {
      dataParsed.push({
        id,
        values: dataset.map(data => ({
          value: data.acceleration[id],
          date: new Date(data.effective_time_frame.start_date_time)
        }))
      });
    });

    return dataParsed;
  }

}
