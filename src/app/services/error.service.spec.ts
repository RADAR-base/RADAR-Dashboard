import { TestBed, inject } from '@angular/core/testing';
import { ErrorService } from './error.service';
import { HttpModule } from '@angular/http';

describe('ErrorLoggerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ErrorService]
    });
  });

  it('should ...', inject([ErrorService], (service: ErrorService) => {
    expect(service).toBeTruthy();
  }));
});
