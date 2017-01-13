import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Config } from '../models/config.model';
import { ErrorService } from './error.service';

@Injectable()
export class ConfigService {

  constructor(private http: Http) {}

  get(): Observable<Config> {
    return this.http.get(`${PARAMS.API_LOCAL}/mock-config.json`)
      .map(res => res.json() || [])
      .catch(ErrorService.handleError);
  }

}
