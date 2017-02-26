import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MaterialModule } from '@angular/material'
import { StoreModule } from '@ngrx/store'

import { reducer } from '../../../core/store'
import { DashboardTileModule } from '../dashboard-tile.module'
import { TileAccelerationComponent } from './tile-acceleration.component'

describe('TileAccelerationComponent', () => {
  let component: TileAccelerationComponent
  let fixture: ComponentFixture<TileAccelerationComponent>
  let element: HTMLElement
  let de: DebugElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DashboardTileModule,
        MaterialModule,
        StoreModule.provideStore(reducer)
      ]
    })

    fixture = TestBed.createComponent(TileAccelerationComponent)
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
