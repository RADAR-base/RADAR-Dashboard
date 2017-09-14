import { HttpClientModule } from '@angular/common/http'
import { TestBed, inject } from '@angular/core/testing'
// Make sure to include the Response object from '@angular/http'
import {
  BaseRequestOptions,
  Http,
  RequestMethod,
  Response,
  ResponseOptions
} from '@angular/http'
import { MockBackend, MockConnection } from '@angular/http/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { Observable } from 'rxjs/Observable'

import { SourceService } from './source.service'

describe('SourceService', () => {
  let service: SourceService
  let backend: MockBackend
  const actions: Observable<any> = Observable.of()

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (
            backendInstance: MockBackend,
            defaultOptions: BaseRequestOptions
          ) => {
            return new Http(backendInstance, defaultOptions)
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        SourceService,
        provideMockActions(() => actions)
      ]
    })
  })

  beforeEach(
    inject(
      [SourceService, MockBackend],
      (sourceService: SourceService, mockBackend: MockBackend) => {
        service = sourceService
        backend = mockBackend
      }
    )
  )

  it('should return data', done => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify({}),
        status: 200
      })
      connection.mockRespond(new Response(options))

      // Check the request method
      expect(connection.request.method).toEqual(RequestMethod.Get)
    })
    service.getAll('MRC01').subscribe(response => {
      // Check the response
      expect(response).toBeTruthy()
      done()
    })
  })
})
