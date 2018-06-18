import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { Subject } from '../../shared/models/subject.model'
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

  it('should list subjects', done => {
    const studyName = 'abc'
    const mock = [
      {
        subjectId: 'e60d4b14-b954',
        status: 'ACTIVATED',
        humanReadableId: 'participant abc',
        projectName: studyName,
        lastSeen: '2018-05-09T08:16:07.934Z',
        sources: []
      },
      {
        subjectId: '3907dab9-b2ae',
        status: 'ACTIVATED',
        humanReadableId: 'patient xyz',
        projectName: studyName,
        lastSeen: '2018-02-28T00:29:41.825Z',
        sources: []
      }
    ]

    service.getAll(studyName).subscribe((result: Subject[]) => {
      expect(result).toEqual(mock)
      done()
    })

    http.expectOne(`/api/projects/${studyName}/subjects`).flush(mock)
  })
})
