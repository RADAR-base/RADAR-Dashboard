import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { Observable } from 'rxjs/Observable'

import { MockSources } from '../../testing/mocks/mock-sources'
import { SourceService } from './source.service'

describe('SourceService', () => {
  let service
  let http
  const actions: Observable<any> = Observable.of()

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SourceService, provideMockActions(() => actions)]
    })
  )

  beforeEach(() => {
    service = TestBed.get(SourceService)
    http = TestBed.get(HttpTestingController)
  })

  it('should return all studies', () => {
    const expectedResult = MockSources

    let actualResult = []
    service.getAll('MRC01').subscribe((result: any[]) => {
      actualResult = result
    })

    http.expectOne('/api/source/getAllSources/MRC01').flush(expectedResult)

    expect(actualResult).toEqual([
      {
        id: '00:07:80:1F:52:F3',
        type: 'EMPATICA',
        summary: null
      },
      {
        id: '00:07:80:1F:17:6B',
        type: 'EMPATICA',
        summary: null
      }
    ])

    http.verify()
  })
})
