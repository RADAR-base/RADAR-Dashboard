import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MaterialModule } from '@angular/material'
import { StoreModule } from '@ngrx/store'

import { reducer } from '../../../shared/store'
import { DashboardTileModule } from '../dashboard-tile.module'
import { TileHeartRateComponent } from './tile-heart-rate.component'

describe('TileHeartRateComponent', () => {
  let component: TileHeartRateComponent
  let fixture: ComponentFixture<TileHeartRateComponent>
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

    fixture = TestBed.createComponent(TileHeartRateComponent)
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