import { TestBed, inject } from '@angular/core/testing'
import { HttpModule } from '@angular/http'

import { ComplianceService } from './compliance.service'

describe('ComplianceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ComplianceService]
    })
  })

  it(
    'should be created',
    inject([ComplianceService], (service: ComplianceService) => {
      expect(service).toBeTruthy()
    })
  )
})
