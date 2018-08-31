import { ComponentFixture, TestBed } from '@angular/core/testing'

import {
  MockAPISampleDataset,
  MockTimeFrameChartData,
  MockTimeIntervalChartData
} from '../../shared/testing/mocks/mock-chart-data'
import { parseTimeHoles } from '../../shared/utils/parse-time-holes'
import { SourceGraphsModule } from '../../subject/components/source-graphs/source-graphs.module'
import { ChartBaseBarComponent } from './chart-base-bar.component'

describe('ChartBaseBarComponent', () => {
  let component: ChartBaseBarComponent
  let fixture: ComponentFixture<ChartBaseBarComponent>
  let element: HTMLElement

  const mockChartData = parseTimeHoles(
    MockAPISampleDataset,
    MockTimeFrameChartData,
    MockTimeIntervalChartData
  )
  const mockTimeFrame = [
    MockTimeFrameChartData.startDateTime,
    MockTimeFrameChartData.endDateTime
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SourceGraphsModule]
    })

    fixture = TestBed.createComponent(ChartBaseBarComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
  })

  it('should be created', () => {
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should NOT update() and change size before data changes', () => {
    fixture.detectChanges()

    // without data
    expect(component.width).toBeFalsy()
    expect(component.height).toBeFalsy()
    expect(component.chartData).toBeFalsy()
  })

  it('should update() and change size if data changes', () => {
    component.chartData = mockChartData
    fixture.detectChanges()

    expect(component.width).toBeGreaterThan(0)
    expect(component.height).toBeGreaterThan(0)
  })

  it('rect should NOT have attribute x and y before data changes', () => {
    fixture.detectChanges()

    expect(element.querySelector('rect.bar')).toBeFalsy()
  })

  it('rect should have attribute x and y when data changes', () => {
    component.chartData = mockChartData
    fixture.detectChanges()

    // select element again as they'll be instantiated
    expect(element.querySelector('rect.bar')).toBeTruthy()

    const rectElements: any = element.querySelectorAll('rect.bar')

    Object.getOwnPropertyNames(rectElements).forEach(prop => {
      expect(rectElements[prop].getAttribute('x')).toBeTruthy()
      expect(rectElements[prop].getAttribute('y')).toBeTruthy()
    })
  })

  it('should create bars when chart has brush component', () => {
    component.hasBrush = true
    component.chartData = mockChartData
    component.sensorDataTimeFrame = [
      MockTimeFrameChartData.startDateTime,
      MockTimeFrameChartData.endDateTime
    ]
    fixture.detectChanges()

    expect(element.querySelector('.bar')).toBeTruthy()
  })

  it('should create brush when hasBrush is set to true', () => {
    component.hasBrush = true
    component.chartData = mockChartData
    component.sensorDataTimeFrame = mockTimeFrame
    fixture.detectChanges()

    expect(element.querySelector('.brush')).toBeTruthy()
  })

  it('should update brush from timeFrame data', () => {
    component.hasBrush = true
    component.chartData = mockChartData
    component.sensorDataTimeFrame = mockTimeFrame
    fixture.detectChanges()

    expect(element.querySelector('.brush')).toBeTruthy()
  })

  it('should emit data on brush', () => {
    component.hasBrush = true
    component.categorical = false
    component.brushWidthDefault = 200
    component.data = mockChartData

    component.brushMove.subscribe(d => {
      expect(d).toBeDefined()
    })

    fixture.detectChanges()

    expect(element.querySelector('.brush')).toBeTruthy()
  })
})
