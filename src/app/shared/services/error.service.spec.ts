import { TestBed, inject } from '@angular/core/testing'
import { HttpModule } from '@angular/http'

import { ErrorService } from './error.service'

describe('ErrorLoggerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ErrorService]
    })
  })

  it(
    'should ...',
    inject([ErrorService], (service: ErrorService) => {
      expect(service).toBeTruthy()
    })
  )
})
