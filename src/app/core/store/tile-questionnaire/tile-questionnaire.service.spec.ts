import { async, inject, TestBed } from '@angular/core/testing'
import { HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http'
import { MockBackend } from '@angular/http/testing'

import { Categorical } from '../../../components/dashboard-tile/models/categorical.model'
import { MockQuestionnaireData } from '../../../shared/testing/mocks/mock-questionnaire-data'
import { TileQuestionnaireService } from './tile-questionnaire.service'

describe('TileQuestionnaireService', () => {
  let mockbackend
  let service

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        TileQuestionnaireService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
  })

  beforeEach(
    inject(
      [TileQuestionnaireService, XHRBackend],
      (_service, _mockbackend) => {
        service = _service
        mockbackend = _mockbackend
      }))

  it('should parse data to Categorical[] (async)', async(() => {
    const options = new ResponseOptions({ body: MockQuestionnaireData })
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(options))
    })

    service.get().subscribe(data => {
      data.map((obj: Categorical) => {
        expect(obj.value).toBeDefined()
        expect(obj.name).toBeDefined()
      })
    })
  }))
})
