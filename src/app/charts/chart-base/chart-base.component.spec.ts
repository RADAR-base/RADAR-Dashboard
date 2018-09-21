import { ComponentFixture, TestBed } from '@angular/core/testing'

import {
  MockAPISampleDataset,
  MockTimeFrameChartData,
  MockTimeIntervalChartData
} from '../../../assets/testing/mocks/mock-chart-data'
import { parseTimeHoles } from '../../shared/utils/parse-time-holes'
import { ChartBaseComponent } from './chart-base.component'

describe('ChartBaseComponent', () => {
  let component: ChartBaseComponent
  let fixture: ComponentFixture<ChartBaseComponent>
  let element: HTMLElement

  const mockChartData = parseTimeHoles(
    MockAPISampleDataset,
    MockTimeFrameChartData,
    MockTimeIntervalChartData
  )

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartBaseComponent]
    })

    fixture = TestBed.createComponent(ChartBaseComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
  })

  it('should be created', () => {
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should create a chart', () => {
    fixture.detectChanges()

    expect(element.querySelector('g.chart')).toBeTruthy()
  })

  it('should create both axis', () => {
    component.hasXAxis = true
    component.hasYAxis = true
    fixture.detectChanges()

    expect(element.querySelector('g.axis.axis--x')).toBeTruthy()
    expect(element.querySelector('g.axis.axis--y')).toBeTruthy()
  })

  it('should NOT create both axis', () => {
    fixture.detectChanges()

    expect(element.querySelector('g.axis.axis--x')).toBeFalsy()
    expect(element.querySelector('g.axis.axis--y')).toBeFalsy()
  })

  it('should create the tooltip box', () => {
    component.hasTooltip = true
    fixture.detectChanges()

    expect(element.querySelector('g rect.tooltip-mouse-box')).toBeTruthy()
  })

  it('should NOT create the tooltip box', () => {
    fixture.detectChanges()

    expect(element.querySelector('g rect.tooltip-mouse-box')).toBeFalsy()
  })

  it('should NOT update() and change size before data changes', () => {
    fixture.detectChanges()

    expect(component.width).toBeFalsy()
    expect(component.height).toBeFalsy()
    expect(component.chartData).toBeFalsy()
  })

  it('should update() and change size when data changes', () => {
    component.chartData = mockChartData
    fixture.detectChanges()

    expect(component.width).toBeGreaterThan(0)
    expect(component.height).toBeGreaterThan(0)
  })
})
