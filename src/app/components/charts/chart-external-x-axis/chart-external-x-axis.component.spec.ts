import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StoreModule } from '@ngrx/store'

import { reducers } from '../../../shared/store'
import {
  MockTimeSeriesDataDates,
  MockTimeSeriesDataValues
} from '../../../shared/testing/mocks/mock-timeseries-data2'
import { ChartExternalXAxisComponent } from './chart-external-x-axis.component'

describe('ChartExternalXAxisComponent', () => {
  let component: ChartExternalXAxisComponent
  let fixture: ComponentFixture<ChartExternalXAxisComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)],
      declarations: [ChartExternalXAxisComponent]
    })

    fixture = TestBed.createComponent(ChartExternalXAxisComponent)
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
      component.dates = MockTimeSeriesDataDates
      component.chartData = MockTimeSeriesDataValues
      expect(component.width).toBeGreaterThan(0)
      expect(component.height).toBeGreaterThan(0)
    })

    it('should contain path when data changes', done => {
      const lineEl = element.querySelector('.context')
      const inner = lineEl.getElementsByTagName('path')

      // without data
      expect(inner.length).toEqual(0)

      // with data // needs to be parsed //
      component.dates = MockTimeSeriesDataDates
      component.chartData = MockTimeSeriesDataValues

      // wait for transition
      setTimeout(() => {
        expect(inner.length).toBeGreaterThan(0)
        done()
      }, 500)
    })

    it('should not have a linearGradient', () => {
      expect(element.querySelector('linearGradient#hr-gradient')).toBeFalsy()
    })
  })
})
