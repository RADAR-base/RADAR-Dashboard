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
    //return this.http.get(`${PARAMS.API_URI}/HR/avg/user`)
    return this.http.get(`${PARAMS.API_LOCAL}/mock-acceleration.json`)
      .map(res => res.json().dataset || [])
      .map(this.parseAccelerationData)
      .catch(ErrorService.handleError);
  }

  parseAccelerationData(dataset) {

    // Reshaping the data as to have date value info
    // for each of the measurements (e.g. x, y, z)

    var lines = {};
    for (var entry in dataset) { 
      for (var j in dataset[entry].acceleration) {
          if (!(j in lines)) {
            lines[j] = [];
          }
          lines[j].push({date: new Date(dataset[entry].effective_time_frame.start_date_time), 
            val: +dataset[entry].acceleration[j],
            id: j})
      }
    }

    var data = [];
    for (var ax in lines) {
      data.push({vals: lines[ax]});
    }

    return data;

  }

}
