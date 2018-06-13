import { HttpClientModule } from '@angular/common/http'
import { TestBed, inject } from '@angular/core/testing'

import { ErrorService } from './error.service'

describe('ErrorLoggerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ErrorService]
    })
  })

  it('should be created', inject([ErrorService], (service: ErrorService) => {
    expect(service).toBeTruthy()
  }))
})
