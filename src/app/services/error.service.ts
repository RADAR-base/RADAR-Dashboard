import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class ErrorService {

  static handleError(error: Response | any) {
    // TODO: add remote error logging
    return Observable.throw(error);
  }
}
