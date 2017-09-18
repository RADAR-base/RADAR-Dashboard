import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { Observable } from 'rxjs/Observable'

import { MockConfig } from '../../testing/mocks/mock-config'
import {
  MockSensorsMany,
  MockSensorsOne,
  MockSensorsOneProcessed,
  MockSensorsOneRaw,
  MockSensorsOptions
} from '../../testing/mocks/mock-sensor-data'
import { AppConfig } from '../../utils/config'
import { SensorsService } from './sensors.service'

describe('SensorsService', () => {
  let service
  let http
  const actions: Observable<any> = Observable.of()

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SensorsService,
        provideMockActions(() => actions),
        { provide: AppConfig, useClass: MockConfig }
      ]
    })
  )

  beforeEach(() => {
    service = TestBed.get(SensorsService)
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

    // tslint:disable-next-line:max-line-length
    const request = http.expectOne(
      'https://radar-cns.ddns.net/api/data/BATTERY/AVERAGE/TEN_SECOND/MRC01/00:07:80:1F:52:F3/1497589120000/1497628000000'
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

    // tslint:disable-next-line:max-line-length
    const req = http.match(
      'https://radar-cns.ddns.net/api/data/BATTERY/AVERAGE/TEN_SECOND/MRC01/00:07:80:1F:52:F3/1497589120000/1497628000000'
    )
    expect(req.length).toBe(1)
    req.forEach((k, i) => k.flush(MockSensorsOneRaw))
  })
})
