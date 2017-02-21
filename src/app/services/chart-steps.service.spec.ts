import { async, inject, TestBed } from '@angular/core/testing'
import { ChartStepsService } from './chart-steps.service'
import { HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http'
import { MockBackend } from '@angular/http/testing'
import { TimeSeries } from '../models/time-series.model'
import { MockStepsData } from '../test/mock-steps-data'

describe('ChartStepsService', () => {
  let mockbackend
  let service

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ChartStepsService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
  })

  beforeEach(
    inject(
      [ChartStepsService, XHRBackend],
      (_service, _mockbackend) => {
        service = _service
        mockbackend = _mockbackend
      }))

  it('should parse data to TimeSeries[] (async)', async(() => {
    const options = new ResponseOptions({ body: MockStepsData })
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
