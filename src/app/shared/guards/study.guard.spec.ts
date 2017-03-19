import { TestBed, async, inject } from '@angular/core/testing';

import { StudyGuard } from './study.guard';

describe('StudyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudyGuard]
    });
  });

  it('should ...', inject([StudyGuard], (guard: StudyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
