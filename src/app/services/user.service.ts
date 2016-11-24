import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { AppConfig } from '../shared/app.config';
import { User } from '../models/user';
import { ErrorService } from './error.service';

@Injectable()
export class UserService {

  constructor(private http: Http) {}

  getUser(): Observable<User> {
    return this.http.get(`${AppConfig.API_PATH}/mock-user.json`)
      .delay(1000)
      .map(res => res.json().body || [])
      .catch(ErrorService.handleError);
  }
}
