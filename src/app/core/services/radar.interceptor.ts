import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { ENV } from '../../../environments/environment'
import { ErrorService } from './error.service'

@Injectable()
export class RadarHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // TODO: show error to user with UI
          if (event.status !== 200) {
            console.warn(
              'Requested responded with status:',
              event.status,
              event
            )
          }

          return event
        }
      })
      .catch(ErrorService.handleError)
  }
}

@Injectable()
export class EmptyProvider {}

const provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: RadarHttpInterceptor,
  multi: true
}

export const RadarHttpInterceptorProvider = ENV.TEST ? EmptyProvider : provider
