import { TestBed, inject, async } from '@angular/core/testing';
import { ChartHeartRateService } from './heart-rate.service';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HeartRate } from '../../models/charts/heart-rate.model';

describe('ChartHeartRateService', () => {
  let mockbackend, service;
  let mockData = `
  {
    "header": {
      "descriptive_statistic": "average",
      "unit": "beats_per_min",
      "effective_time_frame": {
        "start_date_time": "2016-10-27T20:02:20Z",
        "end_date_time": "2016-10-27T20:06:50Z"
      }
    },
    "dataset": [
      {
        "effective_time_frame": {
          "start_date_time": "2016-10-27T20:02:20Z",
          "end_date_time": "2016-10-27T20:02:30Z"
        },
        "heart_rate": {
          "value": 60.17274154968215
        }
      },
      {
        "effective_time_frame": {
          "start_date_time": "2016-10-27T20:03:00Z",
          "end_date_time": "2016-10-27T20:03:10Z"
        },
        "heart_rate": {
          "value": 108.39180563508566
        }
      }
    ]  
  }`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ChartHeartRateService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  beforeEach(
    inject(
      [ChartHeartRateService, XHRBackend],
      (_service, _mockbackend) => {
        service = _service;
        mockbackend = _mockbackend;
      }));

  it('should parse data to HeartRate[] (async)', async(() => {
    let options = new ResponseOptions({ body: mockData });
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(options));
    });

    service.get().subscribe(data => {
      data.map((obj: HeartRate) => {
        expect(obj.value).toBeDefined();
        expect(obj.date).toBeDefined();
      });
    });
  }));
});
