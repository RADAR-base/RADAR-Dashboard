import { TestBed, inject } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { HttpModule } from '@angular/http';

describe('ConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ConfigService]
    });
  });

  it('should ...', inject([ConfigService], (service: ConfigService) => {
    expect(service).toBeTruthy();
  }));
});
