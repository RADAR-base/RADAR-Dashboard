import { async, inject, TestBed } from '@angular/core/testing'
import { ChartAccelerationService } from './chart-acceleration.service'
import { HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http'
import { MockBackend } from '@angular/http/testing'
import { MultiTimeSeries } from '../models/multi-time-series.model'
import { MockACData } from '../test/mock-AC-data'

describe('ChartAccelerationService', () => {
  let mockbackend
  let service

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ChartAccelerationService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
  })

  beforeEach(
    inject(
      [ChartAccelerationService, XHRBackend],
      (_service, _mockbackend) => {
        service = _service
        mockbackend = _mockbackend
      }))

  it('should parse data to MultiTimeSeries[] (async)', async(() => {
    const options = new ResponseOptions({ body: MockACData })
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(options))
    })

    service.get().subscribe(data => {
      data.map((obj: MultiTimeSeries) => {
        expect(obj.id).toBeDefined()
        expect(obj.values).toBeDefined()
      })
    })
  }))
})
