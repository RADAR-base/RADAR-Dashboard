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

import { SourceService } from './source.service'

describe('SourceService', () => {
  let service: SourceService
  let backend: MockBackend

  beforeEach(() => {
    TestBed.configureTestingModule({
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
        SourceService
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
