import {
  HTTP_INTERCEPTORS,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError } from 'rxjs/operators'

import { ErrorService } from './error.service'

@Injectable()
export class RadarHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(catchError(ErrorService.handleError))
  }
}

export const RadarHttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: RadarHttpInterceptor,
  multi: true
}
