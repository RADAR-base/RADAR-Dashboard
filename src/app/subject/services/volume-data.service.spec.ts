import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { MockConfig } from '../../../assets/testing/mocks/mock-config'
import {
  MockSensorDataAPIResponse,
  MockVolumeOptions,
  MockVolumeSources
} from '../../../assets/testing/mocks/mock-sources'
import { AppConfig } from '../../shared/app-config'
import { DescriptiveStatistic } from '../../shared/enums/descriptive-statistic.enum'
import { reducers } from '../../store'
import { VolumeDataService } from './volume-data.service'

describe('VolumeDataService', () => {
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
        VolumeDataService,
        { provide: AppConfig, useClass: MockConfig }
      ]
    })

    service = TestBed.get(VolumeDataService)
    http = TestBed.get(HttpTestingController)
  })

  it('should successfully return expected data for one sensor', done => {
    const options = MockVolumeOptions
    const sources = MockVolumeSources
    const expected = MockSensorDataAPIResponse

    service.getData(sources, options).subscribe(response => {
      expect(response).toEqual(expected)
      done()
    })

    const request = http.expectOne(r => {
      return (
        r.url ===
        `/api/aggregate/${options.studyName}/${
          options.subjectId
        }/${DescriptiveStatistic[
          options.descriptiveStatistic
        ].toLowerCase()}?timeWindow=${
          options.timeWindow
        }&startTime=${options.timeFrame.startDateTime.toISOString()}&endTime=${options.timeFrame.endDateTime.toISOString()}`
      )
    })

    request.flush(MockSensorDataAPIResponse)
    http.verify()
  })
})
