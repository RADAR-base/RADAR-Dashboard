import { inject, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { RouterStub } from '../testing/router-stubs'

import { StudyGuard } from './study.guard'

describe('StudyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudyGuard, { provide: Router, useClass: RouterStub }]
    })
  })

  it(
    'should ...',
    inject([StudyGuard], (guard: StudyGuard) => {
      expect(guard).toBeTruthy()
    })
  )
})
