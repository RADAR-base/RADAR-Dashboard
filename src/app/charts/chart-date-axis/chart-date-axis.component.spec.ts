import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MockTimeFrameChartData } from '../../../assets/testing/mocks/mock-chart-data'
import { ChartDateAxisComponent } from './chart-date-axis.component'

describe('ChartDateAxisComponent', () => {
  let component: ChartDateAxisComponent
  let fixture: ComponentFixture<ChartDateAxisComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartDateAxisComponent]
    })

    fixture = TestBed.createComponent(ChartDateAxisComponent)
    component = fixture.componentInstance
  })

  it('should be created', () => {
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should update() and change size if data changes', () => {
    component.hasXAxis = true
    component.data = [
      MockTimeFrameChartData.startDateTime,
      MockTimeFrameChartData.endDateTime
    ]
    fixture.detectChanges()

    expect(component.width).toBeGreaterThan(0)
  })
})
