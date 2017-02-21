import { async, inject, TestBed } from '@angular/core/testing'
import { ChartHeartRateService } from './chart-heart-rate.service'
import { HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http'
import { MockBackend } from '@angular/http/testing'
import { TimeSeries } from '../models/time-series.model'
import { MockHRData } from '../test/mock-HR-data'

describe('ChartHeartRateService', () => {
  let mockbackend
  let service

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ChartHeartRateService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
  })

  beforeEach(
    inject(
      [ChartHeartRateService, XHRBackend],
      (_service, _mockbackend) => {
        service = _service
        mockbackend = _mockbackend
      }))

  it('should parse data to TimeSeries[] (async)', async(() => {
    const options = new ResponseOptions({ body: MockHRData })
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(options))
    })

    service.get().subscribe(data => {
      data.map((obj: TimeSeries) => {
        expect(obj.value).toBeDefined()
        expect(obj.date).toBeDefined()
      })
    })
  }))
})
