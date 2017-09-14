import { HttpClientModule } from '@angular/common/http'
import { TestBed, inject } from '@angular/core/testing'
// Make sure to include the Response object from '@angular/http'
import { BaseRequestOptions, Http } from '@angular/http'
import { MockBackend } from '@angular/http/testing'

import { ComplianceService } from './compliance.service'

describe('ComplianceService', () => {
  let service: ComplianceService
  let backend: MockBackend

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
        ComplianceService
      ]
    })
  })

  beforeEach(
    inject(
      [ComplianceService, MockBackend],
      (complianceService: ComplianceService, mockBackend: MockBackend) => {
        service = complianceService
        backend = mockBackend
      }
    )
  )

  // it('should return data', done => {
  //   console.log(AppConfig.config)
  //   backend.connections.subscribe((connection: MockConnection) => {
  //     const options = new ResponseOptions({
  //       body: JSON.stringify(MockCompliance),
  //       status: 200
  //     })
  //     connection.mockRespond(new Response(options))

  //     // Check the request method
  //     expect(connection.request.method).toEqual(RequestMethod.Get)
  //     console.log(connection)
  //   })
  //   service.getAll('0').subscribe(response => {
  //     console.log(AppConfig.config)
  //     // Check the response
  //     expect(response).toBeTruthy()
  //     done()
  //   })
  // })

  // it('should return null if undefined', done => {
  //   backend.connections.subscribe((connection: MockConnection) => {
  //     const options = new ResponseOptions({
  //       body: JSON.stringify({}),
  //       status: 400
  //     })
  //     connection.mockRespond(new Response(options))

  //     // Check the request method
  //     expect(connection.request.method).toEqual(RequestMethod.Get)
  //   })
  //   service.config = mockConfig.config
  //   service.getAll('', '').subscribe(response => {
  //     // Check the response
  //     expect(response).toBeFalsy()
  //     done()
  //   })
  // })
})
