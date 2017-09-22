import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import {
  MockAPISampleDataset,
  MockTimeFrameChartData,
  MockTimeIntervalChartData
} from '../../../shared/testing/mocks/mock-chart-data'
import { parseTimeHoles } from '../../../shared/utils/parse-time-holes'
import { ChartBaseAreaComponent } from './chart-base-area.component'

describe('ChartBaseAreaComponent', () => {
  let component: ChartBaseAreaComponent
  let fixture: ComponentFixture<ChartBaseAreaComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartBaseAreaComponent]
    })

    fixture = TestBed.createComponent(ChartBaseAreaComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement

    fixture.detectChanges()
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
    })

    it('should have area property when data changes', () => {
      // without data
      expect(element.querySelector('g.chart.area')).toBeFalsy()
    })
  })

  describe('=> with @Input and hasXAxis & hasYAxis', () => {
    beforeEach(() => {
      component.chartData = parseTimeHoles(
        MockAPISampleDataset,
        MockTimeFrameChartData,
        MockTimeIntervalChartData
      )
      component.hasYAxis = true
      component.hasXAxis = true
      fixture.detectChanges()
    })

    it('should create', () => {
      expect(component).toBeTruthy()
    })

    it('should create a chart', () => {
      expect(element.querySelector('g.chart')).toBeTruthy()
    })

    it('should update() and change size if data changes', () => {
      // with data
      expect(component.width).toBeGreaterThan(0)
      expect(component.height).toBeGreaterThan(0)
    })

    it('area should have attribute d when data changes', () => {
      // with data
      // select element again as they'll be instantiated
      expect(element.querySelector('.area')).toBeTruthy()

      const areaElement: any = element.querySelectorAll('.area')

      Object.getOwnPropertyNames(areaElement).forEach(prop => {
        expect(areaElement[prop].getAttribute('d')).toBeTruthy()
      })
    })
  })
})
