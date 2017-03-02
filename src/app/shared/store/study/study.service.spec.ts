import { inject, TestBed } from '@angular/core/testing'

import { StudyService } from './study.service'

describe('StudyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudyService]
    })
  })

  it('should ...', inject([StudyService], (service: StudyService) => {
    expect(service).toBeTruthy()
  }))
})
