import { TestBed, inject, async } from '@angular/core/testing';
import { ChartStepsService } from './chart-steps.service';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TimeSeries } from '../models/time-series.model';
import { MockStepsData } from '../test/mock-steps-data';

describe('ChartHeartRateService', () => {
  let mockbackend, service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ChartStepsService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  beforeEach(
    inject(
      [ChartStepsService, XHRBackend],
      (_service, _mockbackend) => {
        service = _service;
        mockbackend = _mockbackend;
      }));

  it('should parse data to TimeSeries[] (async)', async(() => {
    const options = new ResponseOptions({ body: MockStepsData });
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(options));
    });

    service.get().subscribe(data => {
      data.map((obj: TimeSeries) => {
        expect(obj.value).toBeDefined();
        expect(obj.date).toBeDefined();
      });
    });
  }));
});
