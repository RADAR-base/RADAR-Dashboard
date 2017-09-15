import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MockComplianceData } from '../../../shared/testing/mocks/mock-compliance-data'
import { MockConfig } from '../../../shared/testing/mocks/mock-config'
import { parseTimeHoles } from '../../../shared/utils/parse-time-holes'
import { ChartBaseMultiBarComponent } from './chart-base-multi-bar.component'

describe('ChartBaseMultiBarComponent', () => {
  let component: ChartBaseMultiBarComponent
  let fixture: ComponentFixture<ChartBaseMultiBarComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartBaseMultiBarComponent]
    })

    fixture = TestBed.createComponent(ChartBaseMultiBarComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement

    component.keys = MockConfig.config.compliance.keys
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

    it('rect should have attribute x and y when data changes', () => {
      // without data
      expect(element.querySelector('rect.bar')).toBeFalsy()
    })
  })

  describe('=> with @Input', () => {
    beforeEach(() => {
      component.chartData = parseTimeHoles(
        MockComplianceData.dataset,
        {
          start: new Date(
            MockComplianceData.header.effectiveTimeFrame.startDateTime
          ).getTime(),
          end: new Date(
            MockComplianceData.header.effectiveTimeFrame.endDateTime
          ).getTime()
        },
        MockConfig.config.timeIntervals[MockComplianceData.header.timeFrame]
          .value
      )
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

    it('rect should have attribute x and y when data changes', () => {
      // with data
      // select element again as they'll be instantiated
      expect(element.querySelector('rect.back-bar')).toBeTruthy()

      const rectElements: any = element.querySelectorAll('rect.bar')

      Object.getOwnPropertyNames(rectElements).forEach(prop => {
        expect(rectElements[prop].getAttribute('x')).toBeTruthy()
        expect(rectElements[prop].getAttribute('y')).toBeTruthy()
      })
    })
  })
})
