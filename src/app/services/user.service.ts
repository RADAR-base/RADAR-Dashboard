import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ErrorService } from './error.service';
import { ENV } from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: Http) {}

  get(): Observable<User> {
    return this.http.get(`${ENV.API_PATH}/mock-user.json`)
      .map(res => res.json().dataset || [])
      .catch(ErrorService.handleError);
  }
}
