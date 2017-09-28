import { DebugElement } from '@angular/core'
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing'

import {
  MockAPISampleDataset,
  MockTimeFrameChartData,
  MockTimeIntervalChartData
} from '../../shared/testing/mocks/mock-chart-data'
import { MockSensorMulti } from '../../shared/testing/mocks/mock-sensor-data'
import { parseTimeHoles } from '../../shared/utils/parse-time-holes'
import { ChartBaseMultiLineComponent } from './chart-base-multi-line.component'

describe('ChartBaseMultiLineComponent', () => {
  let component: ChartBaseMultiLineComponent
  let fixture: ComponentFixture<ChartBaseMultiLineComponent>
  let element: HTMLElement
  let de: DebugElement

  const mockChartData = parseTimeHoles(
    MockAPISampleDataset,
    MockTimeFrameChartData,
    MockTimeIntervalChartData
  )

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartBaseMultiLineComponent]
    })

    fixture = TestBed.createComponent(ChartBaseMultiLineComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement

    component.keys = MockSensorMulti.keys
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

  it('path.line should NOT have attribute "d" before data changes', () => {
    fixture.detectChanges()
    const lineElements = element.querySelectorAll('path.line')
    const attr = 'd'

    Object.getOwnPropertyNames(lineElements).forEach(prop => {
      expect(lineElements[prop].getAttribute(attr)).toBeFalsy()
    })
  })

  it(
    'path.line should have attribute "d" when data changes (fakeAsync)',
    fakeAsync(() => {
      component.chartData = mockChartData
      fixture.detectChanges()

      const lineElements = element.querySelectorAll('path.line')
      const attr = 'd'

      // wait for transition
      tick(500)
      Object.getOwnPropertyNames(lineElements).forEach(prop => {
        expect(lineElements[prop].getAttribute(attr)).toBeTruthy()
      })
    })
  )
})
