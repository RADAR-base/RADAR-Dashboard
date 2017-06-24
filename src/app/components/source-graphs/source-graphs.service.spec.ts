import { inject, TestBed } from '@angular/core/testing'

import { SourceGraphsService } from './source-graphs.service'
import { HttpModule } from '@angular/http'

describe('SourceGraphsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [SourceGraphsService]
    })
  })

  it('should be created', inject([SourceGraphsService], (service: SourceGraphsService) => {
    expect(service).toBeTruthy()
  }))
})
