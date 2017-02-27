import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MaterialModule } from '@angular/material'
import { StoreModule } from '@ngrx/store'

import { reducer } from '../../shared/store'
import { DashboardTileComponent } from './dashboard-tile.component'
import { DashboardTileModule } from './dashboard-tile.module'

describe('DashboardTileComponent', () => {
  let component: DashboardTileComponent
  let fixture: ComponentFixture<DashboardTileComponent>
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

    fixture = TestBed.createComponent(DashboardTileComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  describe('Heart Rate Type', () => {
    beforeEach(() => {
      // DashboardTile Stub
      component.tile = {
        id: 1,
        rows: 2,
        cols: 3,
        title: 'Heart Rate Monitoring',
        type: 'heart-rate'
      }
      fixture.detectChanges()
    })

    it('should have a tile with title "Heart Rate Monitoring"', () => {
      expect(component.title)
        .toBe('Heart Rate Monitoring')
      expect(element.querySelector('.title').textContent)
        .toBe('Heart Rate Monitoring')
    })

    it('should have a "app-dashboard-tile-heart-rate" component', () => {
      expect(component.tile.type)
        .toBe(component.CHART_TYPE.HR)
      expect(element.querySelector('app-tile-heart-rate'))
        .toBeTruthy()
    })
  })

  describe('Acceleration Type', () => {
    beforeEach(() => {
      // DashboardTile Stub
      component.tile = {
        id: 1,
        rows: 2,
        cols: 3,
        title: 'Accelerometer Monitoring',
        type: 'acceleration'
      }
      fixture.detectChanges()
    })

    it('should have a tile with title "Accelerometer Monitoring"', () => {
      expect(component.title)
        .toBe('Accelerometer Monitoring')
      expect(element.querySelector('.title').textContent)
        .toBe('Accelerometer Monitoring')
    })

    it('should have a "app-dashboard-tile-acceleration" component', () => {
      expect(component.tile.type)
        .toBe(component.CHART_TYPE.AC)
      expect(element.querySelector('app-tile-acceleration'))
        .toBeTruthy()
    })
  })

  describe('Steps Type', () => {
    beforeEach(() => {
      // DashboardTile Stub
      component.tile = {
        id: 1,
        rows: 2,
        cols: 3,
        title: 'Steps',
        type: 'steps'
      }
      fixture.detectChanges()
    })

    it('should have a tile with title "Steps"', () => {
      expect(component.title)
        .toBe('Steps')
      expect(element.querySelector('.title').textContent)
        .toBe('Steps')
    })

    it('should have a "app-dashboard-tile-steps" component', () => {
      expect(component.tile.type)
        .toBe(component.CHART_TYPE.STEPS)
      expect(element.querySelector('app-tile-steps'))
        .toBeTruthy()
    })
  })

  describe('Empty Type', () => {
    beforeEach(() => {
      // DashboardTile Stub
      component.tile = {
        id: 1,
        rows: 2,
        cols: 3,
        title: 'Empty',
        type: 'empty'
      }
      fixture.detectChanges()
    })

    it('should have a "app-dashboard-tile-empty" component', () => {
      expect(component.tile.type)
        .toBe(component.CHART_TYPE.EMPTY)
      expect(element.querySelector('app-tile-empty'))
        .toBeTruthy()
    })
  })
})
