import { HttpClientModule } from '@angular/common/http'
import { TestBed, inject } from '@angular/core/testing'

import { SubjectService } from './subject.service'

describe('SubjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SubjectService]
    })
  })

  it(
    'should be created',
    inject([SubjectService], (service: SubjectService) => {
      expect(service).toBeTruthy()
    })
  )
})
