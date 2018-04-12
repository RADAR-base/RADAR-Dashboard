import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { Study } from '../../shared/models/study.model'
import { MockStudies } from '../../shared/testing/mocks/mock-studies.spec'
import { StudyService } from './study.service'

describe('StudyService', () => {
  let service
  let http

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudyService]
    }))

  beforeEach(() => {
    service = TestBed.get(StudyService)
    http = TestBed.get(HttpTestingController)
  })

  it('should return study by id', () => {
    const mock = MockStudies
    let actual: Study

    service.getById('0').subscribe((result: Study) => {
      actual = result
    })

    http.expectOne('/api/mock-all-studies.json').flush(mock)
    expect<Study>(actual).toEqual(mock.dataset[0])
  })
})
