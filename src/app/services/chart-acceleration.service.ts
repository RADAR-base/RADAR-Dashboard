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
    // return this.http.get(`${PARAMS.API_URI}/HR/avg/user`)
    return this.http.get(`${PARAMS.API_LOCAL}/mock-acceleration.json`)
      .map(res => res.json().dataset || [])
      .map(this.parseAccelerationData)
      .catch(ErrorService.handleError);
  }

  parseAccelerationData(dataset) {

    // Reshaping the data as to have date value info
    // for each of the measurements (e.g. x, y, z)

    const lines = {};
    for (const entry of dataset) {
      for (const j in entry.acceleration) {
        if (entry.acceleration.hasOwnProperty(j)) {
          if (!(j in lines)) {
            lines[j] = [];
          }
          lines[j].push({date: new Date(entry.effective_time_frame.start_date_time),
            val: +entry.acceleration[j],
            id: j});
        }
      }
    }

    const data = [];
    for (const ax in lines) {
      if (lines.hasOwnProperty(ax)) {
        data.push({vals: lines[ax]});
      }
    }

    return data;

  }

}
