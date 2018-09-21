import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import {
  MockCompliance,
  MockComplianceExpected
} from '../../../assets/testing/mocks/mock-compliance'
import { reducers } from '../../store'
import { ComplianceDataService } from './compliance-data.service'

describe('ComplianceDataService', () => {
  let service
  let http

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([])
      ],
      providers: [ComplianceDataService]
    }))

  beforeEach(() => {
    service = TestBed.get(ComplianceDataService)
    http = TestBed.get(HttpTestingController)
  })

  it('should successfully return expected data', done => {
    service.getAll('MRC01').subscribe(response => {
      expect(response).toEqual(MockComplianceExpected)
      done()
    })

    const request = http.expectOne('/api/mock-compliance.json')
    request.flush(MockCompliance)

    http.verify()
  })
})
