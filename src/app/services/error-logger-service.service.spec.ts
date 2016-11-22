/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ErrorLoggerService } from './error-logger-service.service';

describe('ErrorLoggerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorLoggerService]
    });
  });

  it('should ...', inject([ErrorLoggerService], (service: ErrorLoggerService) => {
    expect(service).toBeTruthy();
  }));
});
