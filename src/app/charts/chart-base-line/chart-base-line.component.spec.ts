import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import {
  MockAPISampleDataset,
  MockTimeFrameChartData,
  MockTimeIntervalChartData
} from '../../shared/testing/mocks/mock-chart-data'
import { parseTimeHoles } from '../../shared/utils/parse-time-holes'
import { ChartBaseLineComponent } from './chart-base-line.component'

describe('ChartBaseLineComponent', () => {
  let component: ChartBaseLineComponent
  let fixture: ComponentFixture<ChartBaseLineComponent>
  let element: HTMLElement
  let de: DebugElement

  const mockChartData = parseTimeHoles(
    MockAPISampleDataset,
    MockTimeFrameChartData,
    MockTimeIntervalChartData
  )
  const mouseEventObject = { clientX: 800, clientY: 300 }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartBaseLineComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(ChartBaseLineComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement
  })

  it('should be created', () => {
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should NOT update() and change size before data changes', () => {
    fixture.detectChanges()

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

  it('should NOT contain path when data changes', () => {
    fixture.detectChanges()

    expect(element.querySelectorAll('g.chart .line path').length).toEqual(0)
  })

  it('should contain path when data changes', () => {
    component.chartData = mockChartData
    fixture.detectChanges()

    expect(
      element.querySelectorAll('g.chart .line path').length
    ).toBeGreaterThan(0)
  })

  it('should NOT have a linearGradient', () => {
    fixture.detectChanges()

    expect(
      element.querySelector('linearGradient[id^="hr-gradient"]')
    ).toBeFalsy()
  })

  it('should have a linearGradient', () => {
    component.hasGradient = true
    fixture.detectChanges()

    expect(
      element.querySelector('linearGradient[id^="hr-gradient"]')
    ).toBeTruthy()
  })

  it('linearGradient should have attributes "y1, y2" when data changes', () => {
    component.hasGradient = true
    fixture.detectChanges()

    // with data // needs to be parsed //
    component.chartData = mockChartData

    const gradient = de.nativeElement.querySelector(
      'linearGradient[id^="hr-gradient"]'
    )
    expect(gradient.getAttribute('y1')).toBeGreaterThan(0)
    expect(gradient.getAttribute('y2')).toBeGreaterThan(0)
  })

  it('should emit data on tooltipMouseMove', () => {
    spyOn(component.tooltipMouseMove, 'emit')
    component.hasTooltip = true
    component.chartData = mockChartData
    fixture.detectChanges()

    const evt = new MouseEvent('mousemove', mouseEventObject)
    element.querySelector('.tooltip-mouse-box').dispatchEvent(evt)

    expect(element.querySelector('.tooltip-mouse-box')).toBeTruthy()
    expect(component.tooltipMouseMove.emit).toHaveBeenCalled()
  })
})
