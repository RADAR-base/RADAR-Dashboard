import { TestBed, inject } from '@angular/core/testing'
import { Router } from '@angular/router'

import { RouterStub } from '../../shared/testing/router-stubs'
import { StudyGuard } from './study.guard'

describe('StudyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudyGuard, { provide: Router, useClass: RouterStub }]
    })
  })

  it('should ...', inject([StudyGuard], (guard: StudyGuard) => {
    expect(guard).toBeTruthy()
  }))
})
