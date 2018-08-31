import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { StoreModule, combineReducers } from '@ngrx/store'

import { ChartBaseBarComponent } from '../../../../charts/chart-base-bar/chart-base-bar.component'
import {
  MockAPISampleDataset,
  MockTimeFrameChartData,
  MockTimeIntervalChartData
} from '../../../../shared/testing/mocks/mock-chart-data'
import { parseTimeHoles } from '../../../../shared/utils/parse-time-holes'
import * as fromRoot from '../../../../store'
import * as fromFeature from '../../../store'
import { SourceVolumeComponent } from './source-volume.component'

describe('SourceVolumeComponent', () => {
  let component: SourceVolumeComponent
  let fixture: ComponentFixture<SourceVolumeComponent>

  const mockChartData = parseTimeHoles(
    MockAPISampleDataset,
    MockTimeFrameChartData,
    MockTimeIntervalChartData
  )
  const mockDates = [
    new Date(MockTimeFrameChartData.startDateTime),
    new Date(MockTimeFrameChartData.endDateTime)
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          subject: combineReducers(fromFeature.reducers)
        })
      ],
      declarations: [ChartBaseBarComponent, SourceVolumeComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceVolumeComponent)
    component = fixture.componentInstance
  })

  it('should be created', () => {
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should emit data on brush and bind value to this parent component', () => {
    component.data = mockChartData
    fixture.detectChanges()

    const comp: ChartBaseBarComponent = fixture.debugElement.query(
      By.directive(ChartBaseBarComponent)
    ).componentInstance
    comp.hasBrush = true
    comp.categorical = false
    comp.data = mockChartData
    comp.brushMove.emit(mockDates)
    fixture.detectChanges()

    expect(component.sensorDataTimeFrame).toBe(mockDates)
  })
})
