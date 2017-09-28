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

  // TODO: Add tests
})
