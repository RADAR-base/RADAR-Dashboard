import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { TestBed, async } from '@angular/core/testing'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { AppConfig } from '../../shared/app-config'
import { DescriptiveStatistic } from '../../shared/enums/descriptive-statistic.enum'
import { TimeWindow } from '../../shared/enums/time-window.enum'
import { MockConfig } from '../../shared/testing/mocks/mock-config'
import {
  MockSensorDataAPIResponse,
  MockSensorDataResult,
  MockSensorsOptions
} from '../../shared/testing/mocks/mock-sources'
import { MockSources } from '../../shared/testing/mocks/mock-sources'
import { reducers } from '../../store'
import { SensorsDataService } from './sensors-data.service'

describe('SensorsDataService', () => {
  let service
  let http

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([])
      ],
      providers: [
        SensorsDataService,
        { provide: AppConfig, useClass: MockConfig }
      ]
    })

    service = TestBed.get(SensorsDataService)
    http = TestBed.get(HttpTestingController)
  })

  it('should successfully return expected data for one sensor', done => {
    const options = MockSensorsOptions
    const sources = MockSources
    const expected = MockSensorDataResult

    service.getData(sources, options).subscribe(response => {
      expect(response).toEqual(expected)
      done()
    })

    const request = http.expectOne(
      `/api/data/${options.studyName}/${options.subjectId}/${
        sources[0].sourceId
      }/${sources[0].sourceData[0].sourceDataName}/${
        DescriptiveStatistic[options.descriptiveStatistic]
      }?timeWindow=${options.timeWindow}`
    )

    request.flush(MockSensorDataAPIResponse)
    http.verify()
  })
})
