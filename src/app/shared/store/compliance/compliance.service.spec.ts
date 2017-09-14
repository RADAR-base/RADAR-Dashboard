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

import { ComplianceService } from './compliance.service'
import { AppConfig } from '../../utils/config'
import { MockConfig } from '../../../shared/testing/mocks/mock-config'
import { MockCompliance } from '../../testing/mocks/mock-compliance'

describe('ComplianceService', () => {
  let service: ComplianceService
  let backend: MockBackend
  let mockConfig

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
        ComplianceService,
        {
          provide: AppConfig,
          useValue: MockConfig
        }
      ]
    })
  })

  beforeEach(
    inject(
      [ComplianceService, MockBackend, AppConfig],
      (
        complianceService: ComplianceService,
        mockBackend: MockBackend,
        config: AppConfig
      ) => {
        service = complianceService
        backend = mockBackend
        mockConfig = config
      }
    )
  )

  // it('should return data', done => {
  //   backend.connections.subscribe((connection: MockConnection) => {
  //     const options = new ResponseOptions({
  //       body: JSON.stringify(MockCompliance),
  //       status: 200
  //     })
  //     connection.mockRespond(new Response(options))

  //     // Check the request method
  //     expect(connection.request.method).toEqual(RequestMethod.Get)
  //   })
  //   service.config = mockConfig.config
  //   service
  //     .getAll('0', service.config.compliance.keys, true)
  //     .subscribe(response => {
  //       // Check the response
  //       expect(response).toBeTruthy()
  //       done()
  //     })
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
