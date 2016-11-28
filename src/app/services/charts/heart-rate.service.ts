import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { HeartRate } from '../../models/charts/heart-rate';
import { ErrorService } from '../error.service';

@Injectable()
export class ChartHeartRateService {

  constructor(private http: Http) {}

  getData(): Observable<HeartRate[]> {
    // TODO: Change when API is ready
    return this.http.get('http://radar-restapi.eu-west-1.elasticbeanstalk.com/api/HeartRate/avg/user')
      .map(res => res.json().dataset || [])
      .map(this.parseHeartRateData)
      .catch(ErrorService.handleError);
  }

  parseHeartRateData(dataset) {
    return dataset
      .map(data => data['org.radarcns.avro.HeartRateItem'])
      .map(data => {
        return {
          value: data.heart_rate,
          date: new Date(data.effective_time_frame.start_date_time)
        };
      });
  }

}
