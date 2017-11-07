import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { Observable } from 'rxjs/Observable'

import { MockConfig } from '../../shared/testing/mocks/mock-config'
import {
  MockSensorsMany,
  MockSensorsOne,
  MockSensorsOneProcessed,
  MockSensorsOneRaw,
  MockSensorsOptions
} from '../../shared/testing/mocks/mock-sensor-data'
import { AppConfig } from '../../shared/utils/config'
import { SensorsDataService } from './sensors-data.service'

describe('SensorsDataService', () => {
  let service
  let http
  const actions: Observable<any> = Observable.of()

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SensorsDataService,
        provideMockActions(() => actions),
        { provide: AppConfig, useClass: MockConfig }
      ]
    })
  )

  beforeEach(() => {
    service = TestBed.get(SensorsDataService)
    http = TestBed.get(HttpTestingController)
  })

  it('should successfully return expected data for one sensor', done => {
    const options = MockSensorsOptions
    const sensors = MockSensorsOne
    const expectedRes = MockSensorsOneProcessed
    service.getData(sensors, options).subscribe(res => {
      expect(res).toEqual(expectedRes)
      done()
    })

    const request = http.expectOne(
      '/api/data/BATTERY/AVERAGE/TEN_SECOND' +
        '/MRC01/00:07:80:1F:52:F3/1497589120000/1497628000000'
    )

    request.flush(MockSensorsOneRaw)

    http.verify()
  })

  it('should successfully return expected data for multiple sensors', done => {
    const hi = {
      subjectId: 'MRC01',
      timeFrame: {
        start: 1497589120000,
        end: 1497628000000
      },
      timeInterval: 10000,
      descriptiveStatistic: 0
    }
    const sensors = MockSensorsMany
    const expectedRes = MockSensorsOneProcessed

    service.getData(sensors, hi).subscribe(res => {
      expect(res).toEqual(expectedRes)
      done()
    })

    const req = http.match(
      '/api/data/BATTERY/AVERAGE/TEN_SECOND' +
        '/MRC01/00:07:80:1F:52:F3/1497589120000/1497628000000'
    )

    // TODO: add multiple requests
    expect(req.length).toBe(1)
    req.forEach((k, i) => k.flush(MockSensorsOneRaw))
  })
})
