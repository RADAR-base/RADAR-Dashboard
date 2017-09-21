import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ChartVolumeComponent } from './chart-volume.component'

describe('ChartVolumeComponent', () => {
  let component: ChartVolumeComponent
  let fixture: ComponentFixture<ChartVolumeComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartVolumeComponent]
    })

    fixture = TestBed.createComponent(ChartVolumeComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement

    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
