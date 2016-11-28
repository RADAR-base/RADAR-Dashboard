/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { ChartHeartRateService } from './heart-rate.service';
import { HttpModule } from '@angular/http';

describe('ChartHeartRateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ChartHeartRateService]
    });
  });

  it('should ...', inject([ChartHeartRateService], (service: ChartHeartRateService) => {
    expect(service).toBeTruthy();
  }));
});
