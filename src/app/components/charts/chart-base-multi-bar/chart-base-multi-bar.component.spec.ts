import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import {
  MockAPIComplianceDataset,
  MockComplianceKeys,
  MockTimeFrameCompliance,
  MockTimeIntervalCompliance
} from '../../../shared/testing/mocks/mock-compliance-data'
import { parseTimeHoles } from '../../../shared/utils/parse-time-holes'
import { ChartBaseMultiBarComponent } from './chart-base-multi-bar.component'

describe('ChartBaseMultiBarComponent', () => {
  let component: ChartBaseMultiBarComponent
  let fixture: ComponentFixture<ChartBaseMultiBarComponent>
  let element: HTMLElement
  let de: DebugElement

  const mockChartData = parseTimeHoles(
    MockAPIComplianceDataset,
    MockTimeFrameCompliance,
    MockTimeIntervalCompliance
  )

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartBaseMultiBarComponent]
    })

    fixture = TestBed.createComponent(ChartBaseMultiBarComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement

    component.keys = MockComplianceKeys
  })

  it('should create component', () => {
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should NOT update() and change size before data changes', () => {
    fixture.detectChanges()

    expect(component.width).toBeFalsy()
    expect(component.height).toBeFalsy()
    expect(component.chartData).toBeFalsy()
  })

  it('rect should NOT have attribute x and y before data changes', () => {
    fixture.detectChanges()

    expect(element.querySelector('rect.bar')).toBeFalsy()
  })

  it('should update() and change size when data changes', () => {
    component.chartData = mockChartData
    fixture.detectChanges()

    expect(component.width).toBeGreaterThan(0)
    expect(component.height).toBeGreaterThan(0)
  })

  it('rect should have attribute x and y when data changes', () => {
    component.chartData = mockChartData
    fixture.detectChanges()

    expect(element.querySelector('rect.back-bar')).toBeTruthy()

    const rectElements: any = element.querySelectorAll('rect.bar')

    Object.getOwnPropertyNames(rectElements).forEach(prop => {
      expect(rectElements[prop].getAttribute('x')).toBeTruthy()
      expect(rectElements[prop].getAttribute('y')).toBeTruthy()
    })
  })
})
