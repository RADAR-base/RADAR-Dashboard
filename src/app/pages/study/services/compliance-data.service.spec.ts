import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import {
  MockAPIComplianceDataset,
  MockComplianceDataExpected
} from '../../../shared/testing/mocks/mock-compliance-data'
import { ComplianceDataService } from './compliance-data.service'

describe('ComplianceDataService', () => {
  let service
  let http

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ComplianceDataService]
    })
  )

  beforeEach(() => {
    service = TestBed.get(ComplianceDataService)
    http = TestBed.get(HttpTestingController)
  })

  it('should successfully return expected data', done => {
    service.getAll('MRC01').subscribe(res => {
      expect(res).toEqual(MockComplianceDataExpected)
      done()
    })

    const request = http.expectOne('/api/mock-compliance.json')
    request.flush(MockAPIComplianceDataset)

    http.verify()
  })
})
