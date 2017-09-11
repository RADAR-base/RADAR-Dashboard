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

import { MockStudies } from '../../../shared/testing/mocks/mock-studies'
import { StudyService } from './study.service'

describe('StudyService', () => {
  let service: StudyService
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
        StudyService
      ]
    })
  })

  beforeEach(
    inject(
      [StudyService, MockBackend],
      (studyService: StudyService, mockBackend: MockBackend) => {
        service = studyService
        backend = mockBackend
      }
    )
  )

  it('should return data', done => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify(MockStudies),
        status: 200
      })
      connection.mockRespond(new Response(options))

      // Check the request method
      expect(connection.request.method).toEqual(RequestMethod.Get)
    })
    service.getAll().subscribe(response => {
      // Check the response
      expect(response).toBeTruthy()
      done()
    })
    service.getById('0').subscribe(response => {
      // Check the response
      expect(response).toBeTruthy()
      done()
    })
  })
})
