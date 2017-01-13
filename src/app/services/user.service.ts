import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ErrorService } from './error.service';

@Injectable()
export class UserService {

  constructor(private http: Http) {}

  get(): Observable<User> {
    return this.http.get(`${PARAMS.API_LOCAL}/mock-user.json`)
      .map(res => res.json().dataset || [])
      .catch(ErrorService.handleError);
  }
}
