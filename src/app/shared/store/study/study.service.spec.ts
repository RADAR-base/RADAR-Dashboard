import { inject, TestBed } from '@angular/core/testing'
import { HttpModule } from '@angular/http'

import { StudyService } from './study.service'

describe('StudyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
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
