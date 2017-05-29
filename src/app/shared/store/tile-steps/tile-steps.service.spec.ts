import { async, inject, TestBed } from '@angular/core/testing'
import { HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http'
import { MockBackend } from '@angular/http/testing'

import { TimeSeries } from '../../models/time-series.model'
import { MockStepsData } from '../../testing/mocks/mock-steps-data'
import { TileStepsService } from './tile-steps.service'

describe('TileStepsService', () => {
  let mockbackend
  let service

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        TileStepsService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
  })

  beforeEach(
    inject(
      [TileStepsService, XHRBackend],
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
