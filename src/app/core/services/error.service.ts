import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class ErrorService {
  static handleError(error: HttpErrorResponse | any) {
    // TODO: add remote error logging
    console.warn('ERROR in HttpResponse', error)
    return Observable.throw(error)
  }
}
