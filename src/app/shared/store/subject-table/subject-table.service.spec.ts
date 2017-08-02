import { TestBed, inject } from '@angular/core/testing'
import { HttpModule } from '@angular/http'

import { SubjectTableService } from './subject-table.service'

describe('SubjectTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [SubjectTableService]
    })
  })

  it('should be created', inject([SubjectTableService], (service: SubjectTableService) => {
    expect(service).toBeTruthy()
  }))
})
