import { DebugElement } from '@angular/core'
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing'
import { MaterialModule } from '@angular/material'
import { Store, StoreModule } from '@ngrx/store'

import { reducer } from '../../core/store'
import * as gridAction from '../../core/store/grid/grid.actions'
import { MockGrid } from '../../shared/testing/mocks/mock-grid'
import { DashboardTileModule } from '../dashboard-tile/dashboard-tile.module'
import { ProgressAnimationComponent } from '../progress-animation/progress-animation.component'
import { DashboardGridComponent } from './dashboard-grid.component'

describe('DashboardGridComponent', () => {
  let component: DashboardGridComponent
  let fixture: ComponentFixture<DashboardGridComponent>
  let element: HTMLElement
  let de: DebugElement
  let store

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DashboardTileModule,
        MaterialModule,
        StoreModule.provideStore(reducer)
      ],
      declarations: [
        DashboardGridComponent,
        ProgressAnimationComponent
      ]
    })

    fixture = TestBed.createComponent(DashboardGridComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement
    de = fixture.debugElement

    fixture.detectChanges()
  })

  beforeEach(inject([Store], s => {
    store = s
  }))

  it('creates the component', async(() => {
    expect(component).toBeTruthy()
  }))

  it('shows loading', async(() => {
    expect(element.querySelector('app-progress-animation')).toBeTruthy()
    expect(element.querySelector('md-grid-list')).toBeFalsy()
  }))

  it('shows the grid', async(() => {
    store.dispatch(new gridAction.LoadSuccess(MockGrid))

    component.tiles$.subscribe(() => {
      fixture.detectChanges()
      expect(element.querySelector('app-progress-animation')).toBeFalsy()
      expect(element.querySelector('md-grid-list')).toBeTruthy()
    })
  }))

})
