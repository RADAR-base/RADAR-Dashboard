import { inject, TestBed } from '@angular/core/testing'
import { HttpModule } from '@angular/http'

import { SourceGraphsService } from './source-graphs.service'

describe('SourceGraphsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [SourceGraphsService]
    })
  })

  it(
    'should be created',
    inject([SourceGraphsService], (service: SourceGraphsService) => {
      expect(service).toBeTruthy()
    })
  )
})
