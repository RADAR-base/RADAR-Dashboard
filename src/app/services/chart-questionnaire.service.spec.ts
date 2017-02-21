import { TestBed, inject, async } from '@angular/core/testing';
import { ChartQuestionnaireService } from './chart-questionnaire.service';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Categorical } from '../models/categorical.model';
import { MockQuestionnaireData } from '../test/mock-questionnaire-data';

describe('ChartQuestionnaireService', () => {
  let mockbackend, service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ChartQuestionnaireService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  beforeEach(
    inject(
      [ChartQuestionnaireService, XHRBackend],
      (_service, _mockbackend) => {
        service = _service;
        mockbackend = _mockbackend;
      }));

  it('should parse data to Categorical[] (async)', async(() => {
    const options = new ResponseOptions({ body: MockQuestionnaireData });
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(options));
    });

    service.get().subscribe(data => {
      data.map((obj: Categorical) => {
        expect(obj.value).toBeDefined();
        expect(obj.name).toBeDefined();
      });
    });
  }));
});
