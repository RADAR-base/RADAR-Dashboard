import { HttpClientModule } from '@angular/common/http'
import { TestBed, inject } from '@angular/core/testing'

import { StudyService } from './study.service'

describe('StudyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [StudyService]
    })
  })

  it(
    'should ...',
    inject([StudyService], (service: StudyService) => {
      expect(service).toBeTruthy()
    })
  )
})
