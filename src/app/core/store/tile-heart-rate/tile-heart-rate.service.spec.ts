import { async, inject, TestBed } from '@angular/core/testing'
import { HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http'
import { MockBackend } from '@angular/http/testing'

import { TimeSeries } from '../../../components/dashboard-tile/models/time-series.model'
import { MockHRData } from '../../../shared/testing/mocks/mock-HR-data'
import { TileHeartRateService } from './tile-heart-rate.service'

describe('TileHeartRateService', () => {
  let mockbackend
  let service

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        TileHeartRateService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
  })

  beforeEach(
    inject(
      [TileHeartRateService, XHRBackend],
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
