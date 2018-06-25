import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { MockSources } from '../../shared/testing/mocks/mock-sources'
import { reducers } from '../../store'
import { SourcesService } from './sources.service'

describe('SourcesService', () => {
  let service
  let http

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([])
      ],
      providers: [SourcesService]
    })

    service = TestBed.get(SourcesService)
    http = TestBed.get(HttpTestingController)
  })

  it('should return all studies', () => {
    const studyName = 'abc'
    const subjectId = '123'
    const expected = MockSources

    service.getAll(studyName, subjectId).subscribe((result: any[]) => {
      expect(result).toEqual(expected)
    })

    http
      .expectOne(`/api/projects/${studyName}/subjects/${subjectId}`)
      .flush(expected)

    http.verify()
  })
})
