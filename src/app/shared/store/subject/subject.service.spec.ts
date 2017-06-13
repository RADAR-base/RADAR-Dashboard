import { inject, TestBed } from '@angular/core/testing'
import { HttpModule } from '@angular/http'

import { SubjectService } from './subject.service'

describe('SubjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        SubjectService
      ]
    })
  })

  it('should be created', inject([SubjectService], (service: SubjectService) => {
    expect(service).toBeTruthy()
  }))
})
