import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import {
  MockAPISampleDataset,
  MockTimeFrameChartData,
  MockTimeIntervalChartData
} from '../../shared/testing/mocks/mock-chart-data'
import { parseTimeHoles } from '../../shared/utils/parse-time-holes'
import { ChartBaseBarComponent } from './chart-base-bar.component'

describe('ChartBaseBarComponent', () => {
  let component: ChartBaseBarComponent
  let fixture: ComponentFixture<ChartBaseBarComponent>
  let element: HTMLElement
  let de: DebugElement

  const mockChartData = parseTimeHoles(
    MockAPISampleDataset,
    MockTimeFrameChartData,
    MockTimeIntervalChartData
  )

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartBaseBarComponent]
    })

    fixture = TestBed.createComponent(ChartBaseBarComponent)
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
})
