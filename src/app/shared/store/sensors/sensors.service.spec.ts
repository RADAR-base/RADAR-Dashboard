import { HttpClientModule } from '@angular/common/http'
import { TestBed, inject } from '@angular/core/testing'

import { SensorsService } from './sensors.service'

describe('SensorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SensorsService]
    })
  })

  it(
    'should be created',
    inject([SensorsService], (service: SensorsService) => {
      expect(service).toBeTruthy()
    })
  )
})
