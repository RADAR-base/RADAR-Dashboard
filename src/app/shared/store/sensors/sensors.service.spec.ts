import { TestBed, async, inject } from '@angular/core/testing'
// Make sure to include the Response object from '@angular/http'
import {
  BaseRequestOptions,
  Http,
  RequestMethod,
  Response,
  ResponseOptions
} from '@angular/http'
import { MockBackend, MockConnection } from '@angular/http/testing'

import { MockConfig } from '../../../shared/testing/mocks/mock-config'
import { MockHRData } from '../../../shared/testing/mocks/mock-HR-data'
import {
  PayloadMulti,
  PayloadSingle,
  endTime,
  startTime
} from '../../../shared/testing/mocks/mock-sensors-test-data'
import { AppConfig } from '../../utils/config'
import { SensorsService } from './sensors.service'

describe('SensorsService', () => {
  let subject: SensorsService
  let backend: MockBackend
  let mockConfig

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
        SensorsService,
        {
          provide: AppConfig,
          useValue: MockConfig
        }
      ]
    })
  })

  it(
    'should be created',
    inject([SensorsService], (service: SensorsService) => {
      expect(service).toBeTruthy()
    })
  )

  it(
    'should return an Observable',
    async(
      inject([SensorsService], (service: SensorsService) => {
        service.getAll([]).subscribe(value => {
          expect(value.length).toBe(0)
        })
      })
    )
  )

  beforeEach(
    inject(
      [SensorsService, MockBackend, AppConfig],
      (
        sensorsService: SensorsService,
        mockBackend: MockBackend,
        config: AppConfig
      ) => {
        subject = sensorsService
        backend = mockBackend
        mockConfig = config
      }
    )
  )

  it('should return data', done => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify(MockHRData),
        status: 200
      })
      connection.mockRespond(new Response(options))

      // Check the request method
      expect(connection.request.method).toEqual(RequestMethod.Get)
    })
    subject.config = mockConfig.config
    subject.getSingleValueData('', '', '').subscribe(response => {
      // Check the response
      expect(response).toBeTruthy()
      done()
    })
    subject
      .getMultiValueData('', '', '', PayloadMulti.data.keys)
      .subscribe(response => {
        // Check the response
        expect(response).toBeTruthy()
        done()
      })
    subject
      .getSingleValueDataWithDate('', '', '', true, startTime, endTime)
      .subscribe(response => {
        // Check the response
        expect(response).toBeTruthy()
        done()
      })
    subject
      .getMultiValueDataWithDate(
        '',
        '',
        '',
        PayloadMulti.data.keys,
        true,
        startTime,
        endTime
      )
      .subscribe(response => {
        // Check the response
        expect(response).toBeTruthy()
        done()
      })
    subject
      .getAggregateMessagesWithDate('', '', '', true, startTime, endTime)
      .subscribe(response => {
        // Check the response
        expect(response).toBeTruthy()
        done()
      })
    subject.getDataSingle(PayloadSingle).subscribe(response => {
      // Check the response
      expect(response).toBeTruthy()
      done()
    })
    subject.getDataMulti(PayloadMulti).subscribe(response => {
      // Check the response
      expect(response).toBeTruthy()
      done()
    })
  })

  it('should not return data when undefined', done => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify({}),
        status: 400
      })
      connection.mockRespond(new Response(options))

      // Check the request method
      expect(connection.request.method).toEqual(RequestMethod.Get)
    })
    subject.config = mockConfig.config
    subject.getSingleValueData('', '', '').subscribe(response => {
      // Check the response
      expect(response).toBeFalsy()
      done()
    })
    subject
      .getMultiValueData('', '', '', PayloadMulti.data.keys)
      .subscribe(response => {
        // Check the response
        expect(response).toBeFalsy()
        done()
      })
    subject
      .getSingleValueDataWithDate('', '', '', true, startTime, endTime)
      .subscribe(response => {
        // Check the response
        expect(response).toBeFalsy()
        done()
      })
    subject
      .getMultiValueDataWithDate(
        '',
        '',
        '',
        PayloadMulti.data.keys,
        true,
        startTime,
        endTime
      )
      .subscribe(response => {
        // Check the response
        expect(response).toBeFalsy()
        done()
      })
    subject
      .getAggregateMessagesWithDate('', '', '', true, startTime, endTime)
      .subscribe(response => {
        // Check the response
        expect(response).toBeFalsy()
        done()
      })
    subject.getDataSingle(PayloadSingle).subscribe(response => {
      // Check the response
      expect(response).toBeFalsy()
      done()
    })
    subject.getDataMulti(PayloadMulti).subscribe(response => {
      // Check the response
      expect(response).toBeFalsy()
      done()
    })
  })
})
