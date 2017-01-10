import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ErrorService } from './error.service';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: Http) {}

  get(): Observable<User> {
    return this.http.get(`${environment.API_PATH}/mock-user.json`)
      .delay(1000)
      .map(res => res.json().dataset || [])
      .catch(ErrorService.handleError);
  }
}
