import { TestBed, inject } from '@angular/core/testing';
import { GridService } from './grid.service';
import { HttpModule } from '@angular/http';

describe('GridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [GridService]
    });
  });

  it('should ...', inject([GridService], (service: GridService) => {
    expect(service).toBeTruthy();
  }));
});
