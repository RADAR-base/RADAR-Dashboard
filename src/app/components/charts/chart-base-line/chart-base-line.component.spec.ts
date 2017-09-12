import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StoreModule } from '@ngrx/store'

import { reducers } from '../../../shared/store'
import {
  MockAPISampleDataset,
  MockTimeFrame,
  MockTimeInterval
} from '../../../shared/testing/mocks/mock-chart-data'
import { ParseTimeHoles } from '../../../shared/utils/ParseTimeHoles'
import { ChartBaseLineComponent } from './chart-base-line.component'

describe('ChartBaseLineComponent', () => {
  let component: ChartBaseLineComponent
  let fixture: ComponentFixture<ChartBaseLineComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)],
      declarations: [ChartBaseLineComponent]
    })

    fixture = TestBed.createComponent(ChartBaseLineComponent)
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
        MockTimeFrame,
        MockTimeInterval
      )

      expect(component.width).toBeGreaterThan(0)
      expect(component.height).toBeGreaterThan(0)
    })

    it('should contain path when data changes', () => {
      // without data
      expect(element.querySelectorAll('g.chart .line path').length).toEqual(0)

      // with data // needs to be parsed //
      component.chartData = ParseTimeHoles(
        MockAPISampleDataset,
        MockTimeFrame,
        MockTimeInterval
      )
      expect(
        element.querySelectorAll('g.chart .line path').length
      ).toBeGreaterThan(0)
    })

    it('should not have a linearGradient', () => {
      expect(
        element.querySelector('linearGradient[id^="hr-gradient"]')
      ).toBeFalsy()
    })
  })

  describe('=> with @Input: gradientEnabled', () => {
    beforeEach(() => {
      component.gradientEnabled = true
      fixture.detectChanges()
    })

    it('should have a linearGradient', () => {
      expect(
        element.querySelector('linearGradient[id^="hr-gradient"]')
      ).toBeTruthy()
    })

    it('linearGradient should have attributes "y1, y2" when data changes', () => {
      // with data // needs to be parsed //
      component.chartData = ParseTimeHoles(
        MockAPISampleDataset,
        MockTimeFrame,
        MockTimeInterval
      )

      const gradient = de.nativeElement.querySelector(
        'linearGradient[id^="hr-gradient"]'
      )
      expect(gradient.getAttribute('y1')).toBeGreaterThan(0)
      expect(gradient.getAttribute('y2')).toBeGreaterThan(0)
    })
  })
})
