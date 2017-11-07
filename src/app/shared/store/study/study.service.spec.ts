import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { MockStudies } from '../../testing/mocks/mock-studies.spec'
import { Study } from './study.model'
import { StudyService } from './study.service'

describe('StudyService', () => {
  let service
  let http

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudyService]
    })
  )

  beforeEach(() => {
    service = TestBed.get(StudyService)
    http = TestBed.get(HttpTestingController)
  })

  it('should return all studies', () => {
    const expectedResult = MockStudies
    let actualResult = []
    service.getAll().subscribe((users: any[]) => {
      actualResult = users
    })

    http.expectOne('/api/mock-all-studies.json').flush(expectedResult)
    expect(actualResult).toEqual([
      {
        id: '0',
        name: 'Study 0'
      },
      {
        id: '1',
        name: 'Study 1'
      },
      {
        id: '2',
        name: 'Study 2'
      }
    ])
  })
  it('should return study by id', () => {
    const expectedResult = MockStudies
    let actualResult = []
    service.getById('0').subscribe((result: any[]) => {
      actualResult = result
    })

    http.expectOne('/api/mock-all-studies.json').flush(expectedResult)
    const expected: Study = { id: '0', name: 'Study 0' }
    expect<any>([actualResult]).toEqual([expected])
  })
})
