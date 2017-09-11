import { HttpClientModule } from '@angular/common/http'
import { TestBed, inject } from '@angular/core/testing'

import { SensorsService } from './sensors.service'
import { Observable } from 'rxjs/Observable'
import { provideMockActions } from '@ngrx/effects/testing'

describe('SensorsService', () => {
  const actions: Observable<any> = Observable.of()

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SensorsService, provideMockActions(() => actions)]
    })
  })

  it(
    'should be created',
    inject([SensorsService], (service: SensorsService) => {
      expect(service).toBeTruthy()
    })
  )
})
