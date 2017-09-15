import { DebugElement } from '@angular/core'
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing'
import { StoreModule } from '@ngrx/store'

import { reducers } from '../../../shared/store'
import {
  MockAPISampleDataset,
  MockTimeFrameChartData,
  MockTimeIntervalChartData
} from '../../../shared/testing/mocks/mock-chart-data'
import { MockSensorMulti } from '../../../shared/testing/mocks/mock-sensor-data'
import { parseTimeHoles } from '../../../shared/utils/parse-time-holes'
import { ChartBaseMultiLineComponent } from './chart-base-multi-line.component'

describe('ChartBaseMultiLineComponent', () => {
  let component: ChartBaseMultiLineComponent
  let fixture: ComponentFixture<ChartBaseMultiLineComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)],
      declarations: [ChartBaseMultiLineComponent]
    })

    fixture = TestBed.createComponent(ChartBaseMultiLineComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement

    component.keys = MockSensorMulti.keys

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should create a chart', () => {
    expect(element.querySelector('g.chart')).toBeTruthy()
  })

  it('should update() and change size if data changes', () => {
    // without data
    expect(component.width).toBeFalsy()
    expect(component.height).toBeFalsy()
    expect(component.chartData).toBeFalsy()

    // with data // needs to be parsed //
    component.chartData = parseTimeHoles(
      MockAPISampleDataset,
      MockTimeFrameChartData,
      MockTimeIntervalChartData
    )

    expect(component.width).toBeGreaterThan(0)
    expect(component.height).toBeGreaterThan(0)
  })

  it(
    'path.line should have attribute "d" when data changes (fakeAsync)',
    fakeAsync(() => {
      const lineElements = element.querySelectorAll('path.line')
      const attr = 'd'

      // without data
      Object.getOwnPropertyNames(lineElements).forEach(prop => {
        expect(lineElements[prop].getAttribute(attr)).toBeFalsy()
      })

      // with data // needs to be parsed //
      component.chartData = parseTimeHoles(
        MockAPISampleDataset,
        MockTimeFrameChartData,
        MockTimeIntervalChartData
      )

      // wait for transition
      tick(500)
      Object.getOwnPropertyNames(lineElements).forEach(prop => {
        expect(lineElements[prop].getAttribute(attr)).toBeTruthy()
      })
    })
  )
})
