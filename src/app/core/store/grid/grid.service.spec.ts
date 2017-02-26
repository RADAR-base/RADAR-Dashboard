import { inject, TestBed } from '@angular/core/testing'
import { HttpModule } from '@angular/http'
import { GridService } from './grid.service'

describe('GridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [GridService]
    })
  })

  it('should ...', inject([GridService], (service: GridService) => {
    expect(service).toBeTruthy()
  }))
})
