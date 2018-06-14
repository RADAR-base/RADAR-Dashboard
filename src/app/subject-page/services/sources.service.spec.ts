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

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([])
      ],
      providers: [SourcesService]
    }))

  beforeEach(() => {
    service = TestBed.get(SourcesService)
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
