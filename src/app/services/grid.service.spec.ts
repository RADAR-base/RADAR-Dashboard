/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { GridService } from './grid.service';
import { HttpModule } from '@angular/http';

describe('Service: Grid', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [GridService]
    });
  });

  it('should ...',
    inject([GridService], (service: GridService) => {
      expect(service).toBeTruthy();
    }));
});
