import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { Study } from '../../shared/models/study.model'
import { MockStudies } from '../../shared/testing/mocks/mock-studies'
import { StudiesService } from './studies.service'

describe('StudyService', () => {
  let service
  let http

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudiesService]
    }))

  beforeEach(() => {
    service = TestBed.get(StudiesService)
    http = TestBed.get(HttpTestingController)
  })

  it('should return all studies', done => {
    const mock = MockStudies

    service.getAll().subscribe((users: Study[]) => {
      expect(users).toEqual(mock)
      done()
    })

    http.expectOne('/api/projects').flush(mock)
    http.verify()
  })
})
