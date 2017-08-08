import { TestBed, inject } from '@angular/core/testing'
import { HttpModule } from '@angular/http'

import { SourceService } from './source.service'

describe('SourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [SourceService]
    })
  })

  it(
    'should be created',
    inject([SourceService], (service: SourceService) => {
      expect(service).toBeTruthy()
    })
  )
})
