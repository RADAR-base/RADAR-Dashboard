import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ChartDateAxisComponent } from './chart-date-axis.component'

describe('ChartDateAxisComponent', () => {
  let component: ChartDateAxisComponent
  let fixture: ComponentFixture<ChartDateAxisComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartDateAxisComponent]
    })

    fixture = TestBed.createComponent(ChartDateAxisComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement
  })

  it('should be created', () => {
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })
})
