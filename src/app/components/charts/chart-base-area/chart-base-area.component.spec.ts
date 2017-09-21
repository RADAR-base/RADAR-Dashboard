import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

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

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
