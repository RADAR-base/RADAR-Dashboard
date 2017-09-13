import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import {
  MockAPISampleDataset,
  MockTimeFrameChartData,
  MockTimeIntervalChartData
} from '../../../shared/testing/mocks/mock-chart-data'
import { ParseTimeHoles } from '../../../shared/utils/parse-time-holes'
import { ChartBaseBarComponent } from './chart-base-bar.component'

describe('ChartBaseBarComponent', () => {
  let component: ChartBaseBarComponent
  let fixture: ComponentFixture<ChartBaseBarComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartBaseBarComponent]
    })

    fixture = TestBed.createComponent(ChartBaseBarComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement
  })

  describe('=> without @Input', () => {
    beforeEach(() => {
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
      component.chartData = ParseTimeHoles(
        MockAPISampleDataset,
        MockTimeFrameChartData,
        MockTimeIntervalChartData
      )

      expect(component.width).toBeGreaterThan(0)
      expect(component.height).toBeGreaterThan(0)
    })

    it('rect should have attribute x and y when data changes', () => {
      // without data
      expect(element.querySelector('rect.bar')).toBeFalsy()

      // with data // needs to be parsed //
      component.chartData = ParseTimeHoles(
        MockAPISampleDataset,
        MockTimeFrameChartData,
        MockTimeIntervalChartData
      )

      // select element again as they'll be instantiated
      expect(element.querySelector('rect.bar')).toBeTruthy()

      const rectElements: any = element.querySelectorAll('rect.bar')

      Object.getOwnPropertyNames(rectElements).forEach(prop => {
        expect(rectElements[prop].getAttribute('x')).toBeTruthy()
        expect(rectElements[prop].getAttribute('y')).toBeTruthy()
      })
    })
  })
})
