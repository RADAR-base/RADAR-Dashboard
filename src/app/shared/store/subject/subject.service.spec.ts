import { TestBed, inject } from '@angular/core/testing';

import { SubjectService } from './subject.service';

describe('SubjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubjectService]
    });
  });

  it('should be created', inject([SubjectService], (service: SubjectService) => {
    expect(service).toBeTruthy();
  }));
});
