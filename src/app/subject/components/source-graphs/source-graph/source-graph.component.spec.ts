import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StoreModule } from '@ngrx/store'

import { ChartBaseLineComponent } from '../../../../charts/chart-base-line/chart-base-line.component'
import {
  MockSensorDataResult,
  MockSourceData
} from '../../../../shared/testing/mocks/mock-sources'
import { reducers } from '../../../store'
import { SourceGraphComponent } from './source-graph.component'

describe('SourceGraphComponent', () => {
  let component: SourceGraphComponent
  let fixture: ComponentFixture<SourceGraphComponent>
  let element: HTMLElement

  const mouseEventObject = { clientX: 800, clientY: 300 }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)],
      declarations: [SourceGraphComponent, ChartBaseLineComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(SourceGraphComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement

    component.sourceData = MockSourceData
  })

  it('should be created', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  it('should emit data on tooltipMouseMove', () => {
    spyOn(component.tooltipMouseMoveOuter, 'emit')
    component.isLoaded = true
    component.sensorData = MockSensorDataResult.data
    fixture.detectChanges()

    const evt = new MouseEvent('mousemove', mouseEventObject)
    element.querySelector('.tooltip-mouse-box').dispatchEvent(evt)

    expect(element.querySelector('.tooltip-mouse-box')).toBeTruthy()
    expect(component.tooltipMouseMoveOuter.emit).toHaveBeenCalled()
  })
})
