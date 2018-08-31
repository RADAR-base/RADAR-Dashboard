import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StoreModule, combineReducers } from '@ngrx/store'

import { ChartBaseLineComponent } from '../../../charts/chart-base-line/chart-base-line.component'
import {
  MockSensorsAll,
  MockSources
} from '../../../shared/testing/mocks/mock-sources'
import * as fromRoot from '../../../store'
import * as fromFeature from '../../store'
import { SourceGraphComponent } from './source-graph/source-graph.component'
import { SourceGraphsComponent } from './source-graphs.component'

describe('SourceGraphsComponent', () => {
  let component: SourceGraphsComponent
  let fixture: ComponentFixture<SourceGraphsComponent>
  let element: HTMLElement

  const mockSources = MockSources
  const mouseEventObject = { clientX: 700, clientY: 300 }
  const mockDataLoaded = { rJywbfpZm: true }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          subject: combineReducers(fromFeature.reducers)
        })
      ],

      declarations: [
        SourceGraphsComponent,
        SourceGraphComponent,
        ChartBaseLineComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(SourceGraphsComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement

    component.sources = []
    component.isDataLoaded = false
    component.sensorsData = {
      id: {
        data: null,
        id: 0,
        sourceDataName: '',
        sourceDataType: ''
      }
    }
    component.volumeData = []
    component.isVolumeDataLoaded = false
    component.volumeTimeFrame = {
      startDateTime: new Date(),
      endDateTime: new Date()
    }
    component.sensorsDataTimeFrame = {
      startDateTime: new Date(),
      endDateTime: new Date()
    }
  })

  it('should be created', () => {
    component.sources = []

    expect(component).toBeTruthy()
  })

  it('should not show tooltip when mouse is not within target location', () => {
    component.sources = mockSources
    fixture.detectChanges()

    const evt = new MouseEvent('mousemove', { clientX: 0, clientY: 0 })
    element.querySelector('.source').dispatchEvent(evt)

    expect(component.tooltipShow).toBe(0)
  })

  it('should not show tooltip on mouseleave', () => {
    component.sources = mockSources
    component.sensorsData = MockSensorsAll
    component.isDataLoaded = mockDataLoaded

    fixture.detectChanges()

    component.tooltipShow = 1

    const evt = new MouseEvent('mouseleave', {})
    element.querySelector('.tooltip-mouse-box').dispatchEvent(evt)

    expect(component.tooltipShow).toBe(0)
  })

  it('should  show tooltip when mouse is within target', () => {
    component.sources = mockSources
    component.sensorsData = MockSensorsAll
    component.isDataLoaded = mockDataLoaded
    fixture.detectChanges()

    const evt = new MouseEvent('mousemove', mouseEventObject)
    element.querySelector('.tooltip-mouse-box').dispatchEvent(evt)

    expect(component.tooltipShow).toBe(1)
  })
})
