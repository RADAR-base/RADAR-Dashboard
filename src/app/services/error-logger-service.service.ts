import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ErrorLoggerService {

  constructor(private http: Http) {}

  log(error) {
    // TODO: add remote error logging
    console.error(error);

    return error;
  }
}
