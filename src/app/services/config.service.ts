import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Config } from '../models/config.model';
import { ErrorService } from './error.service';
import { ENV } from '../../environments/environment';

@Injectable()
export class ConfigService {

  constructor(private http: Http) {}

  get(): Observable<Config> {
    return this.http.get(`${ENV.API_PATH}/mock-config.json`)
      .map(res => res.json() || [])
      .catch(ErrorService.handleError);
  }

}
