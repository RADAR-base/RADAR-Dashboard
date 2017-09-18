import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import {
  MockCompliance,
  MockComplianceExpected
} from '../../testing/mocks/mock-compliance'
import { ComplianceService } from './compliance.service'

describe('ComplianceService', () => {
  let service
  let http

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ComplianceService]
    })
  )

  beforeEach(() => {
    service = TestBed.get(ComplianceService)
    http = TestBed.get(HttpTestingController)
  })

  it('should successfully return expected data', done => {
    service.getAll('MRC01').subscribe(res => {
      expect(res).toEqual(MockComplianceExpected)
      done()
    })

    const request = http.expectOne('assets/data/mock-compliance.json')
    request.flush(MockCompliance)

    http.verify()
  })
})
