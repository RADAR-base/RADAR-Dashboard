import { HttpClientModule } from '@angular/common/http'
import { TestBed, inject } from '@angular/core/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { Observable } from 'rxjs/Observable'

import { SourceService } from './source.service'

describe('SourceService', () => {
  const actions: Observable<any> = Observable.of()

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SourceService, provideMockActions(() => actions)]
    })
  })

  it(
    'should be created',
    inject([SourceService], (service: SourceService) => {
      expect(service).toBeTruthy()
    })
  )
})
