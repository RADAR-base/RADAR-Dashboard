import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { SubjectService } from './subject.service'

describe('SubjectService', () => {
  let service
  let http

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubjectService]
    }))

  beforeEach(() => {
    service = TestBed.get(SubjectService)
    http = TestBed.get(HttpTestingController)
  })

  it('should list empty subjects if empty', () => {
    const expectedResult = { studyId: 0, subjects: [] }

    let actualResult = []
    service.getAll(0).subscribe((result: any[]) => {
      actualResult = result
    })

    http.expectOne('/api/subject/getAllSubjects/0').flush(expectedResult)

    expect(actualResult).toEqual([])
  })
})
