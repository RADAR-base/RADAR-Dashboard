import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed, tick } from '@angular/core/testing'

import {
  MockAcceleration,
  MockAccelerationKeys,
  MockAccelerationTimeFrame,
  MockAccelerationTimeInterval
} from '../../shared/testing/mocks/mock-acceleration'
import { parseTimeHoles } from '../../shared/utils/parse-time-holes'
import { ChartBaseMultiLineComponent } from './chart-base-multi-line.component'

describe('ChartBaseMultiLineComponent', () => {
  let component: ChartBaseMultiLineComponent
  let fixture: ComponentFixture<ChartBaseMultiLineComponent>
  let element: HTMLElement
  let de: DebugElement

  const mockChartData = parseTimeHoles(
    MockAcceleration['dataset'],
    MockAccelerationTimeFrame,
    MockAccelerationTimeInterval
  )

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartBaseMultiLineComponent]
    })

    fixture = TestBed.createComponent(ChartBaseMultiLineComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement

    component.keys = MockAccelerationKeys.keys
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

  it('path should have attribute d when data changes', () => {
    component.chartData = mockChartData
    fixture.detectChanges()

    expect(element.querySelector('path')).toBeTruthy()
    expect(element.querySelector('path').getAttribute('d')).toBeTruthy()
  })

  it('path should not have attribute d before data changes', () => {
    fixture.detectChanges()

    expect(element.querySelector('path')).toBeFalsy()
  })
})
