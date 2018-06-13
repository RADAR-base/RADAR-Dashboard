import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { MockConfig } from '../../shared/testing/mocks/mock-config'
import { AppConfig } from '../../shared/utils/config'
import { SensorsService } from './sensors.service'

describe('SensorsService', () => {
  let service
  let http

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SensorsService, { provide: AppConfig, useClass: MockConfig }]
    }))

  beforeEach(() => {
    service = TestBed.get(SensorsService)
    http = TestBed.get(HttpTestingController)
  })

  // TODO: Add tests
})
