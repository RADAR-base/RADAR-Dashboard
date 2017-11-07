import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { ENV } from '../../../environments/environment'

@Injectable()
export class ErrorService {
  static handleError(error: HttpErrorResponse | any) {
    // TODO: add remote error logging
    !ENV.PROD && console.warn('ERROR in HttpResponse', error)
    return Observable.throw(error)
  }
}
