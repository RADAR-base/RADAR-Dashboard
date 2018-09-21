import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { MockStudies } from '../../../assets/testing/mocks/mock-studies'
import { Study } from '../../shared/models/study.model'
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

  it('should return study by id', done => {
    const studyName = MockStudies[0].projectName
    const mock = MockStudies[0]

    service.getById(studyName).subscribe((result: Study) => {
      expect(result).toEqual(mock)
      done()
    })

    http.expectOne(`/api/projects/${studyName}`).flush(mock)
  })
})
