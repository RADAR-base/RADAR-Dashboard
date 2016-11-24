import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class ErrorService {

  constructor(private http: Http) {}

  static handleError(error: Response | any) {
    // TODO: add remote error logging
    return Observable.throw(error);
  }
}
