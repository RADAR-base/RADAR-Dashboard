import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ChartStepsComponent } from './chart-steps.component'
import { ChartModule } from '../chart.module'
import { reducer } from '../../store'
import { StoreModule } from '@ngrx/store'
import { DebugElement } from '@angular/core'
import { MaterialModule } from '@angular/material'

describe('ChartStepsComponent', () => {
  let component: ChartStepsComponent
  let fixture: ComponentFixture<ChartStepsComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ChartModule,
        MaterialModule,
        StoreModule.provideStore(reducer)
      ]
    })

    fixture = TestBed.createComponent(ChartStepsComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement

    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should instantiate the chart', () => {
    expect(element.querySelector('g.chart')).toBeTruthy()
  })
})
