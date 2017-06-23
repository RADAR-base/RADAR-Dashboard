import { inject, TestBed } from '@angular/core/testing'
import { HttpModule } from '@angular/http'

import { SensorsService } from './sensors.service'

describe('SensorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [SensorsService]
    })
  })

  it('should be created', inject([SensorsService], (service: SensorsService) => {
    expect(service).toBeTruthy()
  }))
})
